import Cookies from 'js-cookie'

import * as smz_common from '../smz_common.js'; const common=smz_common.SmzCommon;
import * as smz_freq_ctrl from '../smz_freq_ctrl.js'
import * as smz_save_1654335253 from './smz_save_1654335253.js'

'use strict';

export const SmzSave1654396554 = (function(){

const AUTOSAVE_PREFIX = 'fc.autosave.v1654396554';
const AUTOSAVE_SLOT_COUNT = 3;

const SmzSave1654396554 = {};

class SmzSave1654396554Class {
  constructor(gameMain){
    const self=this;
    self.gameMain = gameMain;
    
    self.autoSaveFreqCtrl = new smz_freq_ctrl.SmzFreqCtrl(-60000,()=>{self.saveAutoSave();});
    
    self.lastSave = "";
  };
  
  saveAutoSave(){
    const self=this;
    var data = self.gameMain.export();
    data = JSON.stringify(data);
    console.log(`YGQKQJUN save data=${data}`);
    SmzSave1654396554.setAutoSave(data);
    self.lastSave = new Date();
  };
  
  loadAutoSave(){
    console.log("loadAutoSave");
    const self=this;
    while(true){
      var data = SmzSave1654396554.getAutoSave();
      if(data==null)break;
      try{
        data = JSON.parse(data);
        var importRet = self.gameMain.import(data);
        if(importRet)return true;
      }catch(err){
      }
      SmzSave1654396554.rmTopAutoSave();
    }
    return false;
  };
  
  tick(){
    const self=this;
    self.autoSaveFreqCtrl.tick();
  };

};
SmzSave1654396554.Class = SmzSave1654396554Class;

SmzSave1654396554.setAutoSave = function(data){
  var bestAutoSaveSlot = null;
  var bestAutoSaveTs   = null;
  for(var autoSaveSlot=0;autoSaveSlot<AUTOSAVE_SLOT_COUNT;++autoSaveSlot){
    var autoSaveTs = SmzSave1654396554.getTs(`${AUTOSAVE_PREFIX}.${autoSaveSlot}`);
    if(!autoSaveTs){
      bestAutoSaveSlot = autoSaveSlot;
      bestAutoSaveTs = autoSaveTs;
      break;
    }
    if((bestAutoSaveTs==null)||(autoSaveTs<bestAutoSaveTs)){
      bestAutoSaveSlot = autoSaveSlot;
      bestAutoSaveTs = autoSaveTs;
    }
  }
  console.assert(bestAutoSaveSlot!=null);

  const nowTs = Date.now();
  SmzSave1654396554.setData(`${AUTOSAVE_PREFIX}.${bestAutoSaveSlot}`, data);
  SmzSave1654396554.setTs(`${AUTOSAVE_PREFIX}.${bestAutoSaveSlot}`, nowTs);
};

SmzSave1654396554.getAutoSave = function(){
  console.log("getAutoSave");
  while(true){
    var bestAutoSaveSlot = null;
    var bestAutoSaveTs   = null;
    for(var autoSaveSlot=0;autoSaveSlot<AUTOSAVE_SLOT_COUNT;++autoSaveSlot){
      var autoSaveTs = SmzSave1654396554.getTs(`${AUTOSAVE_PREFIX}.${autoSaveSlot}`);
      console.log(`getAutoSave autoSaveTs=${autoSaveTs}`);
      if(autoSaveTs==null)continue;
      if((bestAutoSaveTs==null)||(autoSaveTs>bestAutoSaveTs)){
        bestAutoSaveSlot = autoSaveSlot;
        bestAutoSaveTs = autoSaveTs;
      }
    }
    if(bestAutoSaveSlot==null){
      break;
    }
    var bestAutoSaveData = SmzSave1654396554.getData(`${AUTOSAVE_PREFIX}.${bestAutoSaveSlot}`);
    if(bestAutoSaveData==null){
      SmzSave1654396554.rm(`${AUTOSAVE_PREFIX}.${bestAutoSaveSlot}`);
      continue;
    }
    return bestAutoSaveData;
  }
  
  // load old data, upgrade, output
  var data = smz_save_1654335253.SmzSave1654335253.get();
  if(data==null)return null;
  data = SmzSave1654396554.upgradeFrom1654335253(data);
  return data;
};

SmzSave1654396554.rmTopAutoSave = function(){
  var bestAutoSaveSlot = null;
  var bestAutoSaveTs   = null;
  for(var autoSaveSlot=0;autoSaveSlot<AUTOSAVE_SLOT_COUNT;++autoSaveSlot){
    var autoSaveTs = SmzSave1654396554.getTs(`${AUTOSAVE_PREFIX}.${autoSaveSlot}`);
    if(!autoSaveTs)continue;
    if((bestAutoSaveTs==null)||(autoSaveTs>bestAutoSaveTs)){
      bestAutoSaveSlot = autoSaveSlot;
      bestAutoSaveTs = autoSaveTs;
    }
  }
  if(bestAutoSaveSlot==null){
    return;
  }
  SmzSave1654396554.rm(`${AUTOSAVE_PREFIX}.${autoSaveSlot}`);
};

SmzSave1654396554.setTs = function(prefix, ts){
  Cookies.set(`${prefix}.ts`, ts, { sameSite: 'strict', expires: 40000 });
};

SmzSave1654396554.getTs = function(prefix){
  try{
    var ts = Cookies.get(`${prefix}.ts`);
    if(!ts)return null;
    ts = parseInt(ts);
    return ts;
  }catch(e){
    SmzSave1654396554.rm(prefix);
    return null;
  }
};

SmzSave1654396554.setData = function(prefix, data){
  Cookies.set(`${prefix}.data`, JSON.stringify(data), { sameSite: 'strict', expires: 40000 });
};

SmzSave1654396554.getData = function(prefix){
  try{
    var data = Cookies.get(`${prefix}.data`);
    if(!data)return null;
    data = JSON.parse(data);
    return data;
  }catch(e){
    SmzSave1654396554.rm(prefix);
    return null;
  }
};

SmzSave1654396554.rm = function(prefix){
  Cookies.remove(`${prefix}.ts`, { sameSite: 'strict' });
  Cookies.remove(`${prefix}.data`, { sameSite: 'strict' });
};

SmzSave1654396554.upgradeFrom1654335253 = function(data){
  return common.clone(data);
};

return SmzSave1654396554;

})();
