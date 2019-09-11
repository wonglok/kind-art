<template>
  <div class="bg-gray-400 font-serif">
    <HeaderNav></HeaderNav>
    <ContentBox></ContentBox>
  </div>
</template>

<script>
export default {
  components: {
    HeaderNav: require('../uis/HeaderNav.vue').default,
    ContentBox: require('../uis/ContentBox.vue').default
  }
}
</script>

<style lang="postcss">
</style>
