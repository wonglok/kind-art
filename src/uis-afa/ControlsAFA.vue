<template>
  <div v-if="ui">
    <select v-model="ui.doc.geotype">
      <option :value="'box'">box</option>
      <option :value="'cylinder'">cylinder</option>
      <option :value="'sphere'">sphere</option>
      <option :value="'torusknot'">torusknot</option>
    </select>

    <input type="range" v-model="ui.doc.seed" min="0" max="1" step="0.0001">
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
