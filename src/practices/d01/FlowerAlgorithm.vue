<template>
  <div class="full relative">
    <Engine :bloom="'default'" :toucher="toucher" v-if="toucher" @ready="engine = $event; setup()"></Engine>
    <div class="full absolute top-0 left-0" ref="toucher"></div>
    <Flower v-if="engine" :engine="engine"></Flower>
  </div>
</template>

<script>
export default {
  components: {
    Engine: require('./Engine.vue').default,
    Flower: require('./Flower.vue').default
  },
  data () {
    return {
      toucher: false,
      engine: false
    }
  },
  mounted () {
    this.toucher = this.$refs['toucher']
  },
  methods: {
    setup () {

    }
  }
}
</script>

<style>

</style>
