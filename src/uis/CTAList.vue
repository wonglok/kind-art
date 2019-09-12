<template>
  <div class="h-full w-56 xl:w-64 border-l border-gray-600 scrolling-touch overflow-y-auto">
    <router-link class="text-xl font-serif border-b border-gray-600 py-6 text-center select-none hover:bg-gray-200 cursor-pointer flex items-center justify-center h-64" to="/artpop-fan-art">
      ARTPOP <br/>
      FanART Maker
    </router-link>
    <a class="text-xl font-serif border-b border-gray-600 py-6 text-center select-none hover:bg-gray-200 cursor-pointer flex items-center justify-center h-64" target="_blank" href="https://github.com/wonglok/kind-art">
      Code Share 👑
    </a>
    <a class="text-xl font-serif border-b border-gray-600 py-6 text-center select-none hover:bg-gray-200 cursor-pointer flex items-center justify-center h-64" target="_blank" href="https://effectnode.com">
      Effect Node 😎
    </a>

    <a class="text-xl font-serif border-b border-gray-600 py-6 text-center select-none hover:bg-gray-200 cursor-pointer flex items-center justify-center h-64" target="_age" href="https://age.wonglok.com">
      Assisted Graphics Engineering. 🦄
    </a>
    <a class="text-xl font-serif border-b border-gray-600 py-6 text-center select-none hover:bg-gray-200 cursor-pointer flex items-center justify-center h-64" target="_blank" href="https://igraph.effectnode.com">
      iGraph Cinematics 🎥
    </a>
    <div class="text-xl font-serif border-b border-gray-600 py-6 text-center select-none hover:bg-gray-200 cursor-pointer flex items-center justify-center h-64" @click="bamboozo">
      Click Bait. 😂
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    bamboozo () {
      window.alert(`You've been bamboozled!`)
    }
  }
}
</script>

<style>

</style>
