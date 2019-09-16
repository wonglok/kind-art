<template>
  <div v-if="ui">

    <div class="ml-3">
      <div><b>Shape</b></div>
      <div>
        <select v-model="ui.doc.geotype">
          <option :value="geo" :key="geo" v-for="geo in geolist">{{ geo }}</option>
        </select>
      </div>

      <div :key="sg._id" v-for="sg in sliderGroups">
        <div><b>{{ sg.displayName }}</b></div>
        <div class="text-xs flex items-center ml-3" :key="slider._id" v-for="slider in sg.sliders">
          <span>{{ slider.displayName }}</span>
          <input @click="stopTween(slider.key)" class="ml-3 inline w-24" type="range" v-model="ui.doc[slider.key]" :min="slider.min" :max="slider.max" :step="slider.step" />
          <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween(slider.key, slider.multiply, slider.min, slider.max)" >{{ display(slider.key) }}</div>
        </div>
      </div>

      <!-- <p>
        <b>Bloom: </b>
      </div>
      <div class="text-xs flex items-center ml-3">
        Threshold
        <input class="ml-3 inline w-24" type="range" v-model="ui.doc.threshold" min="0" max="1" step="0.0001" />
      </div>
      <div class="text-xs flex items-center ml-3">
        Strength
        <input class="ml-3 inline w-24" type="range" v-model="ui.doc.strength" min="0" max="3" step="0.0001" />
      </div>

      <div class="text-xs flex items-center ml-3">
        Radius
        <input class="ml-3 inline w-24" type="range" v-model="ui.doc.radius" min="0" max="3" step="0.0001" />
      </div> -->

      <!-- <button @click="copyValue" class=" font-sans btn btn-blue my-1 mx-1">Copy JS</button>
      <button @click="copyJSON" class=" font-sans btn btn-blue my-1 mx-1">Copy JSON</button> -->
    </div>
  </div>
</template>

<script>
import * as API from '../apis/api'
import copy from 'copy-to-clipboard'
export default {
  props: {
    uis: {},
    currentID: {}
  },
  computed: {
    ui () {
      return this.uis.find(e => e._id === this.currentID)
    },
    geolist () {
      return API.geoList()
    }
  },
  data () {
    return {
      sliderGroups: API.SliderGroups
    }
  },
  methods: {
    display (v) {
      if (this.ui.tween[v]) {
        return this.ui.tween[v].type
      } else {
        return '0'
      }
    },
    copyValue () {
      copy(JSON.stringify(this.ui, null, '  ').split('"').join(`'`))
    },
    copyJSON () {
      copy(JSON.stringify(this.ui, null, '  '))
    },
    stopTween (v) {
      this.ui.tween[v] = this.ui.tween[v] || { type: 0, multiply: 1, min: false, max: false }
      this.ui.tween[v].type = 0
      this.ui.tween[v].multiply = this.ui.tween[v].multiply || 1.0
      this.ui.tween[v].min = false
      this.ui.tween[v].max = false

      this.$forceUpdate()
    },
    swapTween (v, multiply = 1, min = false, max = false) {
      this.ui.tween[v] = this.ui.tween[v] || { type: 0, multiply, min: false, max: false }
      this.ui.tween[v].type = Number(this.ui.tween[v].type)
      this.ui.tween[v].type++
      this.ui.tween[v].type = this.ui.tween[v].type % 10

      this.ui.tween[v].multiply = multiply
      this.ui.tween[v].min = min
      this.ui.tween[v].max = max

      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>

</style>
