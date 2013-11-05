/** @fileOverview
 *
 * base class of each layers
 *
 */
(function(root){
	//
	// name spacdes
	//
	var Layer = root.layer = root.layer || {};
	if (Layer.base) return;

	/**
	 * constructor
	 * @warning
	 *   create() must be used to instantiate this
	 */
	Layer.base = function() {
		// instance variables
		this._parent = cc.Layer;
		this.className = 'layer.base';

		this.scene = null;
		this.lowerLayer = null;

		// signals
		this.touched = null;
		this.perform = null;
	};

	/**
	 * class variables
	 */
	Layer.base.static = {

	};

	/** 
	 * factory
	 */
	Layer.base.create = function(scene) {
		var obj = cc.Layer.create();
		cc.log(obj);
		_.extend(obj, new Layer.base());
		obj.scene = scene;
		obj._init();
		return obj;
	};

	var __ = Layer.base.prototype;

	/**
	 * initialize this
	 */
	__._init = function() {
		// init signals
		this.touched = new signals();
		this.touched.add(this.cascadeSignalTouched, this, -1);

		this.notified = new signals();
		this.notified.add(this.cascadeNotified, this, -1);
	};

	/**
	 * cascade down 'touched' signal
	 * @param {cc.Point}
	 */
	__.cascadeSignalTouched = function(pos) {
		if (!this.lowerLayer) return;

		cc.log('cascadeSignalTouched ' + this.className); //XXX:debug
		this.lowerLayer.touched.dispatch(pos);
	};

	/**
	 * cascade down 'notified' signal
	 * @param {cc.Point}
	 */
	__.cascadeNotified = function(name, params) {
		if (!this.lowerLayer) return;

		cc.log('cascadeNotified ' + this.className); //XXX:debug
		this.lowerLayer.notified.dispatch(name, params);
	};

	/**
	 * onEnter callback
	 */
	__.onEnter = function() {
		cc.log('layer.base.onEnter in' + this.className); //XXX:debug
	};

})(this);
