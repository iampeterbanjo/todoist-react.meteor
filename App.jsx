App = React.createClass({
	// This mixin makes the getMeteorData method work
	mixins: [ReactMeteorData],
	
	getInitialState() {
		return {
			hideCompleted: false
		}
	},
	
	toggleHideCompleted() {
		this.setState({
			hideCompleted: !this.state.hideCompleted
		});
	},

	getMeteorData() {
		let query = {};
		
		if (this.state.hideCompleted) {
			query = {checked: {$ne: true}};
		}

		return {
			tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
			incompleteCount: Tasks.find({checked: {$ne: true}}).count()
		};
	},

	renderTasks() {
		return this.data.tasks.map((task) => {
			return <Task key={task._id} task={task} />;
		});
	},
	
	renderForm() {
		var form = `<form className="new-task" onSubmit={this.handleSubmit} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks" />
            </form>`;
		return this.data.currentUser ? form : '';
	},

	handleSubmit(event) {
		event.preventDefault();

		var text = React.findDOMNode(this.refs.textInput).value.trim();

		Tasks.insert({
			text: text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});

		React.findDOMNode(this.refs.textInput).value = "";
	},

	render() {
		return (
			<div className="container">
				<header>
					<h1>Todo List ({this.data.incompleteCount})</h1>
					
					<label className="hide-completed">
						<input
							readOnly={true}
							checked={this.state.hideCompleted}
							onClick={this.toggleHideCompleted}
							type="checkbox" />
						Hide Completed Tasks
					</label>
					
					<AccountsUIWrapper />

          {this.renderForm()}
				</header>

				<ul>
					{this.renderTasks()}
				</ul>
			</div>
		);
	}
});