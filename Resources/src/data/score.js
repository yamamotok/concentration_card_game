/** @fileOverview
 *
 * Data Object for the score
 *
 */
(function(root){
	//
	// name spaces
	//
	var Data = root.data = root.data || {};
	if (Data.score) return;

	var Config = root.const.config;

	/**
	 * Class Score
	 */
	var Score = function() {
		this.score = 0;
	};

	var __ = Score.prototype; ///<< shorthand

	/**
	 * initialize this
	 */
	__._init = function() {
		this.score = Config.INITIAL_SCORE;
	};

	/**
	 * get the value of score
	 * @return {Number}
	 */
	__.getScore = function() {
		return this.score;
	};

	/**
	 * reduce score, when user failed cards pairing
	 */
	__.scoreFailure = function() {
		this.score -= Config.LOST_SCORE;
	};

	/**
	 * reset the score
	 */
	__.reset = function() {
		this._init();
	};

	//
	// Create the singleton object
	//
	Data.score = {};
	Data.score._singleton = new Score();
	Data.score._singleton._init();

	/**
	 * Get the singleton instance of Score Data Object
	 * @return {Object}
	 */
	Data.score.getInstance = function() {
		return Data.score._singleton
	}

})(this);
