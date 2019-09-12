<template>
  <div class="h-56 border-b border-gray-700 w-full" @click="$emit('select', ui)" :id="domID"></div>
</template>

<script>
export default {
  props: {
    ui: {}
  },
  data () {
    let domID = `_${(Math.random() * 1000000000).toFixed(0)}`
    this.ui.domID = domID
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
