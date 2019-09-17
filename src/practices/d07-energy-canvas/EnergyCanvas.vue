<template>
  <div class="full">
    <HybridList class="full" @loadmore="onLoadMore" v-if="list && APIs" :list="list" :APIs="APIs" @select="onSelect"></HybridList>
  </div>
</template>

<script>
import * as API from '../../apis/api'
import * as wAPI from '../../apis/wAPI'
export default {
  components: {
    HybridList: require('./HybridList.vue').default
  },
  data () {
    return {
      APIs: {},
      list: [],
      currentID: false
    }
  },
  methods: {
    onSelect () {

    },
    onLoadMore () {
      let newItem = {
        _id: API.getID(),
        text: `1236789`
      }
      this.list.push(newItem)
      window.dispatchEvent(new Event('scroll-to-bottom'))
    },
    load () {
      setTimeout(() => {
        let collections = wAPI.aphorismCollections()
        collections.forEach((coll) => {
          this.list.push(...coll.quotes.slice())
        })

        this.currentID = this.list[0]._id
        this.$forceUpdate()
      }, 100)
    }
  },
  mounted () {
    this.load()
  }
}
</script>

<style>

</style>
