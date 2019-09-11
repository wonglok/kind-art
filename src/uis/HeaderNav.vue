<template>
  <div>
    <div class="relative h-20 flex justify-center md:justify-between items-center border-b border-gray-600 text-xl">
      <div class="hidden md:flex px-5 border-r border-gray-600 h-full flex items-center justify-center cursor-pointer select-none hover:bg-gray-200 font-serif w-48 text-center items-center">
        <svg width="62" height="11" viewBox="0 0 62 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line y1="0.5" x2="62" y2="0.5" stroke="black"/>
          <line y1="10.5" x2="62" y2="10.5" stroke="black"/>
        </svg>
      </div>
      <div class="">
        <img src="../img/logo.svg" alt="">
      </div>
      <div class="block md:hidden absolute mobile-menu w-12 h-12 p-4 cursor-pointer">
        <svg class="w-9" width="39" height="16" viewBox="0 0 39 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line y1="15.5" x2="39" y2="15.5" stroke="black"/>
          <line y1="0.5" x2="39" y2="0.5" stroke="black"/>
          <line y1="8" x2="39" y2="8" stroke="black"/>
        </svg>
      </div>
      <div class="hidden md:flex px-5 border-l border-gray-600 h-full flex items-center justify-center cursor-pointer select-none hover:bg-gray-200 font-serif w-48 text-center items-center">LOL LOL</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.mobile-menu{
  top: 15px;
  right: 30px;
}
</style>
