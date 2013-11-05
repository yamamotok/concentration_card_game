/** @fileOverview
 *
 * Layer, that is responsible for handling of the cards
 *
 */
(function(root){
	//
	// name spaces
	//
	var layer = root.layer = root.layer || {};
	if (root.layer.card) return;

	var Config = root.const.config;

	/**
	 * constructor
	 * @warning
	 *   create() must be used to instantiate this
	 */
	layer.card = function() {
		// instance variables
		this._parent = layer.base.prototype;
		this.className = 'layer.card';

		this.cardData = null;
		this.cardNodes = [];
		this.actionOpenCard = null;
	};

	/**
	 * class variables
	 */
	layer.card.static = {

	};

	/** 
	 * factory
	 * @param {cc.Scene}
	 */
	layer.card.create = function(scene) {
		var obj = layer.base.create(scene);
		_.extend(obj, new layer.card());
		obj._init();
		return obj;
	};

	var __ = layer.card.prototype;

	/**
	 * initialize this
	 */
	__._init = function() {
		this._parent._init.call(this);

		this.notified.add(this.onNotified, this);
		this.cardData = root.data.cards.getInstance();
	};

	/**
	 * is any actions running?
	 * @return {Boolean}
	 */
	__.isActionRunning = function() {
		return (this.actionOpenCard && !this.actionOpenCard.isDone());
	};

	/**
	 * calculate position and get it
	 * @param {Number} card index
	 * @return {cc.p}
	 */
	__.getPosOfCard = function(index) {
		var director = cc.Director.getInstance();
		var winSize = director.getWinSize();
		var cardSize = Config.CARD_SIZE;

		var margin = 8;
		var cols = 4, rows = 2;

		var left = (winSize.width - cardSize.width * cols - margin * (cols - 1)) / 2;
		var bottom = winSize.height - cardSize.height * rows - margin * (rows - 1) - 30;

		var xi = index % 4;
		var yi = Math.floor(index / 4);

		var px = xi * (cardSize.width + margin) + left;
		var py = yi * (cardSize.height + margin) + bottom;

		return cc.p(px, py);
	};

	/**
	 * refresh cards view
	 */
	__.updateCards = function() {
		this.cardNodes.forEach(function(card){
			card.updateView();
		});

		if (this.cardData.getNumOfOpened() < 1) {
			this.scene.notified.dispatch(
				root.const.notification.showMessage, {message: 'Get started'});
		}
	};

	/**
	 * prepare nodes of cards
	 */
	__.prepareCards = function() {
		for (var i = 0; i < this.cardData.getNumOfCards(); i ++) {
			var card = root.component.card.create(this.scene, i);
			card.setPosition(this.getPosOfCard(i));
			this.addChild(card);
			this.touched.add(card.onTouched, card);
			this.cardNodes[i] = card;
		}
	};

	/**
	 * open the first card
	 * @param {Number} card index
	 */
	__.openFirst = function(index) {
		this.cardData.setOpened(index, true);
		this.updateCards();

		this.scene.notified.dispatch(
			root.const.notification.showMessage, {message: 'Find it'});
	};

	/**
	 * open the second card, but it was not the answer
	 * @param {Number} card index
	 */
	__.openSecondNotHit = function(index) {
		var blink = cc.Blink.create(1.0, 4);
		var blinkFinalize = cc.CallFunc.create(function(target, index){
			this.cardData.setOpened(index, false);
			this.cardData.setDownNotPaird();
			this.updateCards();
			this.actionOpenCard = null;
		}, this, index);
		this.actionOpenCard = cc.Sequence.create(blink, blinkFinalize);

		this.cardData.setOpened(index, true);
		this.updateCards();
		this.cardNodes[index].runAction(this.actionOpenCard);

		this.scene.notified.dispatch(
			root.const.notification.showMessage, {message: 'Try again'});

		// reduce score
		var scoreData = root.data.score.getInstance();
		scoreData.scoreFailure();
		this.scene.notified.dispatch(
			root.const.notification.showScore, {});
	};

	/**
	 * open the second card, it was the correct answer
	 * @param {Number} card index
	 */
	__.openSecondHit = function(index) {
		this.cardData.setOpened(index, true);
		this.updateCards();


		this.scene.notified.dispatch(
			root.const.notification.showMessage, {message: 'Great!'});
	};

	/**
	 * 'notified' signal handler
	 */
	__.onNotified = function(name, params) {
		if (name == root.const.notification.cardTouched) {
			var index = params.index;
			if (this.cardData.isOpened(index)) {
				// this card has been already opened.
				return true;
			}
			if (this.isActionRunning()) {
				// animation is still now in progress
				return true;
			}

			if (this.cardData.isTryingFirst()) {
				this.openFirst(index);
			} else {
				if (!this.cardData.guess(index)) {
					this.openSecondNotHit(index);
				} else {
					this.openSecondHit(index);
				}
			}
			return false;

		} else if (name == root.const.notification.refreshCards) {
			this.updateCards();
			return false;

		}
	};

	/**
	 * callback for onEnter
	 */
	__.onEnter = function() {
		this._parent.onEnter.call(this);
		cc.log('layer.card.onEnter');

		// prepare cards
		if (this.cardNodes.length < 1) {
			this.prepareCards();
		}
		this.updateCards();
	};

})(this);
