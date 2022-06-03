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
    self.remain = 0;
  };
  tick(){
    const self=this;
    self.remain += self.autoClickerLv;
    const add = Math.floor(self.remain/self.FPS);
    self.remain %= self.FPS;
    self.clickCount += add;
  };
  click(){
    const self=this;
    self.clickCount+=1;
  };
  upgradeAutoClickerOk(){
    const self=this;
    if(self.clickCount<self.autoClickerCost)return false;
    return true;
  };
  upgradeAutoClicker(){
    const self=this;
    if(!self.upgradeAutoClickerOk())return;
    self.clickCount-=self.autoClickerCost;
    self.autoClickerLv+=1;
    const oldCost = self.autoClickerCost;
    self.autoClickerCost += self.autoClickerCostX;
    self.autoClickerCostX = oldCost;
  };
};

return FcMain;

})();
