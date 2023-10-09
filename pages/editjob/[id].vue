<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

onMounted(() => {
    if (!userStore.user.isAuthenticated) {
        router.push('/login')
    }
})

const {data:archive } = await useFetch('http://13.127.219.13:8000/api/v1/archive/' + route.params.id + '/')
let subject=ref(archive.value.subject)
let title = ref(archive.value.title)
let description = ref(archive.value.description)
let link=ref(archive.value.url)
let errors = ref([])

async function submitForm() {
    console.log('submitForm')

    errors.value = []
    if (subject.value == '') { errors.value.push('The title field is missing') }
    if (title.value == '') { errors.value.push('The title field is missing')}
    if (description.value == '') { errors.value.push('The description field is missing')}
    if (link.value == '') { errors.value.push('The company email field is missing')}

    if (errors.value.length == 0) {
        await $fetch('http://13.127.219.13:8000/api/v1/archive/' + route.params.id + '/edit/', {
            method: 'PUT',
            headers: {
                'Authorization': 'token ' + userStore.user.token,
                'Content-Type': 'application/json'
            },
            body: {
                subject: archive.value.subject,
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
        <h1 class="mb-6 text-2xl">Edit archive</h1>

        <form v-on:submit.prevent="submitForm" class="space-y-4">
            <div>
                <label>Title</label>
                <input v-model="title" type="text" class="w-full mt-2 p-4 rounded-xl border-2 border-white bg-black">
            </div>

            <div>
                <label>Description</label>
                <textarea v-model="description" class="w-full mt-2 p-4 rounded-xl border-2 border-white bg-black"></textarea>
            </div>

           
                <div>
                    <label>Link</label>
                    <textarea v-model="link" class="w-full mt-2 p-4 rounded-xl border-2 border-white bg-black"></textarea>
                </div>
           
                

          
            <div
                v-if="errors.length" 
                class="mb-6 py-4 px-6 bg-rose-400 text-white rounded-xl"
            >
                <p v-for="error in errors" v-bind:key="error">
                    {{ error }}
                </p>
            </div>

            <button class="py-4 px-6  border-2 border-white bg-black text-white rounded-xl">Save changes</button>
        </form>
    </div>
</template>