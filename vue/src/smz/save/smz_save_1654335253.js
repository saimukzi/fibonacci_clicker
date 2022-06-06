import Cookies from 'js-cookie'

import * as smz_freq_ctrl from '../smz_freq_ctrl.js'

'use strict';

export const SmzSave1654335253 = (function(){

const SmzSave1654335253 = {};

class SmzSave1654335253Class {
  constructor(gameMain){
    const self=this;
    self.gameMain = gameMain;
    
    self.autoSaveFreqCtrl = new smz_freq_ctrl.SmzFreqCtrl(-60000,()=>{self.save();})
    
    self.lastSave = "";
  };
  
  load(){
    const self=this;
    var data = null;
    if(!data) data = SmzSave1654335253.get();
    if(data){
      data = JSON.parse(data);
      self.gameMain.import(data);
      return;
    }
  };
  
  save(){
    const self=this;
    var data = self.gameMain.export();
    data = JSON.stringify(data);
    console.log(`YGQKQJUN save data=${data}`);
    SmzSave1654335253.set(data);
    self.lastSave = new Date();
  };
  
  tick(){
    const self=this;
    self.autoSaveFreqCtrl.tick();
  };

};
SmzSave1654335253.Class = SmzSave1654335253Class;

SmzSave1654335253.get = function(){
  return Cookies.get('fc_1654335253');
};

SmzSave1654335253.set = function(data){
  Cookies.set('fc_1654335253', data, { sameSite: 'strict' });
};

return SmzSave1654335253;

})();
