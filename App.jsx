App = React.createClass({
	// This mixin makes the getMeteorData method work
	mixins: [ReactMeteorData],

	getMeteorData() {
		return {
			tasks: Tasks.find({}).fetch()
		};
	},

	renderTasks() {
		return this.data.tasks.map((task) => {
			return <Task key={task._id} task={task} />;
		});
	},

	render() {
		return (
			<div className="container">
				<header>
					<h1>Todo List</h1>
				</header>

				<ul>
					{this.renderTasks()}
				</ul>
			</div>
		);
	}
});