<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

function logout() {
    userStore.removeToken()
}
</script>

<template>
    <div >

       
        <nav class="pt-4 pr-8 pl-8 pb-4 flex items-center justify-between  bg-nav-grey">
            <NuxtLink to="/" class="text-lg text-lime-400">University Archive</NuxtLink>

            <div class="flex items-center text-sm space-x-4">
                <NuxtLink to="/" class=" hover:text-lime-200 text-gray-400">Home</NuxtLink>
                <NuxtLink to="/browse" class=" hover:text-lime-200 text-gray-400">Browse</NuxtLink>
                <NuxtLink to="/myarchives" class="  hover:text-lime-200  text-gray-400 rounded-xl">My archive</NuxtLink>
                <NuxtLink to="/createarchive" class="   hover:text-lime-200  text-gray-400 pr-72 rounded-xl">Create archive</NuxtLink>
                       <div class="flex mt-6 md:mt-0 items-center space-x-4">
                    <template class="flex flex-row gap-3" v-if="userStore.user.isAuthenticated">
                       <div ><a v-on:click="logout" class=" hover:text-lime-200 border-b-lime-900 hover:border-lime-900 border-2  p-1 pl-3 pr-3 text-gray-400 rounded-xl">Log out</a>
            </div>
                    </template>

                    <template v-else class="">
                        <NuxtLink to="/login" class="  hover:text-lime-200  text-gray-400 ">Log in</NuxtLink>
                        <NuxtLink to="/signup" class="hover:text-lime-200  text-gray-400  ">Sign up</NuxtLink>
                    </template>
                </div>
            </div>
        </nav>
       

        <slot />

        <footer class="p-6 flex flex-wrap items-center justify-between bg-custom-grey">
            <p class="text-gray-300">Copyright (c) 2023 -University archive</p>

           
        </footer>
    </div>
</template>


<style>
</style>