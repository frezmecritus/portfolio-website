var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

var Canvas = React.createClass({
	getInitialState: function() {
		return { pages: ['WORK', 'ABOUT', 'CONTACT'], currPage: "WORK"};
	},

	setPage: function(e) {
		this.setState({ currPage: e.target.textContent });
	},

	resetPage: function() {
		this.setState({ currPage: this.state.pages[0] });
	},

	render: function() {
		var subTitle = 'Northwestern CS, Full-stack generalist';
		return <div>
			<div id="header">
				<div id="logo">
					<a onClick={this.resetPage}>Ling-Ting Tseng</a>
					<p className="logo-subtitle">{subTitle}</p>
				</div>
				{this.renderNav()}
			</div>
			<div className="pageDivider"></div>
			{this.renderContent()}
			<div className="pageDivider"></div>
			{this.renderFooter()}
		</div>;
	},

	renderNav: function() {
		var items = this.state.pages.map(function(page, i) {
			var isCurrPage = page === this.state.currPage;
			return <a className={isCurrPage? "currPage":""} key={page} onClick={this.setPage}>{page}</a>;
		}.bind(this));
		return <div id="topNav"> {items} </div>;
	},	

	renderContent: function() {
		var res;
		var page = this.state.currPage;
		if (page=="WORK")
			res = <div><div>
				<a><img src="image/img1.png"></img><div>Street Accidents Prediction</div></a>
				<a><img src="image/img4.png"></img><div>WebGL Physics Simulation System</div></a>
				<a><img src="image/img3.png"></img><div>Geospatial Data Visualization</div></a>
			</div><div>
				<a><img src="image/img7.png"></img><div>Big Lake Buoy</div></a>
				<a><img src="image/img5.png"></img><div>Medicare Service Platform</div></a>
				<a><img src="image/img6.png"></img><div>Power Hour</div></a>
			</div><div>
				<a><img src="image/img2.png"></img><div>Flying Airplane Navigation</div></a>
				<a><img src="image/img8.png"></img><div>Le Petite Chef</div></a>
				<a><img src="image/img9.png"></img><div>OpenGL Transparency</div></a>
			</div></div>;
		else if (page=="ABOUT")
			res = <About />;
		else
			res = <p>Content</p>;
		return <section id="content"> {res} </section>;
	},

	renderFooter: function() {
		var author = <a href="https://github.com/frezmecritus/">frezmecritus</a>
		return <div id="footer"> Designed and developed by {author} @2016 </div>;
	}
});

var About = React.createClass({
	render: function() {
		var par1 = 'I am interested in interactive design, computer graphic, geospatial data usage, with multiple projects on each of them. I have launched a marketplace in my senior year.';
		return <p>{par1}</p>
	}
});

var TodoList = React.createClass({
	getInitialState: function() {
		return {items: ['hello', 'world', 'click', 'me'], showed: false};
	},

	handleClick: function(i) {
		if (this.state.showed) {
			var newItems = this.state.items.slice();
			newItems.splice(newItems.length-1, 1);
			this.setState({items: newItems, showed: false});
		}
		else {
			var newItems = this.state.items.concat(['dsfsfd']);
			this.setState({items: newItems, showed: true});
		}
	},
	render: function() {
		var items = (<div key='Hello' onClick={this.handleClick}>Hello</div>);
		var items2 = this.state.items.map(function(item, i) {
			return (
				<div key={item} onClick={this.handleClick.bind(this, i)}>
					{item}
				</div>
			);
		}.bind(this));
		return (
			<div>
				<ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500}>
					<img src="image/img1.png"></img>
				</ReactCSSTransitionGroup>
			</div>
		);
	}
});

const appRoot = document.getElementById('canvas');
ReactDOM.render(<Canvas />, appRoot);
