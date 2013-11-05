/** @fileOverview
 *
 * Layer where buttons and labels are placed
 *
 */
 (function(root){
	//
	// name spaces
	//
	var Layer = root.layer = root.layer || {};
	if (Layer.control) return;

	var Config = root.const.config;

	/**
	 * constructor
	 * @warning
	 *   create() must be used to instantiate this
	 */
	Layer.control = function() {
		// instance variables
		this._parent = Layer.base.prototype;
		this.className = 'layer.control';

		this.retryButton = null;
		this.messageLabel = null;
		this.scoreLabel = null;
	};

	/**
	 * class variables
	 */
	Layer.control.static = {

	};

	/** 
	 * factory
	 * @param {cc.Scene}
	 */
	Layer.control.create = function(scene) {
		var obj = Layer.base.create(scene);
		_.extend(obj, new Layer.control());
		obj._init();
		return obj;
	};

	var __ = Layer.control.prototype; ///<< shorthand

	/**
	 * initialize this
	 */
	__._init = function() {
		this._parent._init.call(this);
		this.notified.add(this.onNotified, this);
	};

	/**
	 * place retry-button
	 */
	__.placeRetryButton = function() {
		var director = cc.Director.getInstance();
		var winSize = director.getWinSize();
		var buttonSize = Config.RETRY_BUTTON_SIZE;

		var x = winSize.width / 2 - buttonSize.width / 2;
		var y = 15;
		
		var button = root.component.retryButton.create(this.scene);
		button.setPosition(cc.p(x, y));

		this.addChild(button);
		this.touched.add(button.onTouched, button);

		this.retryButton = button;
	}

	/**
	 * place a label to show message
	 */
	__.placeMessageLabel = function(message) {
		message = message || '';
		if (this.messageLabel) {
			this.removeChild(this.messageLabel);
		}

		var x = 15;
		var y = this.getContentSize().height - 25;

		var text = cc.LabelTTF.create(
        	message,
        	'Arial', 14,
        	cc.size(this.getContentSize().width - x, 0),
        	cc.TEXT_ALIGNMENT_LEFT);
		text.ignoreAnchorPointForPosition(false);
        text.setAnchorPoint(cc.p(0.0, 0.0));
		text.setContentSize(cc.size(
			this.getContentSize().width - x, 40));
		text.setPosition(cc.p(x, y));

		this.addChild(text);
		this.messageLabel = text;
	};

	/**
	 * place a label to show the score
	 */
	__.placeScoreLabel = function() {
		var scoreData = root.data.score.getInstance();
		var score = scoreData.getScore();

		if (this.scoreLabel) {
			this.removeChild(this.scoreLabel);
		}

		var x = this.getContentSize().width / 3 * 2;
		var y = 15;

		var text = cc.LabelTTF.create(
        	'SCORE ' + score,
        	'Arial', 14,
        	cc.size(this.getContentSize().width - x, 0),
        	cc.TEXT_ALIGNMENT_LEFT);
		text.ignoreAnchorPointForPosition(false);
        text.setAnchorPoint(cc.p(0.0, 0.0));
		text.setContentSize(cc.size(
			this.getContentSize().width - x, 40));
		text.setPosition(cc.p(x, y));

		this.addChild(text);
		this.scoreLabel = text;
	};

	/**
	 * 'notified' signal handler
	 */
	__.onNotified = function(name, params) {
		if (name == root.const.notification.showMessage) {
			var message = params.message;
			this.placeMessageLabel(message);

		} else if (name == root.const.notification.showScore) {
			this.placeScoreLabel();
		}
	};

	/**
	 * callback for onEnter
	 */
	__.onEnter = function() {
		this._parent.onEnter.call(this);
		cc.log('layer.control.onEnter');

		if (!this.retryButton) this.placeRetryButton();
		if (!this.messageLabel) this.placeMessageLabel();
		if (!this.scoreLabel) this.placeScoreLabel();
	};

})(this);
