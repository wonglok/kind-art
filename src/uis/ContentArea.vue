<template>
  <div class="full">
    <keep-alive>
      <component class="full" v-if="item.component" :item="item" :is="item.component"></component>
    </keep-alive>
  </div>
</template>

<script>
export default {
  props: {
    item: {}
  }
}
</script>

<style>

</style>
