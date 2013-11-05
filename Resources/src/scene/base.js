/** @fileOverview
 *
 * base class of each scenes
 *
 */
(function(root){
	//
	// name spaces
	//
	var Scene = root.scene = root.scene || {};
	if (root.scene.base) return;

	/**
	 * constructor
	 * @warning
	 *   create() must be used to instantiate this
	 */
	Scene.base = function() {
		// instance variables
		this._parent = cc.Scene;
		this.className = 'scene.base';

		this.layers = [];

		// signals, that are initialized in _init()
		this.notified = null;
	};

	/**
	 * class variables
	 */
	Scene.base.static = {

	};

	/** 
	 * factory
	 */
	Scene.base.create = function() {
		var obj = cc.Scene.create();
		_.extend(obj, new Scene.base());
		obj._init();
		return obj;
	};

	var __ = scene.base.prototype;

	/**
	 * initialize this
	 */
	__._init = function() {
		this.notified = new signals();
		this.notified.add(this.onNotified, this, -1);
	};

	/**
	 * set layers, the order of layers is important
	 * @param {Array} array of layers
	 */
	__.setLayers = function(layers) {
		this.layers = layers;
		for (var i = this.layers.length - 1; i > 0; i --) {
			this.layers[i].lowerLayer = this.layers[i - 1];
		}
		this.layers.forEach(function(v, i, a){
			this.addChild(v);
		}, this);
	};

	/**
	 * get a layer on the top
	 * @param {Number} layer index
	 */
	__.getLayer = function(index) {
		return this.layers[index];
	};

	/**
	 * get a layer on the top
	 */
	__.getTopLayer = function() {
		return this.getLayer(this.layers.length - 1);
	};

	/**
	 * onEnter callback
	 */
	__.onEnter = function() {
		// start receiving 'notified' signal
		this.notified.add(this.onNotified, this);
	};

	/**
	 * 'notified' signal handler
	 * @param {String} name of the notification 
	 * @param {Object} optional arguments
	 */
	__.onNotified = function(name, params) {
		if (this.layers.length < 1) return;

		// cascade the notification to the top layer
		switch (name) {
			// touch notification is special,
			//    handle it by specified way
			case root.const.notification.touched:
				this.getTopLayer().touched.dispatch(params.position);
				break;

			// other notifications
			default:
				this.getTopLayer().notified.dispatch(name, params);
				break;
		}			
	};

})(this);
