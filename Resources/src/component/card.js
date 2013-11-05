/** @fileOverview
 *
 * Card Compornent
 *   the template of one card
 *
 */
(function(root){
	//
	// name spaces
	//
	var Component = root.component = root.component || {};
	if (Component.card) return;

	var Config = root.const.config;

	/**
	 * constructor
	 * @warning
	 *   create() must be used to instantiate this
	 */
	Component.card = function() {
		// instance variables
		this._parent = cc.Layer;
		this.className = 'component.card';

		this.scene = null;
		this.index = 0;
	};

	/**
	 * class variables
	 */
	Component.card.static = {

	};

	/** 
	 * factory
	 * @param {cc.Scene}
	 * @param {Number} card index
	 */
	Component.card.create = function(scene, index) {
		var obj = cc.Layer.create();
		_.extend(obj, new Component.card());
		obj.scene = scene;
		obj.index = index;
		obj._init(scene, index);
		return obj;
	};

	var __ = Component.card.prototype; ///<< shorthand

	/**
	 * initialize this
	 */
	__._init = function() {
		this.ignoreAnchorPointForPosition(false);
		this.setAnchorPoint(cc.p(0.0, 0.0));
		this.setContentSize(Config.CARD_SIZE);
	};

	/**
	 * render this card acording to its state
	 */
	__.updateView = function() {
		var cards = root.data.cards.getInstance();

		var image = null;
		if (!cards.isOpened(this.index)) {
			image = cc.LayerColor.create(cc.c4b(88, 88, 88, 255));
		} else if (cards.getType(this.index) === Config.CARD_TYPES[0]) {
			image = cc.LayerColor.create(cc.c4b(222, 190, 190, 255));
		} else if (cards.getType(this.index) === Config.CARD_TYPES[1]) {
			image = cc.LayerColor.create(cc.c4b(190, 222, 190, 255));
		} else if (cards.getType(this.index) === Config.CARD_TYPES[2]) {
			image = cc.LayerColor.create(cc.c4b(190, 190, 222, 255));
		} else if (cards.getType(this.index) === Config.CARD_TYPES[3]) {
			image = cc.LayerColor.create(cc.c4b(60, 88, 222, 255));
		}
		
		image.ignoreAnchorPointForPosition(false);
		image.setAnchorPoint(cc.p(0.0, 0.0));
		image.setContentSize(this.getContentSize());

		this.removeAllChildren();
		this.addChild(image);
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
			root.const.notification.cardTouched, {index: this.index});

		return false; // halt propagation
	};

	/**
	 * callback for onEnter
	 */
	__.onEnter = function() {
		cc.log('component.card.onEnter');
		this.updateView();
	};	

})(this);


