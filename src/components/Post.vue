<template>
	<div class="post">
		<h2>{{ props.post.title }}</h2>
		<p>{{ props.post.body }}</p>
	</div>
	<CommentDetails
	:post="props.post"
	/>
</template>

<script setup lang="ts">
import {Post} from "../interfaces.ts";
import {PropType} from "vue";
import CommentDetails from "./CommentDetails.vue";

const props = defineProps({
	post: {
		type: Object as PropType <Post>,
		required: true,
	},
});

</script>

<style scoped>
.post {
	padding: 16px;
	margin-bottom: 16px;
}
</style>
