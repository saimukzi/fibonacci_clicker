import Cookies from 'js-cookie'

import * as freq_ctrl from './freq_ctrl.js'

'use strict';

export const FcSave = (function(){

class FcSave {
  constructor(fcMain){
    const self=this;
    self.fcMain = fcMain;
    
    self.autoSaveFreqCtrl = new freq_ctrl.FreqCtrl(-60000,()=>{self.save();})
    
    self.lastSave = "";
  };
  
  load(){
    const self=this;
    var data;
    data = Cookies.get('fc_1654335253');
    if(data){
      data = JSON.parse(data);
      self.fcMain.import(data);
      return;
    }
  };
  
  save(){
    const self=this;
    var data = self.fcMain.export();
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

return FcSave;

})();
