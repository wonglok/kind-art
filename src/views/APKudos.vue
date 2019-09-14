<template>
  <div class="bg-gray-400 font-serif">
    <HeaderNavAFA :titleimg="require('../img/kudos.svg')" :titlelink="'/remixer'" :ctatitle="'Go Back'" :ctalink="'/remixer'"></HeaderNavAFA>
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
