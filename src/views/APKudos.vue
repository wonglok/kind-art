<template>
  <div class="bg-gray-400 font-serif">
    <HeaderNavAFA :titleimg="require('../img/kudos.svg')" :ctatitle="'ARTPOP Playground'" :ctalink="'/artpop-fan-art'"></HeaderNavAFA>
  </div>
</template>

<script>
export default {
  components: {
    HeaderNavAFA: require('../uis-afa/HeaderNavAFA.vue').default
  }
}
</script>

<style>

</style>
