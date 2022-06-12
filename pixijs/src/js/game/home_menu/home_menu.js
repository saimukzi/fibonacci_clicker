// import HomeMenu from '../../game/home_menu/home_menu.js';

import * as smz_game_object from '../../smz/smz_game_object.js';
import * as PIXI from 'pixi.js';
import HomeMenuBtn from '../../game/home_menu/home_menu_btn.js';

import * as fc_scene from '../../game/fc/fc_scene.js';

'use strict';

export const HomeMenu = (function(){

class HomeMenu extends smz_game_object.SmzGameObject {

  constructor(runtime){
    super(runtime);
    const self = this;
    
    self.testBtn = new HomeMenuBtn(self.runtime);
    self.testBtn.onFire = ()=>{
      console.log("QMIPGGAV");
      self.runtime.setScene(new fc_scene.FcScene(self.runtime));
    };
    self.addChild(self.testBtn);
  };

};

return HomeMenu;

})();

export default HomeMenu;
