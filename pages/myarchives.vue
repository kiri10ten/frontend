<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
let archives = ref()

onMounted(() => {
    if (!userStore.user.isAuthenticated) {
        router.push('/login')
    } else {
        getArchives()
    }
})

useSeoMeta({
    title: 'My archive',
    ogTitle: 'My archive',
    description: 'The description'
})

async function getArchives() {
    await $fetch('http://13.127.219.13:8000/api/v1/archive/myarchive/', {
        headers: {
            'Authorization': 'token ' + userStore.user.token,
            'Content-Type': 'application/json'
        },

      
    })

    .then(response => {
       archives.value = response
    })
    .catch(error => {
        console.log('error', error)
    })
}

function deleteArchive(id) {
    console.log('id', id)

    archives.value = archives.value.filter(archive=> archive.id !== id)
}
</script>

<template>
    <div class="py-10 px-6">
        <h1 class="mb-6 text-2xl">My archives</h1>

        <div class="space-y-4">
            <Job
                v-for="archive in archives"
                :key="archive.id"
                :archive="archive" 
                :my="true"
                v-on:deleteArchive="deleteArchive(archive.id)"
            />
        </div>
    </div>
</template>