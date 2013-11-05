/** @fileOverview
 *
 * Retry Button Compornent
 *
 */
(function(root){
	
	var Component = root.component = root.component || {};
	if (Component.retryButton) return;

	var Config = root.const.config;

	/**
	 * constructor
	 * @warning
	 *   create() must be used to instantiate this
	 */
	Component.retryButton = function() {
		// instance variables
		this._parent = cc.Layer;
		this.className = 'component.retryButton';

		this.scene = null;
	};

	/**
	 * class variables
	 */
	Component.retryButton.static = {

	};

	/** 
	 * factory
	 */
	Component.retryButton.create = function(scene) {
		var obj = cc.Layer.create();
		_.extend(obj, new Component.retryButton());
		obj.scene = scene;
		obj._init();
		return obj;
	};

	var __ = Component.retryButton.prototype; ///<< shorthand

	/**
	 * initialize this
	 */
	__._init = function() {
		this.ignoreAnchorPointForPosition(false);
		this.setAnchorPoint(cc.p(0.0, 0.0));
		this.setContentSize(Config.RETRY_BUTTON_SIZE);
	};

	/**
	 * render this card acording to the state
	 */
	__.updateView = function() {
		var base = cc.LayerColor.create(cc.c4b(100, 100, 33, 255));
		base.ignoreAnchorPointForPosition(false);
		base.setAnchorPoint(cc.p(0.0, 0.0));
		base.setContentSize(this.getContentSize());

        var text = cc.LabelTTF.create(
        	'Retry',
        	'Arial', 14,
        	cc.size(this.getContentSize().width, 0),
        	cc.TEXT_ALIGNMENT_CENTER);
		text.ignoreAnchorPointForPosition(false);
        text.setAnchorPoint(cc.p(0.0, 0.0));
		text.setContentSize(this.getContentSize());
		text.setPosition(cc.p(0.0, 6));

		this.removeAllChildren();
		this.addChild(base);
		this.addChild(text);
	};

	/**
	 * touched signal listener
	 * @param {cc.p}
	 */
	__.onTouched = function(pos) {
		var o = this.getPosition();

		var hit = 
			o.x <= pos.x && pos.x <= o.x +this.getContentSize().width &&
			o.y <= pos.y && pos.y <= o.y +this.getContentSize().height;
		if (!hit) {
			return;
		};

		this.scene.notified.dispatch(
			root.const.notification.retryButtonTouched, {});

		return false; // halt propagation
	};

	/**
	 * callback for onEnter
	 */
	__.onEnter = function() {
		cc.log('component.retryButton.onEnter');
		this.updateView();
	};	

})(this);


