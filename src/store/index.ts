import {ref} from "vue";
import {defineStore} from "pinia";
import {Post} from "../interfaces.ts";

export const usePostsStore = defineStore('posts', () => {
	const posts = ref<Post[]>();
	const currentPost = ref<Post>();

	async function fetchPosts(): Promise<Post[]| undefined> {
		const urlPosts = 'http://dummyjson.com/posts?limit=5'
		try {
			const response = await fetch(urlPosts)
			if (!response.ok) {
				throw new Error(response.statusText)
			}

			const json = await response.json()
			posts.value = json.posts as Post[]
			console.log(json)
		} catch (error) {
			console.error(error)
		}
		return posts.value
	}
return {posts, currentPost, fetchPosts}
})
