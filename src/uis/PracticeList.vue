<template>
  <div class="">
    <div class="border-b border-gray-600 py-6 text-center select-none hover:bg-gray-200 cursor-pointer font-serif" :key="i" v-for="(item, i) in items" @click="$emit('item', item)">
      Day {{ item.day }} - {{ item.name }}
    </div>
  </div>
</template>

<script>
import * as API from '../apis/api'
export default {
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    items () {
      return API.practices
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>

</style>
