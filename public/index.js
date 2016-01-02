var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

var Canvas = React.createClass({
	getInitialState: function() {
		return { pages: ['WORK', 'ABOUT', 'PRESS', 'CONTACT'], currPage: "WORK" };
	},

	setPage: function(e) {
		this.setState({ currPage: e.target.textContent });
	},

	resetPage: function() {
		this.setState({ currPage: this.state.pages[0] });
	},

	render: function() {
		return <div>
			<div id="header">
				<div id="logo">
					<a onClick={this.resetPage}>Eileen Hung</a>
					<p className="logo-subtitle">"The shortest distance between truth and a human being is a story."</p>
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
		var currPage = this.state.currPage;
		var items = this.state.pages.map(function(page, i) {
			var isCurrPage = page === currPage;
			return <a className={isCurrPage? "currPage":""} 
			          key={page} onClick={this.setPage}>{page}</a>;
		}.bind(this));
		return <div id="topNav"> {items} </div>;
	},	

	renderContent: function() {
		var res;
		var page = this.state.currPage;
		if (page=="WORK")
			res = <Work />;
		else if (page=="ABOUT")
			res = <About />;
		else
			res = <Content />;
		return res;
	},

	renderFooter: function() {
		return <div id="footer"> Designed and developed by frezmecritus @2015 </div>;
	}
});

var Work = React.createClass({
	render: function() {
		return <section id="content">
			<div>
				<a><img src="image/img1"></img><div>fsfwef</div></a>
				<a><img src="image/img2"></img><div>sefdae</div></a>
				<a><img src="image/img3"></img><div>ghftgq</div></a>
			</div>
			<div>
				<a><img src="image/img4"></img><div>asddyi</div></a>
			</div>
		</section>;
	}
});

var About = React.createClass({
	render: function() {
		return <section id="content">
			<p>about</p>
			<TodoList />
		</section>;
	}
});

var TodoList = React.createClass({
	getInitialState: function() {
		return {items: ['hello', 'world', 'click', 'me']};
	},
	handleAdd: function() {
		var newItems =
			this.state.items.concat([prompt('Enter some text')]);
		this.setState({items: newItems});
	},
	handleRemove: function(i) {
		var newItems = this.state.items.slice();
		newItems.splice(i, 1);
		this.setState({items: newItems});
	},
	render: function() {
		var items = this.state.items.map(function(item, i) {
			return (
				<div key={item} onClick={this.handleRemove.bind(this, i)}>
					{item}
				</div>
			);
		}.bind(this));
		return (
			<div>
				<button onClick={this.handleAdd}>Add Item</button>
				<ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
					{items}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
});

var Content = React.createClass({
	render: function() {
		return <section id="content">
			<p>Content</p>
		</section>;
	}
});

const appRoot = document.getElementById('canvas');
ReactDOM.render(<Canvas />, appRoot);
