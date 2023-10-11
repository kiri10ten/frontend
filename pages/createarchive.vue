<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
    if (!userStore.user.isAuthenticated) {
        router.push('/login')
    }
})

let {data: subjects} = await useFetch('http://13.127.219.13:8000/api/v1/archive/subjects/')

let subject = ref('')
let title = ref('')
let description=ref('')
let link =ref('')
let errors = ref([])

async function submitForm() {
    console.log('submitForm')

    errors.value = []

    if (subject.value == '') { errors.value.push('You must select a category')}
    if (title.value == '') { errors.value.push('The title field is missing')}
    if (description.value == '') { errors.value.push('The description field is missing')}
    if (link.value == '') { errors.value.push('The link field is missing') }

    
    if (errors.value.length == 0) {
        await $fetch('http://13.127.219.13:8000/api/v1/archive/create/', {
            method: 'POST',
            headers: {
                'Authorization': 'token ' + userStore.user.token,
                'Content-Type': 'application/json'
            },
            body: {
                subject: subject.value,
                title: title.value,
                description: description.value,
                url: link.value
                
            }
        })
        .then(response => {
            console.log('response', response)

            router.push({path: '/myarchives'})
        })
        .catch(error => {
            if (error.response) {
                for (const property in error.response._data) {
                    errors.value.push(`${property}: ${error.response._data[property]}`)
                }
                console.log(JSON.stringify(error.response))
            } else if (error.message) {
                errors.value.push('Something went wrong. Please try again')
                
                console.log(JSON.stringify(error))
            }
        })
    }
}
</script>

<template>
    <div class="py-10 px-6">
        <h1 class="mb-6 text-2xl">Create Archive</h1>

        <form v-on:submit.prevent="submitForm" class="space-y-4">
            <div >
                <label class="flex flex-col">Subject</label>

                <select v-model="subject" class="w-56 h-8 mt-2 p-4 rounded-xl bg-black border-2 border-white">
                    <option value="">Select subject</option>
                    <option
                        v-for="subject in subjects"
                        v-bind:key="subject.id"
                        v-bind:value="subject.id"
                    >
                        {{ subject.title }}
                    </option>
                </select>
            </div>

            <div class="flex flex-col ">
                <label class="">Title</label>
                <input v-model="title" type="text" class="w-full border-2 border-white  mt-2 p-2 rounded-md bg-black">
            </div>

            <div>
                <label>Description</label>
               
                 <input type="text" v-model="description" class="w-full mt-2 p-4 rounded-xl border-2 border-white  bg-black">
            </div>

            <div>
                <label>Link</label>
                <input type="text" v-model="link" class="w-full mt-2 p-4 rounded-xl border-2 border-white  bg-black">
            </div>

           
            <div
                v-if="errors.length" 
                class="mb-6 py-4 px-6 bg-rose-400 text-white  rounded-xl"
            >
                <p v-for="error in errors" v-bind:key="error">
                    {{ error }}
                </p>
            </div>

            <button class="py-4 px-6 bg-black border-2 border-white text-white rounded-xl">Submit</button>
        </form>
    </div>
</template>