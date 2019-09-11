<template>
  <div class="relative h-20 flex justify-center md:justify-between items-center border-b border-gray-600 text-xl">
    <div @click="overlay = 'menu'" class="hidden md:flex px-5 border-r border-gray-600 h-full flex items-center justify-center cursor-pointer select-none hover:bg-gray-200 font-serif w-56 xl:w-64 text-center items-center">
      <svg width="62" height="11" viewBox="0 0 62 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="0.5" x2="62" y2="0.5" stroke="black"/>
        <line y1="10.5" x2="62" y2="10.5" stroke="black"/>
      </svg>
    </div>
    <div class=" select-none cursor-pointer">
      <img src="../img/logo.svg" alt="">
    </div>
    <div class="block md:hidden absolute mobile-menu w-12 h-12 p-4 cursor-pointer" @click="overlay = 'menu'">
      <svg class="w-9" width="39" height="16" viewBox="0 0 39 16" fill="none" v-if="overlay !== 'menu'" xmlns="http://www.w3.org/2000/svg">
        <line y1="15.5" x2="39" y2="15.5" stroke="black"/>
        <line y1="0.5" x2="39" y2="0.5" stroke="black"/>
        <line y1="8" x2="39" y2="8" stroke="black"/>
      </svg>
    </div>
    <div class="hidden md:flex px-5 border-l border-gray-600 h-full flex items-center justify-center cursor-pointer select-none hover:bg-gray-200 font-serif w-56 xl:w-64 text-center items-center"> Lok Lok 🍓 </div>

    <div v-if="overlay === 'menu'" class=" z-10 fixed top-0 left-0 w-full h-full bg-gray-400">
      <div class="relative h-20 flex justify-center md:justify-between items-center border-b border-gray-600 text-xl">
        <div class="hidden md:flex px-5 border-r border-gray-600 h-full flex items-center justify-center cursor-pointer select-none hover:bg-gray-200 font-serif w-56 xl:w-64 text-center items-center" @click="overlay = false">
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="28.3448" y1="1.36207" x2="0.344828" y2="28.0287" stroke="black"/>
          <line x1="0.344828" y1="0.637931" x2="28.3448" y2="27.3046" stroke="black"/>
          </svg>

        </div>
        <div class=" select-none cursor-pointer">
          <img src="../img/menu.svg" alt="">
        </div>
        <div class="block md:hidden absolute mobile-close-menu w-12 h-12 p-4 cursor-pointer" @click="overlay = false">
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="28.3448" y1="1.36207" x2="0.344828" y2="28.0287" stroke="black"/>
            <line x1="0.344828" y1="0.637931" x2="28.3448" y2="27.3046" stroke="black"/>
          </svg>
        </div>
        <div class="hidden md:flex px-5 border-l border-gray-600 h-full flex items-center justify-center cursor-pointer select-none hover:bg-gray-200 font-serif w-56 xl:w-64 text-center items-center">Loving Gift 🥰</div>
      </div>
      <div class="bg-gray-400">
        OMG
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      overlay: false
    }
  },
  watch: {
    overlay () {
      this.$emit('overlay', this.overlay)
    }
  }
}
</script>

<style scoped>
.mobile-menu{
  top: 15px;
  right: 30px;
}
.mobile-close-menu{
  top: 10px;
  right: 20px;
}
</style>
