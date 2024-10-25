<template>
	<div>
		<h1>{{ post?.title }}</h1>
		<p>{{ post?.body }}</p>
		<CommentDetails
			:post="post"
			:post-id="postId"
		/>

		<h2
			v-if=" comments.length"
			class="comment__number"
		>
			{{comments.length}} Comments
		</h2>
		<div v-if="comments.length">
			<Comment
				v-for="comment in comments"
				:key="comment.id"
				:comment="comment"
			/>
		</div>
		<div v-else>
			<p>No comments available.</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {usePostsStore} from "../store";
import CommentDetails from "./CommentDetails.vue";
import Comment from "./Comment.vue";
import {Comments} from '../interfaces.ts'

const $store = usePostsStore()
const route = useRoute();
const postId = route.params.id;

const post = $store.currentPost;
const comments = ref<Comments[]>([]);

async function fetchComments(): Promise<void> {
	try {
		const commentsResponse = await fetch(
			`http://dummyjson.com/posts/${postId}/comments`
		);
		if (!commentsResponse.ok) {
			throw new Error('Failed to fetch comments');
		}
		const data = await commentsResponse.json();
		comments.value = data.comments;
		console.log(comments.value)
	} catch (error) {
		console.error(error);
	}
}

onMounted(async () => {
	await fetchComments();
});
</script>

<style scoped>

.comment__number {
	display: flex;
	justify-content: start;
}
</style>
