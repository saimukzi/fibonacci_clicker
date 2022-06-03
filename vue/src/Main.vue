<script setup>
import * as fc_main from './fc_main.js'
import * as freq_ctrl from './freq_ctrl.js'
</script>

<script>
export default {
  data() {
    const FPS = 20;
    return {
      fcMain: new fc_main.FcMain(FPS),
      freqCtrl: new freq_ctrl.FreqCtrl(FPS,()=>{this.fcMain.tick();}),
    }
  },
  methods: {
    tick() {
      const self=this;
      self.freqCtrl.tick();
    }
  },
  mounted() {
    this.tickTimer = setInterval(this.tick, 1000/60);
  },
  beforeDestroy() {
    clearInterval(this.tickTimer);
  },
}
</script>

<template>
  <button @click="fcMain.click">click={{ fcMain.clickCount }}</button>
  <button @click="fcMain.upgradeAutoClicker">autoLV={{ fcMain.autoClickerLv }} cost={{ fcMain.autoClickerCost }}</button>
  <div>fpsIn={{freqCtrl.inFreqCounter.fps}}</div>
  <div>fpsOut={{freqCtrl.outFreqCounter.fps}}</div>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
