<script setup>
import * as fc_main from './fc_main.js'
import * as fc_save from './fc_save.js'
import * as freq_ctrl from './freq_ctrl.js'
</script>

<script>
export default {
  data() {
    const FPS = 20;

    const retDict = {};
    retDict['fcMain'] = new fc_main.FcMain(FPS);
    retDict['freqCtrl'] = new freq_ctrl.FreqCtrl(FPS,()=>{retDict['fcMain'].tick();});
    retDict['fcSave'] = new fc_save.FcSave(retDict['fcMain']);
    
    return retDict;
  },
  methods: {
    tick() {
      const self=this;
      self.freqCtrl.tick();
      self.fcSave.tick();
    }
  },
  mounted() {
    this.fcSave.load();
    this.tickTimer = setInterval(this.tick, 1000/60);
  },
  beforeDestroy() {
    clearInterval(this.tickTimer);
  },
}
</script>

<template>
  <h1>Fibonacci Clicker</h1>
  <table border="1">
    <tr>
      <td>Value</td>
      <td>Action</td>
      <td>Cost</td>
    </tr>
    <tr>
      <td><b>{{fcMain.point}} point</b></td>
      <td><button @click="fcMain.click">+{{fcMain.clickAddPoint}} point</button></td>
      <td>-</td>
    </tr>
    <tr>
      <td>{{fcMain.clickAddPoint}} pt/click</td>
      <td><button @click="fcMain.upgradeClick" :disabled="!fcMain.upgradeClickOk()">+1 pt/click</button></td>
      <td>-{{fcMain.clickUpgradeMinusPoint}} pt</td>
    </tr>
    <tr>
      <td>{{fcMain.autoClickerAddPoint}} pt/sec</td>
      <td><button @click="fcMain.upgradeAutoClicker" :disabled="!fcMain.upgradeAutoClickerOk()">+1 pt/sec</button></td>
      <td>-{{fcMain.autoClickerUpgradeMinusPoint}} pt</td>
    </tr>
  </table>
  <div>fpsIn={{freqCtrl.inFreqCounter.fps}}</div>
  <div>fpsOut={{freqCtrl.outFreqCounter.fps}}</div>
  <div>lastSave={{fcSave.lastSave}} <button @click="fcSave.save">Save</button></div>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
