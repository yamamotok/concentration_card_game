/** @fileOverview
 *
 * Congiguration of this app
 *
 */
(function(root){
	//
	// name spaces
	//
	var Const = root.const = root.const || {};
	if (Const.config) return;

	//
	// define configuration
	//
	Const.config = {
		// number of cards
		NUM_OF_CARDS: 8,
		
		// card types
		CARD_TYPES: [
			{name: 'A'},
			{name: 'B'},
			{name: 'C'},
			{name: 'D'},
		],
		
		// number of rows
		ROWS: 2,
		// number of columns
		COLS: 4,
		
		// size of a card (pixcel)
		CARD_SIZE: cc.size(66, 100),
		
		// size of a retry-button (pixcel)
		RETRY_BUTTON_SIZE: cc.size(100, 28),

		// initial value of the score
		INITIAL_SCORE: 10000,

		// lost score, when user failed cards pairing
		LOST_SCORE: 1000,


	};

})(this);