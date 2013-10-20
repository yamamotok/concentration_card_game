var game = game || {};
game.layerGesture = game.layerGesture || {};

/**
 * constructor
 * @warning
 *   game.layerGesture.create() must be used to get an instance
 */
game.layerGesture.class = function() {
	this._parent = game.layerBase.class.prototype;

	// properties
	this.className = 'layerGesture';
};

/**
 * callback for onEnter
 */
game.layerGesture.class.prototype.onEnter = function() {
	this._parent.onEnter.call(this);
	cc.log('onEnter was called, of ' + this.className);

	this.setTouchEnabled(true);
};

game.layerGesture.class.prototype.onTouchesBegan = function(touches) {

};

game.layerGesture.class.prototype.onTouchesMoved = function(touches) {

};

game.layerGesture.class.prototype.onTouchesEnded = function(touches) {
	this.touched.dispatch('touched');
};

/**
 * initialize this
 */
game.layerGesture.class.prototype._init = function() {
	this._parent._init.call(this);	
};

/**
 * create a game.layerGesture.class instance
 * @static
 * 
 * @return {game.layerGesture.class}
 */
game.layerGesture.create = function() {
	var obj = game.layerBase.create();
	_.extend(obj, new game.layerGesture.class());
	obj._init();
	return obj;
};
