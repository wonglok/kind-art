<template>
  <div class="bg-gray-200 font-serif">
    <HeaderNavAFA :titlelink="'/artpop-fan-art'" :ctatitle="'Go Back'" :ctalink="'/'"></HeaderNavAFA>
    <ContentBoxAFA></ContentBoxAFA>
  </div>
</template>

<script>
export default {
  components: {
    HeaderNavAFA: require('../uis-afa/HeaderNavAFA.vue').default,
    ContentBoxAFA: require('../uis-afa/ContentBoxAFA.vue').default
  }
}
</script>

<style>

</style>
