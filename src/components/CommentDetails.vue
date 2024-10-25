<template>
	<div class="post__info">
		<div class="reactions">
			<button
				@click="likePost"
				class="likes"
				:class="{liked: liked}"
			>
				<img
					v-if="liked"
					src="../assets/heart.png"
					alt="like"
					style="height: 11px; width: 13px;"
				/>
				<img
					v-else
					src="../assets/heart.svg"
					alt="like"
					style="height: 11px; width: 13px;"
				/>
				Like {{ post?.reactions.likes }}
			</button>
			<span
				@click="disLikePost"
				class="dislikes"
				:class="{disliked: disliked}"
			>
				<img
					v-if="!disliked"
					src="../assets/trash.png"
					alt="dislike"
					style="height: 11px; width: 13px;"
					class="disliked"
				>
				<img
					v-else
					src="../assets/whiteTrash.png"
					alt="dislike"
					style="height: 11px; width: 13px;"
					class="disliked"
				>
				Trash {{ post?.reactions.dislikes }}
			</span>
		</div>
		<button
			v-if="!postId"
			@click="openComments"
			class="comments"
		>
			Open Comments
		</button>
		<p class="date">{{post?.createdAt || 'today'}}</p>

		<div class="tags">
      <span v-for="tag in post?.tags" :key="tag" class="tag">
        {{ tag }}
      </span>
		</div>
	</div>
</template>

<script setup lang="ts">
import {PropType, ref} from "vue";
	import { usePostsStore} from "../store";
	import {useRouter} from "vue-router";
	import {Post} from "../interfaces.ts";

const props = defineProps({
		post: Object as PropType<Post>,
		postId: String
	})

	const $store = usePostsStore()
	const router = useRouter();
	const liked =ref(false)
	const disliked =ref(false)

	function openComments() {
		$store.currentPost = props.post;
		router.push({ name: 'PostDetails', params: { id: props.post?.id } });
	}

	function likePost() {
		if (!liked.value) {
			if (disliked.value) {
				props.post.reactions.dislikes--
				disliked.value = false
			}
			props.post.reactions.likes++
			liked.value = true
		} else {
			props.post.reactions.likes--
			liked.value = false
		}
	}

	function disLikePost() {
		if (!disliked.value) {
			if (liked.value) {
				props.post.reactions.likes--
				liked.value = false
			}
			props.post.reactions.dislikes++
			disliked.value = true
		} else {
			props.post.reactions.dislikes--
			disliked.value = false
		}
	}
</script>

<style scoped>
.tags .tag {
	display: inline-block;
	background-color: #e2e2e2;
	padding: 1px 4px;
	border-radius: 4px;
}

.post__info {
	display: flex;
	align-items: center;

}

.comments {
	background: white;
	cursor: pointer;
	color: #FF6B00;
	font-size: 14px;
	border: none;
	text-decoration: underline;
}

.date {
	color: rgba(4, 4, 5, 0.22);
	margin: 0 8px;
}

.reactions {
	display: flex;
	padding: 2px 8px;

}

.likes {
	border-radius: 20px 0 0 20px;
	background: rgba(4, 4, 5, 0.04);
	color: #040405;
	padding: 0 10px;
	cursor: pointer;
	font-size: 14px;
	border: none;
}

.likes.liked {
	background-color: #FF3B30;
	color: #fff;
}

.dislikes {
	border-radius: 0 20px 20px 0;
	background: rgba(4, 4, 5, 0.04);
	padding: 0 10px;
}

span {
	margin: 0 4px
}

.dislikes.disliked {
	background-color: #040405;
	color: #fff;
}
</style>
