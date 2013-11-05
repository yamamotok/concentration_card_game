/** @fileOverview
 *
 * layer that is responsible for recognizing user's gesture input
 *
 */
 (function(root){
	//
	// name spaces
	//	
	var Layer = root.layer = root.layer || {};
	if (Layer.gesture) return;

	/**
	 * constructor
	 * @warning
	 *   create() must be used to instantiate this
	 */
	Layer.gesture = function() {
		// instance variables
		this._parent = Layer.base.prototype;
		this.className = 'layer.gesture';

		this.lastPositionWhenBegan = null;
		this.lastPositionWhenMoved = null;
	};

	/**
	 * class variables
	 */
	Layer.gesture.static = {

	};

	/** 
	 * factory
	 */
	Layer.gesture.create = function(scene) {
		var obj = Layer.base.create(scene);
		_.extend(obj, new Layer.gesture());
		obj._init();
		return obj;
	};

	var __ = Layer.gesture.prototype;

	/**
	 * initialize this
	 */
	__._init = function() {
		this._parent._init.call(this);
	};

	__.recognizeTouch = function() {
		// touched simply
		if (!this.lastPositionWhenMoved && this.lastPositionWhenBegan) {
			return true;
		}

		// touched, but it is with movement
		var d = Math.sqrt(
			Math.pow(this.lastPositionWhenMoved.x - this.lastPositionWhenBegan.x, 2) +
			Math.pow(this.lastPositionWhenMoved.y - this.lastPositionWhenBegan.y, 2));
		if (d > 15) {
			cc.log('touch canceled because of it was with movement'); //XXX:debug
			return false;
		}
		return true;
	};

	/**
	 * callback for onEnter
	 */
	__.onEnter = function() {
		this._parent.onEnter.call(this);

		// make this layer touch-sensitive
		this.setTouchEnabled(true);
	};

	/**
	 * onTouchesBegan callback
	 */
	__.onTouchesBegan = function(touches) {
		var pos = touches[0].getLocation();
		this.lastPositionWhenBegan = pos;
	};

	/**
	 * onTouchesMoved callback
	 */
	__.onTouchesMoved = function(touches) {
		var pos = touches[0].getLocation();
		this.lastPositionWhenMoved = pos;
	};

	/**
	 * onTouchesEnded callback
	 */
	__.onTouchesEnded = function(touches) {
		if (this.recognizeTouch()) {
			this.scene.notified.dispatch(
				root.const.notification.touched,
				{position: touches[0].getLocation()});
		}
		this.lastPositionWhenBegan = null;
		this.lastPositionWhenMoved = null;
	};

})(this);
