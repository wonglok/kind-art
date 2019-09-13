<template>
  <div class="item3-con" id="navrect">
    <div @click="overlay = 'menu'" class="hidden  md:flex px-5 border-r border-gray-600 h-full flex items-center justify-center cursor-pointer select-none hover:bg-gray-200 font-serif w-56 xl:w-64 text-center items-center">
      <svg width="62" height="11" viewBox="0 0 62 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="0.5" x2="62" y2="0.5" stroke="black"/>
        <line y1="10.5" x2="62" y2="10.5" stroke="black"/>
      </svg>
    </div>

    <div class="w-fuller select-none cursor-pointer">
      <img :src="titleimg" class="logo-maxer w-8/12 lg:w-9/12 mx-auto" alt="Logo" @click="$router.push(titlelink)">
    </div>
    <div class="block md:hidden absolute mobile-menu w-12 h-12 p-4 cursor-pointer" @click="overlay = 'menu'">
      <svg class="w-9" width="39" height="16" viewBox="0 0 39 16" fill="none" v-if="overlay !== 'menu'" xmlns="http://www.w3.org/2000/svg">
        <line y1="15.5" x2="39" y2="15.5" stroke="black"/>
        <line y1="0.5" x2="39" y2="0.5" stroke="black"/>
        <line y1="8" x2="39" y2="8" stroke="black"/>
      </svg>
    </div>
    <router-link class="titlefont hidden md:flex px-5 border-l border-gray-600 h-full flex items-center justify-center cursor-pointer select-none hover:bg-gray-200 font-serif w-56 xl:w-64 text-center items-center" :to="ctalink">  {{ ctatitle }} </router-link>

    <div v-if="overlay === 'menu'" class=" z-10 fixed top-0 left-0 w-full h-full bg-gray-400">
      <div class="item3-con">
        <div class="hidden md:flex px-5 border-r border-gray-600 h-full flex items-center justify-center cursor-pointer select-none hover:bg-gray-200 font-serif w-56 xl:w-64 text-center items-center" @click="overlay = false">
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="28.3448" y1="1.36207" x2="0.344828" y2="28.0287" stroke="black"/>
            <line x1="0.344828" y1="0.637931" x2="28.3448" y2="27.3046" stroke="black"/>
          </svg>
        </div>

        <div class=" select-none">
          <img src="../img/menu.svg" class="logo-maxer cursor-pointer" alt="Menu" @click="overlay = false">
        </div>

        <div class="block md:hidden absolute mobile-close-menu w-12 h-12 p-4 cursor-pointer" @click="overlay = false">
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="28.3448" y1="1.36207" x2="0.344828" y2="28.0287" stroke="black"/>
            <line x1="0.344828" y1="0.637931" x2="28.3448" y2="27.3046" stroke="black"/>
          </svg>
        </div>
        <div class="hidden md:flex px-5 border-l border-gray-600 h-full flex items-center justify-center cursor-pointer select-none hover:bg-gray-200 font-serif w-56 xl:w-64 text-center items-center" @click="onGift">Gift 🥰</div>
      </div>
      <div class="bg-gray-400 fuller scrolling-touch overflow-y-auto">
        <div class="h-10"></div>
        <div class="mb-10 text-2xl text-center cursor-pointer font-serif" @click="item.action()" :key="i" v-for="(item, i) in items">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleimg: {
      default: require('../img/afa.svg')
    },
    titlelink: {
      default: '/artpop-fan-art'
    },
    ctatitle: {
      default: `Kudos and Credit`
    },
    ctalink: {
      default: `/kudos-and-credits`
    }
  },
  data () {
    return {
      items: [
        {
          name: `Lok's Coding Practice`,
          action: () => {
            this.$router.push('/')
            this.overlay = false
          }
        },
        {
          name: 'FAN ART: ARTPOP Playground',
          action: () => {
            this.$router.push('/artpop-fan-art')
            this.overlay = false
          }
        },
        {
          name: 'Lok\'s IG',
          action: () => {
            window.open(`https://instagram.com/wonglok831`)
            this.overlay = false
          }
        },
        {
          name: `Lok's Twitter`,
          action: () => {
            window.open(`https://twitter.com/wonglok831`)
            this.overlay = false
          }
        },
        {
          name: 'Kudos and Credits',
          action: () => {
            this.$router.push('/kudos-and-credits')
            // window.open(`https://instagram.com/wonglok831`)
            this.overlay = false
          }
        }
      ],
      overlay: false
    }
  },
  watch: {
    overlay () {
      this.$emit('overlay', this.overlay)
    }
  },
  methods: {
    onGift () {
      window.alert(`Humanity needs your beautiful heart. - Lok Lok`)
    }
  }
}
</script>

<style lang="postcss" scoped>
.fuller {
  height: calc(100% - 5rem);
}
.w-fuller{
  width: 100%;
}

@screen md {
  .w-fuller{
    width: calc(100% - 14rem * 2.0);
  }
}
@screen xl {
  .w-fuller{
    width: calc(100% - 16rem * 2.0);
  }
}

.mobile-menu{
  top: 15px;
  right: 20px;
  -webkit-tap-highlight-color: transparent;
}

.mobile-close-menu{
  top: 10px;
  right: 20px;
  -webkit-tap-highlight-color: transparent;
}

.item3-con{
  @apply relative h-20 flex justify-center items-center border-b border-gray-600 text-xl;
}
@screen md {
  .item3-con{
    @apply justify-between;
  }
}

.logo-maxer{
  max-height: 3rem;
}
</style>
