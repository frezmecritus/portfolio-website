/**
 * Create the structure of the portfolio website, by React.js
 * @auther: Ling-Ting Tseng
 */

Parse.initialize("LM2XBZSm6OKoupNDIRkmzIeqXI5dmjW8d7WXUrD0", "yECtiYGHMAHAW5dXeNKVY3kCFMcMW3BZsUh9MUNl");

var Canvas = React.createClass({
	/**
	 * Canvas queries Parse database using ParseReactMixin, then sends to
	 *     Mainview class for page construction.
	 * 
	 * Require: 
	 *   mixins: [ParseReact.Mixin]
	 *   observe()
	 */
	mixins: [ParseReact.Mixin],

	observe: function() {
		/**
		 * Query Parse database by calling Parse API.
		 * @return {this.data} This returns the data query from database and
		 *     save in this.data.
		 */
		return { projects: (new Parse.Query('Project')) };
	},

	render: function() {
		/**
		 * Render MainView React class by sending project data.
		 * @return {MainView} 
		 */
		return <MainView projects={this.data.projects}/>;
	}
});

var MainView = React.createClass({
	/**
	 * MainView sets up the website structure.
	 * @param {this.props.projects} Array of projects to render on the page.
	 * @return {DOM.div} Wholepage of the website.
	 */

	getInitialState: function() {
		/**
		 * Set up four states of showing pages, and a state for current page.
		 * @return {this.state}
		 */
		return { pages: ['WORK', 'ABOUT', 'CONTACT'], currPage: "WORK"};
	},

	setPage: function(e) {
		/**
		 * Set current showing page by which label is clicked.
		 * @ param {DOM.event.onclick}
		 */
		this.setState({ currPage: e.target.textContent });
	},

	resetPage: function() {
		/**
		 * Reset cuurent page to default setting, pages[0].
		 */
		this.setState({ currPage: this.state.pages[0] });
	},

	render: function() {
		/**
		 * Render the page by three parts: header, content, and footer.
		 */
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
		/**
		 * Render navigation and style by state.
		 * @return {DOM.div} 
		 */
		var items = this.state.pages.map(function(page, i) {
			var isCurrPage = page === this.state.currPage;
			return <a className={isCurrPage? "currPage":""} key={page} onClick={this.setPage}>{page}</a>;
		}.bind(this));
		return <div id="topNav"> {items} </div>;
	},	

	renderContent: function() {
		/**
		 * Render content by state of current page.
		 * @return {DOM.section} Rendered content.
		 */
		var res;
		var page = this.state.currPage;
		if (page=="WORK")
			res = <Lightbox projects={this.props.projects} keyboard controls={Controls} />;
		else if (page=="ABOUT")
			res = <About />;
		else if (page=="CONTACT")
			res = <Contact />;
		else
			res = <div>SOMETHING WENT WRONG!!!</div>;
		return <section id="content"> {res} </section>;
	},

	renderFooter: function() {
		var author = <a href="https://github.com/frezmecritus/">frezmecritus</a>
		return <div id="footer"> Designed and developed by {author} @2016 </div>;
	}
});

var About = React.createClass({
	/**
	 * About models about page of the website.
	 * @return {DOM.div} This is the rendered about page.
	 */
	createIntro: function() {
		/**
		 * Self introduction with picture.
		 */
		var intro = 'A code addict and a lover in solving problem by programming. I worked in a project. I am currently looking for the positions of frontend or fullstack developer.'+
		'Chirpy, an online campus event billboard I and my friends launched in our college years, is on a mission to facilitate the communication between students and event holders,' +
		'Background'+
		'After earning a Bachelor’s in Electrical Engineering from National Taiwan University,'+
		'I love photography. I never stop grabbing every moment in my life no matter using phone, digital camera, or film camera. I am a basketball player too. Our team won the third place in a local tournament last year. Everyone on the team is supportive; I enjoy the time challenging on the opponents.';
		// return intro;
		return '';
	},
	createItems: function() {
		/**
		 * Short summary of me by bullets.
		 * @return {Array} Rows of each summary bullets.
		 */
		var head1 = 'WHAT I DO';
		var par1 = 'I am interested in frontend development, interactive design, computer graphic, geospatial data usage, with multiple projects on each of them. I have launched a event billboard in my senior year.';
		var head2 = 'ACHIEVEMENTS';
		var par2 = 'Chirpy, a campus event website my friends and I launched at 2012, has achieved more than 1000 viewers per day. It was also the official campus event website of several colleges in Taiwan.';
		var head3 = 'SKILLS';
		var par3 = 'Python, Javascript (jQuery, React.js), Java, C/C++, HTML5 & CSS3 (Less CSS), AJAX, MySQL, PHP, C#, Lisp, Prolog, Computer Vision, Computer Graphics, WebGL, OpenGL';	
		return [[head1,par1],[head2,par2],[head3,par3]];
	},
	render: function() {
		return React.DOM.div({}, React.DOM.div({}, this.createIntro()), (this.createItems()).map(renderBullets));
	}
});

var Contact = React.createClass({
	/**
	 * Contact models my contact information page of the website.
	 * @return {DOM.div} This is the rendered contact page.
	 */
	createItems: function() {
		/**
		 * Short summary of contact information by bullets.
		 * @return {Array} Rows of each summary bullets.
		 */
		var head1 = 'Phone'
		var par1 = '415-323-9013';
		var head2 = 'LinkedIn';
		var par2 = 'https://www.linkedin.com/in/lingtingtseng';
		var head3 = 'Github';
		var par3 = 'https://github.com/frezmecritus/';
		return [[head1,par1],[head2,par2],[head3,par3]];
	},
	render: function() {
		return React.DOM.div({}, (this.createItems()).map(renderBullets));
	}
});

function renderBullets(item) {
	/**
	 * Formats each row of bullets.
	 * @return {DOM.div} This is DOM format of a bullet.
	 */
	return <div><div>{item[0]}</div><div>{item[1]}</div></div>;
}

const appRoot = document.getElementById('canvas');
ReactDOM.render(<Canvas />, appRoot);
