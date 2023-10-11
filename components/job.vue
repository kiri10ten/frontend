<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const emit = defineEmits(['deleteArchive'])
const{data: subject } = await useFetch("http://13.127.219.13:8000/api/v1/archive/subjects/")
const props = defineProps({
    my: {
        type: [Boolean]
    },
    archive: {
        type: [Object]
    }
})

async function deleteArchive(id) {
    await $fetch('http://13.127.219.13:8000/api/v1/archive/' + id + '/delete/', {
        method: 'DELETE',
        headers: {
            'Authorization': 'token ' + userStore.user.token,
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        console.log('response', response)

        emit('deleteArchive', id)
    })
    .catch(error => {
        console.log(error)
    })
}
</script>

<template>
    
    <div class="bg-custom-grey pt-4 flex flex-col   rounded-md">

        <div class=" pl-6">
            <a :href="archive.url" class="text-gray-400 text-base hover:text-lime-400 ">{{ archive.title }}</a>
            <p class="text-gray-400 text-sm pt-2">{{ archive.subject_title }}</p>
        </div>

        <div class="flex flex-row  justify-between pl-6 pt-3 pb-7 pr-6 gap-5">
           
            
                <div class="pt-2">
                <p class="text-gray-400 max-sm:text-xs text-sm">Author: {{ archive.created_by_initials }}</p>
                </div>
                  <div class="pt-2">
                  <p class="text-gray-400  max-sm:text-xs text-sm"> {{ archive.created_at_formatted }}</p>
                 
          
           

          
            
           </div>
            <div class="flex  gap-6 
            ">
                <NuxtLink v-bind:to="'/browse/' + archive.id" class="text-gray-400 bg-transparent text-sm p-2 max-sm:text-xs max-sm:p-2 hover:text-gray-200">
                    Details
                </NuxtLink>
                
            </div>
        </div>
       
    <div>
                    <NuxtLink v-bind:to="'/editjob/' + archive.id" v-if="my" class="bg-green-200  text-gray-800 max-sm:text-xs rounded-sm  max-sm:p-2 text-sm  p-2">
                        Edit
                    </NuxtLink>
                    <a @click="deleteArchive(archive.id)" v-if="my" class=" bg-red-200 text-gray-800 rounded-sm  max-sm:text-xs text-sm max-sm:p-2 p-2">
                        Delete
                    </a>
                </div>






    </div>
    
</template>

