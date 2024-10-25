<template>
	<div>
		<Post
			v-for="(post, index) in posts"
			:key="index"
			:post="post"
		/>
	</div>
</template>

<script setup lang="ts">
import Post from './Post.vue';
import {usePostsStore} from "../store";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";

const $store = usePostsStore()
const {posts} = storeToRefs($store)

onMounted (async() => {
	await $store.fetchPosts()
})
</script>
