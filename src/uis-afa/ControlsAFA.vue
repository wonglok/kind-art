<template>
  <div v-if="ui">
    {{ ui }}
  </div>
</template>

<script>
export default {
  props: {
    uis: {},
    currentID: {}
  },
  computed: {
    ui () {
      return this.uis.find(e => e._id === this.currentID)
    }
  }
}
</script>

<style scoped>

</style>
