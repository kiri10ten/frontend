<script setup>
// Query

let queryRef = ref('')
let query = ''

function performSearch() {
    queryRef.value = query
}

// subjects

let {data: subjects} = await useFetch('http://13.127.219.13:80008000/api/v1/archive/subjects')
let selectedsubjectsRef = ref('')
let selectedsubjects = []

function toggleCategory(id) {
    const index = selectedsubjects.indexOf(id)

    if (index === -1) {
        selectedsubjects.push(id)
    } else {
        selectedsubjects.splice(index, 1)
    }

    selectedsubjectsRef.value = selectedsubjects.join(',')
}

//

let {data: archives} = await useFetch('http://13.127.219.13:8000/api/v1/archive/', {
    query: { query: queryRef, subjects: selectedsubjectsRef }
})
</script>

<template>
    <div class="grid md:grid-cols-1 gap-3 py-10 px-6">
        <div class="md:col-span-1 px-6 py-6 rounded-xl">
            <div class="flex space-x-4">
                <input v-model="query" type="search" placeholder="type to search  here..." class="border-white w-full px-6 py-4 rounded-xl bg-black text-cyan-50" >
                
                <button 
                    class="px-6 py-4 text-white rounded-xl"
                    v-on:click="performSearch"
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                    
                </button>
            </div>

            <hr class="my-6 opacity-30">

           

            <div class="mt-6 space-y-4">
                <p 
                    v-for="subject in subjects"
                    v-bind:key="subject.id"
                    v-on:click="toggleCategory(subject.id)"
                    class="py-4 px-6 text-white rounded-xl"
                    v-bind:class="{'bg-slate-800 border-white': selectedsubjectsRef.includes(subject.id)}"
                >
                    {{ subject.title }}
                </p>
            </div>
        </div>

        <div class="md:col-span-3">
            <div class="space-y-4">
                <Job
                    v-for="archive in archives"
                    v-bind:key="archive.id"
                    v-bind:archive="archive" 
                    :my="True"/>


                

                    
            </div>
        </div>
    </div>
</template>