var game = game || {};
game.sceneMain = game.sceneMain || {};

game.sceneMain.class = function() {
	this.className = 'sceneMain';
};

game.sceneMain.class.prototype.onEnter = function() {
	cc.log('onEnter was called, of ' + this.className);

	var background = game.layerBackground.create();
	background.addTo(this);

	var control = game.layerControl.create();
	control.addTo(this).setLowerLayer(background);
	
	var card = game.layerCard.create();
	card.addTo(this).setLowerLayer(control);

	var gesture = game.layerGesture.create();
	gesture.addTo(this).setLowerLayer(card);
};

/**
 * add this layer to a parent node
 * @param {cc.Node} parent
 */
game.sceneMain.class.prototype.addTo = function(parent) {
	parent.addChild(this);
};

/**
 * create a game.sceneMain.class instance
 * @static
 * 
 * @return {game.sceneMain.class}
 */
game.sceneMain.create = function() {
	var obj = cc.Scene.create();
	_.extend(obj, new game.sceneMain.class());
	return obj;
};
