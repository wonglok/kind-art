<template>
  <div class="fuller">
    <!-- Mobile Content -->
    <div class="block h-full md:hidden ">
      <ARTListAFA @loadmore="onLoadMore" v-if="inMobileViewPort && uis && scenes" :uis="uis" :scenes="scenes" @select="onSelect"></ARTListAFA>
    </div>

    <!-- Desktop Content -->
    <div class="hidden sm:hidden md:flex h-full w-full flex flex-row justify-between">
      <div class="h-full w-56 xl:w-64 border-r border-gray-600 ">
        <ARTListAFA @loadmore="onLoadMore" v-if="inDesktopViewPort && uis && scenes" :uis="uis" :scenes="scenes" @select="onSelect"></ARTListAFA>
      </div>
      <div class="h-full w-fuller">
        Center Content
         {{ currentID }}
         <MainContentAFA :currentID="currentID"></MainContentAFA>
        <!-- <ContentArea v-if="item" :item="item"></ContentArea> -->
      </div>
      <div class="h-full w-56 xl:w-64 border-l border-gray-600 scrolling-touch overflow-y-auto">
        Desktop Right Content
      </div>
    </div>
  </div>
</template>

<script>
let getID = () => {
  return `_` + (Math.random() * 1000000000).toFixed(0)
}

// import * as API from '../apis/api'
export default {
  components: {
    MainContentAFA: require('./MainContentAFA.vue').default,
    ARTListAFA: require('./ARTListAFA.vue').default
  },
  data () {
    return {
      inMobileViewPort: window.innerWidth < 768,
      inDesktopViewPort: window.innerWidth >= 768,
      scenes: {},
      uis: false,
      currentID: false
    }
  },
  async mounted () {
    window.addEventListener('resize', () => {
      this.inMobileViewPort = window.innerWidth < 768
      this.inDesktopViewPort = window.innerWidth >= 768
    }, false)
    setTimeout(() => {
      this.uis = [
        ...this.uis || [],
        {
          _id: getID()
        },
        {
          _id: getID()
        },
        {
          _id: getID()
        },
        {
          _id: getID()
        },
        {
          _id: getID()
        }
      ]
    }, 100)
  },
  methods: {
    onLoadMore () {
      this.uis = [
        ...this.uis,
        {
          _id: getID()
        }
      ]
      this.$nextTick(() => {
        window.dispatchEvent(new Event('scroll-to-bottom'))
      })
    },
    addItem () {
      this.uis = [
        ...this.uis,
        {
          _id: getID()
        }
      ]
    },
    onSelect (ui) {
      this.$forceUpdate()
      this.currentID = ui._id
    }
  }
}
</script>

<style lang="postcss" scoped>
.fuller{
  height: calc(100% - 5rem);
}

@screen md {
  .w-fuller{
    width: calc(100% - 14rem * 2.0);
  }
}
@screen lg {
  .w-fuller{
    width: calc(100% - 16rem * 2.0);
  }
}
</style>
