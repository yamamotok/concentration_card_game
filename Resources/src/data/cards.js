/** @fileOverview
 *
 * Data Object for group of cards
 *
 */
(function(root){
	//
	// name spaces
	//
	var Data = root.data = root.data || {};
	if (Data.cards) return;

	var Config = root.const.config;

	/**
	 * Class Cards
	 */
	var Cards = function() {
		this.data = [];
		this.historyOpened = [];
		this.STATE_DOWN = 1;
		this.STATE_OPEN = 2;
		this.OPEN_HISTORY_SIZE = 8;
	};

	var __ = Cards.prototype; ///<< shorthand

	/**
	 * initialize this
	 */
	__._init = function() {
		// prepare cards
		this.data = [];
		this.historyOpened = [];
		var num_cards = Config.NUM_OF_CARDS;
		var card_types = Config.CARD_TYPES;
		for (var i = 0; i < num_cards; i ++) {
			var type = card_types[i % card_types.length];
			this.data.push({
				type: type,
				state: this.STATE_DOWN
			});
		}
		this.shuffle();
	};

	/**
	 * shuffle cards, states of all are changed to DOWN
	 */
	__.shuffle = function() {
		this.data.forEach(function(v){
			v.state = this.STATE_DOWN;
		});
		this.data = _.shuffle(this.data);
	};

	/**
	 * get the number of cards
	 * @return {Number}
	 */
	__.getNumOfCards = function() {
		return this.data.length;
	};

	/**
	 * get the type of a card
	 * @param {Number} card index
	 * @return {Object} each of const.config.CARD_TYPES
	 */
	__.getType = function(index) {
		return this.data[index].type;
	};

	/**
	 * set a record of history of opened cards
	 * @param {Number} card index
	 */
	__.setHistoryOpened = function(index) {
		this.historyOpened.push(index);
		if (this.historyOpened.length > this.OPEN_HISTORY_SIZE) {
			this.historyOpened.shift();
		}
	};

	/**
	 * is the card opened?
	 * @param {Number} card index
	 */
	__.isOpened = function(index) {
		return this.data[index].state == this.STATE_OPEN;
	};

	/**
	 * set the state of a card
	 * @param {Number} card index
	 * @param {Boolean} is opened or not
	 */
	__.setOpened = function(index, opened) {
		if (opened) {
			this.setHistoryOpened(index);
		}
		this.data[index].state = opened ?
			this.STATE_OPEN :
			this.STATE_DOWN;
	};

	/**
	 * get number of opened cards
	 * @return {Number}
	 */
	__.getNumOfOpened = function() {
		var count = 0;
		for (var i in this.data) {
			if (this.isOpened(i)) count ++;
		}
		return count;
	};

	/**
	 * is user trying to open the first card?
	 * @return {Boolean}
	 */
	__.isTryingFirst = function() {
		return this.getNumOfOpened() % 2 == 0
	};

	/**
	 * find an opened and not-paired card
	 * @return {Number} found card index
	 */
	__.findNotPaired = function() {
		if (this.isTryingFirst()) return null;

		var notPaired = null;
		Config.CARD_TYPES.some(function(type){
			var hit = [];
			for (var i in this.data) {
				if (this.isOpened(i) && this.getType(i) === type) {
					hit.push(i);
				}
			}
			if (hit.length == 1) {
				notPaired = hit[0];
				return true;
			}
		}, this);

		return notPaired;
	};

	/**
	 * return hit or not
	 * @param {Number} card index
	 * @return {Boolean}
	 */
	__.guess = function(index) {
		var notPaired = this.findNotPaired();
		return notPaired !== null &&
				this.getType(notPaired) === this.getType(index);
	};

	/**
	 * set not-paired card down
	 */
	__.setDownNotPaird = function() {
		var notPaired = this.findNotPaired();
		if (notPaired === null) return;

		this.setOpened(notPaired, false);
	};

	/**
	 * reset data, when user is going to retry new game
	 */
	__.reset = function() {
		this._init();
	};

	//
	// Create the singleton object
	//
	Data.cards = {};
	Data.cards._singleton = new Cards();
	Data.cards._singleton._init();

	/**
	 * Get the singleton instance of Cards Data Object
	 * @return {Object}
	 */
	Data.cards.getInstance = function() {
		return Data.cards._singleton
	}

})(this);
