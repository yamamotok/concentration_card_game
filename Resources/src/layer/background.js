/** @fileOverview
 *
 * Layer that is responsible for the background image
 *
 */
(function(root){
	//
	// name spaces
	//
	var Layer = root.layer = root.layer || {};
	if (Layer.background) return;

	/**
	 * constructor
	 * @warning
	 *   create() must be used to instantiate this
	 */
	Layer.background = function() {
		// instance variables
		this._parent = Layer.base.prototype;
		this.className = 'layer.background';

		this.bgLayer = null;
	};

	/**
	 * class variables
	 */
	Layer.background.static = {

	};

	/** 
	 * factory
	 */
	Layer.background.create = function(scene) {
		var obj = Layer.base.create(scene);
		_.extend(obj, new Layer.background());
		obj._init();
		return obj;
	};

	var __ = Layer.background.prototype;

	/**
	 * initialize this
	 */
	__._init = function() {
		this._parent._init.call(this);
	};

	/**
	 * callback for onEnter
	 */
	__.onEnter = function() {
		this._parent.onEnter.call(this);

		// spread background
		if (!this.bgLayer) {
			var bg = cc.LayerColor.create(cc.c4b(0, 128, 32, 255));
			this.addChild(bg);
			this.bgLayer = bg;
		}
	};

})(this);
