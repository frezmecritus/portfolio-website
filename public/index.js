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
		var subTitle = 'Northwestern CS, Frontend and Backend generalist';
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
			res = <Work />;
		else if (page=="ABOUT")
			res = <About />;
		else
			res = <Contact />;
		return <section id="content"> {res} </section>;
	},

	renderFooter: function() {
		var author = <a href="https://github.com/frezmecritus/">frezmecritus</a>
		return <div id="footer"> Designed and developed by {author} @2016 </div>;
	}
});

var Work = React.createClass({
	mixins: [ParseReact.Mixin], // Enable query subscriptions

	observe: function() {
		// Subscribe to all Comment objects, ordered by creation date
		// The results will be available at this.data.comments
		return { projects: (new Parse.Query('Project')) };
	},

	render: function() {
		// Render the text of each comment as a list item
		return <Lightbox projects={this.data.projects} keyboard controls={Controls}/>;
	}
});

var About = React.createClass({
	render: function() {
		var head1 = 'WHAT I DO';
		var par1 = 'I am interested in frontend development, interactive design, computer graphic, geospatial data usage, with multiple projects on each of them. I have launched a marketplace in my senior year.';
		var head2 = 'ACHIEVEMENTS';
		var par2 = 'Chirpy, a campus event website my friends and I launched at 2012, has achieved more than 1000 viewers per day. It was also the official campus event website of several colleges in Taiwan.';
		var head3 = 'SKILLS';
		var par3 = 'Python, Javascript (jQuery, React.js), Java, C/C++, HTML5 & CSS3 (Less CSS), AJAX, MySQL, PHP, C#, Lisp, Prolog, Computer Vision, Computer Graphics, WebGL, OpenGL';
		return <div>
		<div><div>{head1}</div><div>{par1}</div></div>
		<div><div>{head2}</div><div>{par2}</div></div>
		<div><div>{head3}</div><div>{par3}</div></div></div>;
	}
});

var Contact = React.createClass({
	render: function() {
		var head1 = 'Phone'
		var par1 = '872-203-2004';
		var head2 = 'LinkedIn';
		var par2 = 'https://www.linkedin.com/in/lingtingtseng'
		var head3 = 'Github'
		var par3 = 'https://github.com/frezmecritus/'
		return <div>
		<div><div>{head1}</div><div>{par1}</div></div>
		<div><div>{head2}</div><div>{par2}</div></div>
		<div><div>{head3}</div><div>{par3}</div></div></div>;
	}
});

const appRoot = document.getElementById('canvas');
ReactDOM.render(<Canvas />, appRoot);
