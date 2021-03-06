/**
 * Create and define actions of lightbox by React.
 * Modified from https://github.com/LaustAxelsen/react-lightbox
 * @author Ling-Ting Tseng
 */ 

var DOM = React.DOM;

var Carousel = React.createFactory(React.createClass({
	/**
	 * Carousel models a lightbox, which shows the details of a project. The
	 *     content includes title, description, and images. Also, a control
	 *     panel is provided for switching through projects by both mouse click
	 *     and keyboard.
	 * 
	 * @param {items} The projects, with title, description, and image location.
	 * @param {current} The index of the project being shown now.
	 * @param {keyboard} Lightbox keyboard control.
	 * @param {controls} Object of the control panel.
	 * @param {close} The action of close event
	 * @return {DOM.div} This DOM is a lightbox.
	 */
	getInitialState: function () {
		return {
			previous: null,
			current: this.props.current
		};
	},
	componentWillMount: function () {
		if (this.props.keyboard) {
			window.addEventListener('keydown', this.handleKeyboardInput);
		}
	},
	componentWillUnmount: function () {
		if (this.props.keyboard) {
			window.removeEventListener('keydown', this.handleKeyboardInput);
		}
	},
	handleKeyboardInput: function (event) {
		if (event.keyCode === 37) {
			this.backward();
		}
		if (event.keyCode === 39) {
			this.forward();
		}
		if (event.keyCode === 27) {
			this.props.close();
		}
	},
	getNextIndex: function () {
		return this.props.items.length === this.state.current + 1 ? 0 : this.state.current + 1;
	},
	getPreviousIndex: function () {
		return this.state.current === 0 ? this.props.items.length - 1 : this.state.current - 1;
	},
	forward: function (event) {
		if (event) {
			event.stopPropagation();
		}
		this.setState({
			previous: this.state.current,
			current: this.getNextIndex()
		});
	},
	backward: function (event) {
		if (event) {
			event.stopPropagation();
		}
		this.setState({
			previous: this.state.current,
			current: this.getPreviousIndex()
		});
	},
	isForwarding: function () {
		return this.state.previous === this.getPreviousIndex();
	},
	createInitialPictureClass: function (index) {
		var className = 'react-lightbox-carousel-item';
		if (index === this.getPreviousIndex()) {
			return className += ' react-lightbox-carousel-item-backward';
		}
		if (index === this.state.current) {
			return className;
		}
		if (index === this.getNextIndex()) {
			return className += ' react-lightbox-carousel-item-forward';
		}
	},
	createPictureClass: function (index) {
		var className = 'react-lightbox-carousel-item';

		// Set correct classes based on current index
		if (this.state.previous === null) {
			return this.createInitialPictureClass(index);
		}

		// Normal backword behavior
		if (index === this.state.previous && !this.isForwarding()) {
			return className += ' react-lightbox-carousel-item-forward';
		}

		if (index === this.state.current) {
			return className;
		}

		// Reverse with forward behavior
		if (index === this.state.previous && this.isForwarding()) {
			return className += ' react-lightbox-carousel-item-backward';
		}
		if (this.isForwarding()) {
			return className += ' react-lightbox-carousel-item-forward';
		}

		return className += ' react-lightbox-carousel-item-backward';
	},
	renderPictures: function () {
		return this.props.items.map(function (item, index) {

			if (typeof item.img === 'string') {
				return DOM.div({
					key: index,
					className: this.createPictureClass(index),
					style: { visibility: this.state.previous === index || this.state.current === index ? 'visible' : 'hidden'}
				}, DOM.div({}, DOM.img({src: item.img}), DOM.div({}, item.title), DOM.div({}, item.description)));
			} else {
				return DOM.div({
					key: index,
					className: this.createPictureClass(index),
					style: {
						visibility: this.state.previous === index || this.state.current === index ? 'visible' : 'hidden'
					}
				}, item.img);
			}
		}, this);
	},
	renderControls: function () {
		if (this.props.controls) {
			return React.createFactory(this.props.controls)({
				backward: this.backward,
				forward: this.forward
			});
		}
	},
	render: function () {
		return DOM.div({
			className: 'react-lightbox-carousel',
		}, this.renderPictures(), this.renderControls());
	}
}));

var Controls = React.createClass({
	/**
	 * Controls models the control panel of a lightbox. The action is defined
	 *     in Carousel.
	 *
	 * @param {forward, backward} This defines actions of onclick.
	 * @return {DOM.div}
	 */
	render: function () {
		return React.DOM.div({
			className: 'my-controls'
		}, 
			React.DOM.div({
				className: 'my-button my-button-left',
				onClick: this.props.backward
			}, '<'),
			React.DOM.div({
				className: 'my-button my-button-right',
				onClick: this.props.forward
			}, '>')
		);
	}
});

var Lightbox = React.createClass({
	/**
	 * Lightbox creates boxes of projects on WORK section. A box represents
	 *     a project, which contains an image and its title.
	 * 
	 * Once you click a box, a lightbox, defined as Carousel, will pop out and
	 *     shows the detailed description of that project.
	 * 
	 * @param {projects} An array of projects, containing title, description,
	 *     and image location.
	 * @param {keyboard} Keyboard control.
	 * @param {controls} The control panel of a lightbox.
	 * @return {DOM.div} This DOM contains boxes of projects.
	 */
	componentDidMount: function () {
		this.overlay = document.createElement('div');
		this.overlay.className = 'react-lightbox-overlay';
		this.overlay.addEventListener('webkitTransitionEnd', this.handleOverlayMounting);
	},
	componentWillUnmount: function () {
		this.overlay.removeEventListener('webkitTransitionEnd', this.handleOverlayMounting);
	},
	handleOverlayMounting: function () {
		if (!this.overlay.classList.contains('react-lightbox-overlay-open')) {
			React.unmountComponentAtNode(this.overlay);
			document.body.removeChild(this.overlay);
			window.removeEventListener('click', this.closeCarousel);
		}
	},
	openCarousel: function (index) {
		this.overlay.innerHMTL = '';
		this.overlay.className = 'react-lightbox-overlay';
		document.body.appendChild(this.overlay);
		React.render(Carousel({
			items: this.props.projects,
			current: index,
			keyboard: this.props.keyboard,
			controls: this.props.controls,
			close: this.closeCarousel
		}), this.overlay);
		requestAnimationFrame(function () {
			this.overlay.classList.add('react-lightbox-overlay-open');
			window.addEventListener('click', this.closeCarousel);
		}.bind(this));
	},
	closeCarousel: function () {
		this.overlay.classList.remove('react-lightbox-overlay-open');
	},
	renderItems: function (item, index) {
		if (typeof item.img === 'string') {
			return DOM.div({}, DOM.img({
					key: index,
					className: 'react-lightbox-image',
					src: item.img,
					onClick: this.openCarousel.bind(this, index),
			}), DOM.div({className: 'react-lightbox-description'},item.title));
		} else {
			return DOM.div({}, DOM.div({
					key: index,
					className: 'react-lightbox-image',
					onClick: this.openCarousel.bind(this, index),
			}, item.img), DOM.div({className: 'react-lightbox-description'},item.title));
		}
	},
	render: function() {
		return DOM.div({
			className: 'react-lightbox'
		}, (this.props.projects || []).map(this.renderItems));
	}
});
