var Canvas = React.createClass({
	getInitialState: function() {
		return { page: "WORK" };
	},


	setPage: function(e) {
		this.setState({ page: e.target.textContent });
	},

	resetPage: function() {
		this.setState({ page: "WORK" });
	},

	render: function() {
		return <div id="canvas">
			<div id="header">
				<div id="logo">
					<a onClick={this.resetPage}>Eileen Hung</a>
					<p className="logo-subtitle">"The shortest distance between truth and a human being is a story."</p>
				</div>
				<div id="topNav">
					<a onClick={this.setPage}>WORK</a>
					<a onClick={this.setPage}>ABOUT</a>
					<a onClick={this.setPage}>PRESS</a>
					<a onClick={this.setPage}>CONTACT</a>
				</div>
			</div>
			<div className="pageDivider"></div>
			{this.renderContent(this.state.page)}
		</div>;
	},
	
	renderContent: function(page) {
		console.log(page);
		var res;
		if (page=="WORK")
			res = <Work />;
		else if (page=="ABOUT")
			res = <About />;
		else
			res = <Content />;
		return res;
	}
});

var Work = React.createClass({
	render: function() {
		return <section id="page">
			<p>work</p>
		</section>;
	}
});

var About = React.createClass({
	render: function() {
		return <section id="page">
			<p>about</p>
		</section>;
	}
});

var Content = React.createClass({
	render: function() {
		return <section id="page">
			<p>Content</p>
		</section>;
	}
});

React.render(<Canvas />, document.body);
