<script setup>
import * as fc_main from './fc_main.js'
import * as freq_ctrl from './freq_ctrl.js'
</script>

<script>
export default {
  data() {
    return {
      fcMain: new fc_main.FcMain(20),
      freqCtrl: new freq_ctrl.FreqCtrl(1,()=>{this.fcMain.tick();}),
      x:0,
      tsList:[],
      fps:0,
    }
  },
  methods: {
    tick() {
      const self=this;
      //self.tsList.push(Date.now());
      //while(self.tsList.length>51){
      //  self.tsList.shift();
      //}
      //if(self.tsList.length>=2){
      //  const tsListLen = self.tsList.length;
      //  const timeLen = self.tsList[tsListLen-1]-self.tsList[0];
      //  self.fps = (tsListLen-1)*1000/(timeLen);
      //}
      //self.fcMain.tick();
      self.freqCtrl.tick();
    }
  },
  mounted() {
    this.tickTimer = setInterval(this.tick, 1000/20);
  },
  beforeDestroy() {
    clearInterval(this.tickTimer);
  },
}
</script>

<template>
  <button @click="fcMain.click">click={{ fcMain.clickCount }}</button>
  <button @click="fcMain.upgrade">lv={{ fcMain.autoClickerLv }} cost={{ fcMain.autoClickerCost }}</button>
  <div>fps={{fps}}</div>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
