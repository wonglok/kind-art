<template>
  <div class="bg-gray-400 font-serif">
    <HeaderNavAFA></HeaderNavAFA>
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
