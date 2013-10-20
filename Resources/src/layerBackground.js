var game = game || {};
game.layerBackground = game.layerBackground || {};

/**
 * constructor
 * @warning
 *   game.layerBackground.create() must be used to get an instance
 */
game.layerBackground.class = function() {
	this._parent = game.layerBase.class.prototype;

	// properties
	this.className = 'layerBackground';
};

/**
 * callback for onEnter
 */
game.layerBackground.class.prototype.onEnter = function() {
	this._parent.onEnter.call(this);
	cc.log('onEnter was called, of ' + this.className);

	var bg = cc.LayerColor.create(cc.c4b(0, 128, 32, 255));
	this.addChild(bg);
};

/**
 * initialize this
 */
game.layerBackground.class.prototype._init = function() {
	this._parent._init.call(this);

	this.touched.add(function(pos){
		cc.log('not handled touched signal');
	}, this);
};

/**
 * create a game.layerBackground.class instance
 * @static
 * 
 * @return {game.layerBackground.class}
 */
game.layerBackground.create = function() {
	var obj = game.layerBase.create();
	_.extend(obj, new game.layerBackground.class());
	obj._init();
	return obj;
};

