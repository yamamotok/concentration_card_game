/** @fileOverview
 *
 * main scene
 *
 */
(function(root){
	//
	// name spaces
	//
	var Scene = root.scene = root.scene || {};
	if (root.scene.main) return;

	/**
	 * constructor
	 * @warning
	 *   create() must be used to instantiate this
	 */
	Scene.main = function() {
		// instance variables
		this._parent = Scene.base.prototype;
		this.className = 'scene.main';
	};

	/**
	 * class variables
	 */
	Scene.main.static = {

	};

	/** 
	 * factory
	 */
	Scene.main.create = function() {
		var obj = Scene.base.create();
		_.extend(obj, new Scene.main());
		obj._init();
		return obj;
	};

	var __ = Scene.main.prototype;

	/**
	 * initialize this
	 */
	__._init = function() {
		this._parent._init.call(this);
	};

	/**
	 * onEnter callback
	 * @override
	 */
	__.onEnter = function() {
		this._parent.onEnter.call(this);

		// set layers, from bottom to top
		this.setLayers([
			layer.background.create(this),
			layer.card.create(this),
			layer.control.create(this),
			layer.gesture.create(this)
		]);
	};

	/**
	 * 'notified' signal handler
	 * @override
	 */
	__.onNotified = function(name, params) {
		this._parent.onNotified.call(this, name, params);

		if (name == root.const.notification.retryButtonTouched) {
			var cardLayer = this.getLayer(1); //FIXME:
			if (cardLayer.isActionRunning()) {
				// animation in the card layer is still in progress
				return true;
			}
			// reset cards data
			var cardData = root.data.cards.getInstance();
			cardData.reset();

			// reset score data
			var scoreData = root.data.score.getInstance();
			scoreData.reset();
			
			// refresh view
			this.notified.dispatch(
				root.const.notification.refreshCards, {});
			this.notified.dispatch(
				root.const.notification.showScore, {});

			return false;
		}
	};

})(this);
