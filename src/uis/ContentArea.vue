<template>
  <div class="full">
    <component class="full" v-if="item.component" :item="item" :is="item.component"></component>
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
