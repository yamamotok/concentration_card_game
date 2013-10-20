var game = game || {};
game.layerBase = game.layerBase || {};

/**
 * constructor
 * @warning
 *   game.layerBase.create() must be used to get an instance
 */
game.layerBase.class = function() {
	this._parent = cc.Layer;

	// properties
	this.className = 'layerBase';
	this.lowerLayer = null;

	this.touched = null; ///<< initialized in _init()
};

/**
 * set the lower layer
 */
game.layerBase.class.prototype.setLowerLayer = function(layer) {
	this.lowerLayer = layer;
	return this;
};

/**
 * cascade down 'touched' signal
 * @param {cc.Point}
 */
game.layerBase.class.prototype.cascadeSignalTouched = function(pos) {
	if (!this.lowerLayer) return;

	cc.log('touched signal was cascaded from ' + this.className + '(layerBase)');
	this.lowerLayer.touched.dispatch(pos);
};



/**
 * add this layer to a parent node
 * @param {cc.Node} parent
 * @return {game.layerBase} myself
 */
game.layerBase.class.prototype.addTo = function(parent) {
	parent.addChild(this);
	return this;
};

/**
 * callback for onEnter
 */
game.layerBase.class.prototype.onEnter = function() {
	cc.log('onEnter was called, of ' + this.className + '(layerBase)');
};

/**
 * initialize this
 */
game.layerBase.class.prototype._init = function() {
	// init signals
	this.touched = new signals();
	this.touched.add(this.cascadeSignalTouched, this);
};

/**
 * create a game.layerBase.class instance
 * @static
 * 
 * @return {game.layerBase.class}
 */
game.layerBase.create = function() {
	var obj = cc.Layer.create();
	_.extend(obj, new game.layerBase.class());
	obj._init();
	return obj;
};

