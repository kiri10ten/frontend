<script setup>
const route = useRoute()

const { data: archives } = await useFetch('http://13.127.219.13:8000/api/v1/archive/' + route.params.id + '/')
console.log(archives)


useSeoMeta({
    title: archives.value.title,
    ogTitle: archives.value.title,
    description: archives.value.description
})
</script>

<template>
     <div class="bg-custom-grey pt-4 flex flex-col justify-center    rounded-md">

            <div class=" pl-6">
                <a :href="archives.url" class="text-gray-400 text-2xl hover:text-lime-400 "> Title : {{ archives.title }}</a>
                
                
                <p class="text-gray-400 text-sm pt-3 "> {{ archives.description }}</p>
                <p class=" text-sm text-lime-400 pt-5"><span class="text-gray-400"> Subject :</span> {{ archives.subject_title }}</p>
                  <p class=" text-lime-400 text-sm"><span class="text-gray-400">Created by : </span>{{ archives.created_by_initials }}</p>
                  <p class=" text-lime-400 text-sm"> <span class="text-gray-400 "> Created at :</span>{{ archives.created_at_formatted }}</p>
                  <div class="pt-7"> <a :href="archives.url" class=" hover:text-gray-700 hover:bg-lime-400    text-xl bg-neutral-900 rounded-lg p-3 text-lime-400 "> Archive Link</a> 
                   <div>
    <svg  class="text-opacity-40 " width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 7L5.5 5.5M15 7L16.5 5.5M5.5 16.5L7 15M11 5L11 3M5 11L3 11M17.1603 16.9887L21.0519 15.4659C21.4758 15.3001 21.4756 14.7003 21.0517 14.5346L11.6992 10.8799C11.2933 10.7213 10.8929 11.1217 11.0515 11.5276L14.7062 20.8801C14.8719 21.304 15.4717 21.3042 15.6375 20.8803L17.1603 16.9887Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg></div>
                </div>
            </div>

            
            
     </div>
   
</template>