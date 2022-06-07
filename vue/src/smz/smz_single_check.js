import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid';

'use strict';

export const SmzSingleCheck = (function(){

class SmzSingleCheck {
  constructor(key){
    const self=this;
    self.key = key;
    self.uuid = uuidv4();
    self.good = self.check();
    if(self.good){
      self.write();
      self.writeTimer = setInterval(()=>{self.write();}, 10000);
    }
    console.log(`SmzSingleCheck good=${self.good}`);
  };
  
  onEnd(){
    const self = this;
    if(!self.good)return;
    clearInterval(this.writeTimer);
    this.remove();
  };

  write(){
    const self = this;
    console.log(`SmzSingleCheck.write uuid=${self.uuid}, good=${self.good}`);
    var nowTs = Date.now();
    Cookies.set(this.key, `${this.uuid}|${nowTs}`, { sameSite: 'strict'});
  };

  remove(){
    const self = this;
    Cookies.remove(this.key, { sameSite: 'strict'});
  };

  check(){
    var value = Cookies.get(this.key, { sameSite: 'strict'});
    console.log(`SmzSingleCheck.check value=${value}`);
    if(value==null)return true;
    value = value.split("|");
    if(value[0]==this.key)return true;
    var ts = parseInt(value[1]);
    const nowTs = Date.now();
    if(nowTs-ts>30000)return true;
    return false;
  };
};

return SmzSingleCheck;

})();
