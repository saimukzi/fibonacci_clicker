'use strict';

export const SmzFreqCounter = (function(){

class SmzFreqCounter {
  constructor(){
    const self=this;
    self.tsList = [];
    self.fps = 0;
  };
  tick(){
    const self=this;
    self.tsList.push(Date.now());
    while(self.tsList.length>100){
      self.tsList.shift();
    }
    if(self.tsList.length>=2){
      const tsListLen = self.tsList.length;
      const timeLen = self.tsList[tsListLen-1]-self.tsList[0];
      self.fps = (tsListLen-1)*1000/(timeLen);
    }
  };
};

return SmzFreqCounter;

})();
