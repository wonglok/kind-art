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

    <!--
      <div>
        <b>Color</b>
      </div>
      <div class="text-xs flex items-center ml-3">
        Hue
        <input @click="stopTween('hue')" class="ml-3 inline w-24" type="range" v-model="ui.doc.hue" min="0" max="1" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('hue', 1, 0, 1)" >{{ display('hue') }}</div>
      </div>
      <div class="text-xs flex items-center ml-3">
        Satuation
        <input @click="stopTween('satuation')" class="ml-3 inline w-24" type="range" v-model="ui.doc.satuation" min="0" max="1" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('satuation', 1, 0, 1)">{{ display('satuation') }}</div>
      </div>
      <div class="text-xs flex items-center ml-3">
        Lightness
        <input @click="stopTween('light')" class="ml-3 inline w-24" type="range" v-model="ui.doc.light" min="0" max="1" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('light', 1, 0, 1)">{{ display('light') }}</div>
      </div>

      <div>
        <b>Background</b>
      </div>
      <div class="text-xs flex items-center ml-3">
        Hue
        <input @click="stopTween('bghue')" class="ml-3 inline w-24" type="range" v-model="ui.doc.bghue" min="0" max="1" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('bghue', 1, 0, 1)" >{{ display('bghue') }}</div>
      </div>
      <div class="text-xs flex items-center ml-3">
        Satuation
        <input @click="stopTween('bgsatuation')" class="ml-3 inline w-24" type="range" v-model="ui.doc.bgsatuation" min="0" max="1" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('bgsatuation', 1, 0, 1)">{{ display('bgsatuation') }}</div>
      </div>
      <div class="text-xs flex items-center ml-3">
        Lightness
        <input @click="stopTween('bglight')" class="ml-3 inline w-24" type="range" v-model="ui.doc.bglight" min="0" max="1" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('bglight', 1, 0, 1)">{{ display('bglight') }}</div>
      </div>

      <div>
        <b>Light Direction</b>
      </div>
      <div class="text-xs flex items-center ml-3">
        X
        <input @click="stopTween('lightDirX')" class="ml-3 inline w-24" type="range" v-model="ui.doc.lightDirX" min="-3" max="3" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('lightDirX', 3, -3, 3)">{{ display('lightDirX') }}</div>
      </div>
      <div class="text-xs flex items-center ml-3">
        Y
        <input @click="stopTween('lightDirY')" class="ml-3 inline w-24" type="range" v-model="ui.doc.lightDirY" min="-3" max="3" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('lightDirY', 3, -3, 3)">{{ display('lightDirY') }}</div>
      </div>
      <div class="text-xs flex items-center ml-3">
        Z
        <input @click="stopTween('lightDirZ')" class="ml-3 inline w-24" type="range" v-model="ui.doc.lightDirZ" min="-3" max="3" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('lightDirZ', 3, -3, 3)">{{ display('lightDirZ') }}</div>
      </div>

      <div>
        <b>Shininess</b>
      </div>
      <div class="flex items-center ml-3">
        <input @click="stopTween('matShininess')" class="ml-3 inline w-24" type="range" v-model="ui.doc.matShininess" min="0" max="100" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('matShininess', 100, 1, 100)">{{ display('matShininess') }}</div>
      </div>

      <div>
        <b>Twist</b>
      </div>
      <div class="flex items-center ml-3">
        X
        <input @click="stopTween('twistX')" class="ml-3 inline w-24" type="range" v-model="ui.doc.twistX" min="-3.14159265" max="3.14159265" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('twistX', 3.14159265, -3.14159265, 3.14159265)">{{ display('twistX') }}</div>
      </div>
      <div class="flex items-center ml-3">
        Y
        <input @click="stopTween('twistY')" class="ml-3 inline w-24" type="range" v-model="ui.doc.twistY" min="-3.14159265" max="3.14159265" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('twistY', 3.14159265, -3.14159265, 3.14159265)">{{ display('twistY') }}</div>
      </div>

      <div class="flex items-center ml-3">
        Z
        <input @click="stopTween('twistZ')" class="ml-3 inline w-24" type="range" v-model="ui.doc.twistZ" min="-3.14159265" max="3.14159265" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('twistZ', 3.14159265, -3.14159265, 3.14159265)">{{ display('twistZ') }}</div>
      </div>

      <div>
        <b>Rotate</b>
      </div>
      <div class="flex items-center ml-3">
        X
        <input @click="stopTween('rotateX')" class="ml-3 inline w-24" type="range" v-model="ui.doc.rotateX" min="-3.14159265" max="3.14159265" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('rotateX', 3.14159265, -3.14159265, 3.14159265)">{{ display('rotateX') }}</div>
      </div>
      <div class="flex items-center ml-3">
        Y
        <input @click="stopTween('rotateY')" class="ml-3 inline w-24" type="range" v-model="ui.doc.rotateY" min="-3.14159265" max="3.14159265" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('rotateY', 3.14159265, -3.14159265, 3.14159265)">{{ display('rotateY') }}</div>
      </div>

      <div class="flex items-center ml-3">
        Z
        <input @click="stopTween('rotateZ')" class="ml-3 inline w-24" type="range" v-model="ui.doc.rotateZ" min="-3.14159265" max="3.14159265" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('rotateZ', 3.14159265, -3.14159265, 3.14159265)">{{ display('rotateZ') }}</div>
      </div>

      <div>
        <b>Position</b>
      </div>
      <div class="flex items-center ml-3">
        X
        <input @click="stopTween('positionX')" class="ml-3 inline w-24" type="range" v-model="ui.doc.positionX" min="-10" max="10" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('positionX', 10, -10, 10)">{{ display('positionX') }}</div>
      </div>
      <div class="flex items-center ml-3">
        Y
        <input @click="stopTween('positionY')" class="ml-3 inline w-24" type="range" v-model="ui.doc.positionY" min="-10" max="10" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('positionY', 10, -10, 10)">{{ display('positionY') }}</div>
      </div>
      <div class="flex items-center ml-3">
        Z
        <input @click="stopTween('positionZ')" class="ml-3 inline w-24" type="range" v-model="ui.doc.positionZ" min="-10" max="10" step="0.0001" />
        <div class="ml-2 rounded-lg shadow-lg w-6 h-6 border-gray-500 border font-sans text-center inline-flex items-center justify-center select-none cursor-pointer text-xs"  @click="swapTween('positionZ', 10, -10, 10)">{{ display('positionZ') }}</div>
      </div> -->

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

      <button @click="copyValue" class=" font-sans btn btn-blue my-1 mx-1">Copy JS</button>
      <button @click="copyJSON" class=" font-sans btn btn-blue my-1 mx-1">Copy JSON</button>
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
