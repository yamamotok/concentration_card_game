/** @fileOverview
 * 
 * The entry point of TrumpApp
 *
 */

require("jsb.js");

require('src/lib/underscore.js');
require('src/lib/signals.js');

require('src/sceneMain.js');
require('src/layerBase.js');
require('src/layerBackground.js');
require('src/layerControl.js');
require('src/layerCard.js');
require('src/layerGesture.js');

cc.dumpConfig();

var director = cc.Director.getInstance();
director.setDisplayStats(true);
director.setAnimationInterval(1.0 / 60);

var mainScene = game.sceneMain.create();
director.runWithScene(mainScene);

