/** @fileOverview
 * 
 * The entry point of TrumpApp
 *
 */

require("jsb.js");

require('src/lib/underscore.js');
require('src/lib/signals.js');

require('src/const/notification.js');
require('src/const/config.js');
require('src/data/cards.js');
require('src/data/score.js');
require('src/component/card.js');
require('src/component/retryButton.js');

require('src/scene/base.js');
require('src/scene/main.js');
require('src/layer/base.js');
require('src/layer/background.js');
require('src/layer/control.js');
require('src/layer/card.js');
require('src/layer/gesture.js');

cc.dumpConfig();

var director = cc.Director.getInstance();
director.setDisplayStats(true);
director.setAnimationInterval(1.0 / 60);

// Let's get started
var mainScene = scene.main.create();
director.runWithScene(mainScene);

