<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

onMounted(() => {
  userStore.initStore()
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>


<style>
html{
        background-color: #0e0e0e;
        color: #ffffff;
        font-family: 'Poppins', sans-serif;
        margin: 0;
        padding: 0;
         /* scroll-behavior: smooth; */
}
h1,
      h2,
      h3 {
        font-size: 2rem;
        color: rgba(208, 208, 208, 0.934); /* Neon Cyan */
      }




</style>
