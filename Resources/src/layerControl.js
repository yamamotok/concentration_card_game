var game = game || {};
game.layerControl = game.layerControl || {};

/**
 * constructor
 * @warning
 *   game.layerControl.create() must be used to get an instance
 */
game.layerControl.class = function() {
	this._parent = game.layerBase.class.prototype;

	// properties
	this.className = 'layerControl';
};

/**
 * callback for onEnter
 */
game.layerControl.class.prototype.onEnter = function() {
	this._parent.onEnter.call(this);
	cc.log('onEnter was called, of ' + this.className);
};

/**
 * initialize this
 */
game.layerControl.class.prototype._init = function() {
	this._parent._init.call(this);	
};

/**
 * create a game.layerControl.class instance
 * @static
 * 
 * @return {game.layerControl.class}
 */
game.layerControl.create = function() {
	var obj = game.layerBase.create();
	_.extend(obj, new game.layerControl.class());
	obj._init();
	return obj;
};

