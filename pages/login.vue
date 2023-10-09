<script setup>
import {useUserStore} from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

let email = ref('')
let password = ref('')
let errors = ref([])

async function submitForm() {
    console.log('submitForm')

    errors.value = []

    await $fetch('http://13.127.219.13:8000/api/v1/token/login/', {
        method: 'POST',
        body: {
            username: email.value,
            password: password.value
        }
    })
    .then(data => {
        console.log('response', data.auth_token)

        userStore.setToken(data.auth_token, email.value)

        router.push({path: '/'})
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
</script>

<template>
    <div class="py-10 px-6 ">
        <div class="max-w-sm mx-auto py-6 px-6 shadow-lg rounded-lg bg-custom-grey ">
            <h1 class="mb-6 text-2xl">Log in</h1>

            <form v-on:submit.prevent="submitForm">
                <input v-model="email" type="email" placeholder="Your email address..." class="w-full mb-4 py-2 px-4  bg-opacity-50 bg-black text-gray-50 rounded-sm">
                <input v-model="password" type="password" placeholder="Your password..." class="w-full mb-4 py-2 px-4  bg-opacity-50 bg-black text-gray-50 rounded-sm">

                <div
                    v-if="errors.length" 
                    class="mb-6 py-4 px-6 bg-rose-400 text-white rounded-xl"
                >
                    <p v-for="error in errors" v-bind:key="error">
                        {{ error }}
                    </p>
                </div>

                <button class="py-2 w-full px-6 bg-lime-400   rounded-sm text-gray-700">Submit</button>
            </form>
        </div>
    </div>
</template>