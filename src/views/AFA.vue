<template>
  <div class="bg-gray-200 font-serif">
    <HeaderNavAFA :titlelink="'/remixer'" :ctatitle="'Go Back'" :ctalink="'/'"></HeaderNavAFA>
    <RemixerAppAFA></RemixerAppAFA>
  </div>
</template>

<script>
export default {
  components: {
    HeaderNavAFA: require('../uis-afa/HeaderNavAFA.vue').default,
    RemixerAppAFA: require('../uis-afa/RemixerAppAFA.vue').default
  }
}
</script>

<style>

</style>
