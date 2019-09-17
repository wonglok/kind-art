<template>
  <div class=" py-8 border-b border-gray-700 w-full flex items-center justify-center cursor-text font-sans" :id="domID">
    <div class="p-12 text-black text-white">
      {{ li.text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    li: {},
    map: {}
  },
  data () {
    let domID = `_${(Math.random() * 1000000000).toFixed(0)}`
    // this.li.domID = domID
    this.map.set(this.li._id, domID)
    return {
      domID
    }
  },
  mounted () {
    this.$parent.$forceUpdate()
  }
}
</script>

<style>

</style>
