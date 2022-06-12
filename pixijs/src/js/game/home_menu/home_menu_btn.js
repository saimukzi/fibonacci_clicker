// import HomeMenuBtn from '../../game/home_menu/home_menu_btn.js';

import * as smz_game_object from '../../smz/smz_game_object.js';
import * as PIXI from 'pixi.js';

import Sokoban from '../../game/sokoban/sokoban.js';

'use strict';

export const HomeMenuBtn = (function(){

class HomeMenuBtn extends smz_game_object.SmzGameObject {

  onFire() {
    const self=this;
    console.log(`HomeMenuBtn.onFire, self.uuid}=${self.uuid}`);
    self.runtime.setScene(new Sokoban(self.runtime));
  };

  onStateUpdate() {
    const self=this;
    if(!self.isEnabled){
      self.graphics.tint = 0x7F7F7F;
      return;
    }
    if(self.isFired){
      self.graphics.tint = 0x0000FF;
      return;
    }
    if((!self.isOver)&&(!self.isDown)){
      self.graphics.tint = 0x00FF00;
      return;
    }
    if((!self.isOver)&&(self.isDown)){
      self.graphics.tint = 0x00FFFF;
      return;
    }
    if((self.isOver)&&(!self.isDown)){
      self.graphics.tint = 0xFFFF00;
      return;
    }
    if((self.isOver)&&(self.isDown)){
      self.graphics.tint = 0xFF0000;
      return;
    }
  };

  constructor(runtime){
    super(runtime);
    const self = this;

    self.graphics = new PIXI.Graphics();
    self.graphics.beginFill(0xFFFFFF);
    self.graphics.drawRect(0,0,100,100);
    self.graphics.endFill();
    self.addChild(self.graphics);
    
    self.interactive = true;
    self.hitArea = new PIXI.Rectangle(0,0,100,100);
    self.mousedown      = function(ev){self.onMouseDown();};
    self.mouseup        = function(ev){self.onMouseUp();};
    self.mouseupoutside = function(ev){self.onMouseUpOutside();};
    self.mouseover      = function(ev){self.onMouseOver();};
    self.mouseout       = function(ev){self.onMouseOut();};
    
    self.isEnabled = true;
    self.isOver = false;
    self.isDown = false;
    self.isFired = false;
    self.onStateUpdate();
  };

  onMouseDown() {
    const self=this;
    //console.log(`HomeMenuBtn.onMouseDown, self.uuid}=${self.uuid}`);
    self.isDown = true;
    self.onStateUpdate();
  };

  onMouseUp() {
    const self=this;
    //console.log(`HomeMenuBtn.onMouseUp, self.uuid}=${self.uuid}`);
    self.isDown = false;
    if((self.isEnabled)&&(!self.isFired)){
      self.isFired = true;
      self.onFire();
    }
    self.onStateUpdate();
  };

  onMouseUpOutside() {
    const self=this;
    //console.log(`HomeMenuBtn.onMouseUpOutside, self.uuid}=${self.uuid}`);
    self.isDown = false;
    self.onStateUpdate();
  };

  onMouseOver() {
    const self=this;
    //console.log(`HomeMenuBtn.onMouseOver, self.uuid}=${self.uuid}`);
    self.isOver = true;
    self.onStateUpdate();
  };

  onMouseOut() {
    const self=this;
    //console.log(`HomeMenuBtn.onMouseOut, self.uuid}=${self.uuid}`);
    self.isOver = false;
    self.onStateUpdate();
  };

};

return HomeMenuBtn;

})();

export default HomeMenuBtn;
