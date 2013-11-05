/** @fileOverview
 *
 * names of notifications
 *    that are used to distinguish 'notified' signals
 *
 */
(function(root){
	//
	// name spaces
	//
	root.const = root.const || {};
	if (root.const.notification) return;
	
	//
	// define names of notifications
	//
	root.const.notification = {};
	[
		// single touch gesture was recognized
		// {position: cc.p}
		'touched',
		
		// a card was touched
		// {index: Number}
		'cardTouched',

		// retry-button was touched
		// {}
		'retryButtonTouched',

		// require refresh of cards view
		// {}
		'refreshCards',

		// show some message
		// {message: String}
		'showMessage',

		// show the score
		// {}
		'showScore',

	].forEach(function(name){
		root.const.notification[name] = name;
	});

})(this);