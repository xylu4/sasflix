// router.js
import { createRouter, createWebHistory } from 'vue-router';
import PostsList from '../components/PostsList.vue';
import PostDetails from '../components/PostDetails.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: PostsList,
	},
	{
		path: '/post/:id',
		name: 'PostDetails',
		component: PostDetails,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
