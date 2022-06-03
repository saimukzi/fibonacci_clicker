'use strict';

export const FcMain = (function(){

class FcMain {
  constructor(fps){
    const self=this;
    self.FPS = fps;
    self.clickCount = 0;
    self.autoClickerLv = 0;
    self.autoClickerCost = 1;
    self.autoClickerCostX = 1;
  };
  tick(){
    const self=this;
    self.clickCount += self.autoClickerLv;
  };
  click(){
    const self=this;
    self.clickCount+=1;
  };
  upgradable(){
    const self=this;
    if(self.clickCount<self.autoClickerCost)return false;
    return true;
  };
  upgrade(){
    const self=this;
    if(!self.upgradable())return;
    self.clickCount-=self.autoClickerCost;
    self.autoClickerLv+=1;
    const oldCost = self.autoClickerCost;
    self.autoClickerCost += self.autoClickerCostX;
    self.autoClickerCostX = oldCost;
  };
};

return FcMain;

})();
