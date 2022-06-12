// import Sokoban from '../../game/sokoban/sokoban.js';

import * as smz_game_object from '../../smz/smz_game_object.js';
import * as PIXI from 'pixi.js';

import SokobanMap from '../../game/sokoban/sokoban_map.js';

'use strict';

export const Sokoban = (function(){

class Sokoban extends smz_game_object.SmzGameObject {

  constructor(runtime){
    super(runtime);
    const self = this;
    
    self.sokobanMap = new SokobanMap(self.runtime);
    self.addChild(self.sokobanMap);
  };

};

return Sokoban;

})();

export default Sokoban;
