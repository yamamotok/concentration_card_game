var game = game || {};
game.layerCard = game.layerCard || {};

/**
 * constructor
 * @warning
 *   game.layerCard.create() must be used to get an instance
 */
game.layerCard.class = function() {
	this._parent = game.layerBase.class.prototype;

	// properties
	this.className = 'layerCard';
};

/**
 * callback for onEnter
 */
game.layerCard.class.prototype.onEnter = function() {
	this._parent.onEnter.call(this);
	cc.log('onEnter was called, of ' + this.className);
};

/**
 * initialize this
 */
game.layerCard.class.prototype._init = function() {
	this._parent._init.call(this);	
};

/**
 * create a game.layerCard.class instance
 * @static
 * 
 * @return {game.layerCard.class}
 */
game.layerCard.create = function() {
	var obj = game.layerBase.create();
	_.extend(obj, new game.layerCard.class());
	obj._init();
	return obj;
};

