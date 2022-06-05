import Cookies from 'js-cookie'

import * as freq_ctrl from './smz_freq_ctrl.js'

'use strict';

export const SmzSave = (function(){

class SmzSave {
  constructor(gameMain){
    const self=this;
    self.gameMain = gameMain;
    
    self.autoSaveFreqCtrl = new freq_ctrl.SmzFreqCtrl(-60000,()=>{self.save();})
    
    self.lastSave = "";
  };
  
  load(){
    const self=this;
    var data;
    data = Cookies.get('fc_1654335253');
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
    Cookies.set('fc_1654335253', data, { sameSite: 'strict' });
    self.lastSave = new Date();
  };
  
  tick(){
    const self=this;
    self.autoSaveFreqCtrl.tick();
  };
};

return SmzSave;

})();
