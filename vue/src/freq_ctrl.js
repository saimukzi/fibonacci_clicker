import * as freq_counter from './freq_counter.js'

'use strict';

export const FreqCtrl = (function(){

class FreqCtrl {
  constructor(freq,callback){
    const self=this;
    self.freq = freq;
    self.callback = callback;

    self.inFreqCounter = new freq_counter.FreqCounter();
    self.outFreqCounter = new freq_counter.FreqCounter();
    
    if(freq>0){
      self.msList = Array(freq);
      for(var i=0;i<self.msList.length;++i){
        self.msList[i] = Math.floor((1000*(i+1))/freq) - Math.floor((1000*i)/freq);
      }
      self.msDiffMax = Math.floor(2500/freq);
    }else{
      self.msList = [-freq];
      self.msDiffMax = Math.floor(2.5*(-freq));
    }
    self.msListIdx = 0;
    
    self.lastMs = Date.now();
  };
  tick(){
    const self=this;
    
    self.inFreqCounter.tick();
    
    const NOW_MS = Date.now();
    if(NOW_MS-self.lastMs>self.msDiffMax){
      self.lastMs = NOW_MS-self.msDiffMax;
    }
    while(self.lastMs<NOW_MS){
      self.outFreqCounter.tick();
      self.callback();
      self.lastMs += self.msList[self.msListIdx];
      self.msListIdx += 1;
      self.msListIdx %= self.msList.length;
    }
  };
};

return FreqCtrl;

})();
