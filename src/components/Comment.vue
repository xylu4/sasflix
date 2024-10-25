<template>
	<div class="comment">
		<img src="../assets/comment.svg" alt="logo">
		<div>
			<div class="comment__author">
				<strong class="comment__style"> {{ comment.user.username }} </strong>
				<p class="comment__style">{{ comment.body }}</p>
			</div>
			<div v-if="!comment?.deleted" class="comment__delete">
				<p class="date">{{comment.createdAt || 'today'}}</p>
				<button @click="toggleComment(comment)"> Delete </button>
			</div>
			<button
				v-else
				@click="toggleComment(comment)"
				class="comment__return"
			>
				Return
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {Comments} from "../interfaces.ts";

defineProps({
	comment: Object as PropType<Comments>
})

function toggleComment(comment: Comments) {
	comment.deleted = !comment.deleted
}
</script>

<style scoped>
.comment {
	display: flex;
	justify-content: start;
	align-items: flex-start;
}

.comment__delete {
	display: flex;
	margin-top: -10px;
}

.comment__style {
	margin: 0;
}

.date {
	color: rgba(4, 4, 5, 0.22);
}

img {
	margin-right: 10px;
}

button {
	background: transparent;
	cursor: pointer;
	color: #FF6B00;
	font-size: 14px;
	border: none;
	text-decoration: underline;
}

.comment__return {
	margin-bottom: 12px;
}
</style>
