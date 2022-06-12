// import FcScene from '../../game/___/new_smz_game_object.js';

import * as fc_game from './fc_game.js';
import * as smz_freq_ctrl from '../../smz/smz_freq_ctrl.js';
import * as smz_game_object from '../../smz/smz_game_object.js';
import * as PIXI from 'pixi.js';

'use strict';

export const FcScene = (function(){

class FcScene extends smz_game_object.SmzGameObject {

  constructor(runtime){
    super(runtime);
    const self = this;
    
    self.game = new fc_game.FcGame(20);
    self.gameFpsCtrl = new smz_freq_ctrl.SmzFreqCtrl(20, ()=>{self.game.tick();});
  };
  
  tick(){
    const self = this;
    console.log("FcScene.tick");
    self.gameFpsCtrl.tick();
  };

};

return FcScene;

})();

export default FcScene;
