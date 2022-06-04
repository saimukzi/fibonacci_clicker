'use strict';

export const FcMain = (function(){

class FcMain {
  constructor(fps){
    const self=this;
    self.FPS = fps;
    self.point = 0;

    self.clickAddPoint = 1;
    self.clickUpgradeMinusPoint = 1;
    self.clickUpgradeMinusPointX = 1;

    self.autoClickerAddPoint = 0;
    self.autoClickerUpgradeMinusPoint = 1;
    self.autoClickerUpgradeMinusPointX = 1;

    self.remain = 0;
  };
  tick(){
    const self=this;
    self.remain += self.autoClickerAddPoint;
    const add = Math.floor(self.remain/self.FPS);
    self.remain %= self.FPS;
    self.point += add;
  };
  click(){
    const self=this;
    self.point+=self.clickAddPoint;
  };
  upgradeClickOk(){
    const self=this;
    if(self.point<self.clickUpgradeMinusPoint)return false;
    return true;
  };
  upgradeClick(){
    const self=this;
    if(!self.upgradeClickOk())return;
    self.point-=self.clickUpgradeMinusPoint;
    self.clickAddPoint+=1;
    const oldCost = self.clickUpgradeMinusPoint;
    self.clickUpgradeMinusPoint += self.clickUpgradeMinusPointX;
    self.clickUpgradeMinusPointX = oldCost;
  };
  upgradeAutoClickerOk(){
    const self=this;
    if(self.point<self.autoClickerUpgradeMinusPoint)return false;
    return true;
  };
  upgradeAutoClicker(){
    const self=this;
    if(!self.upgradeAutoClickerOk())return;
    self.point-=self.autoClickerUpgradeMinusPoint;
    self.autoClickerAddPoint+=1;
    const oldCost = self.autoClickerUpgradeMinusPoint;
    self.autoClickerUpgradeMinusPoint += self.autoClickerUpgradeMinusPointX;
    self.autoClickerUpgradeMinusPointX = oldCost;
  };
};

return FcMain;

})();
