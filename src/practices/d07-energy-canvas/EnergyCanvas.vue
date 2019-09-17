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
        this.list = [
          {
            _id: API.getID(),
            text: `1236789`
          }
        ]

        this.list = wAPI.aphorismCollections()[0].quotes.slice()

        console.log(this.list)
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
