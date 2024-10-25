export interface Post {
	id: number;
	title: string;
	body: string;
	reactions: Reaction;
	tags: string[];
	createdAt?: Date;
}

export interface Reaction {
	likes: number;
	dislikes: number;
}

export interface Comments {
	id: number;
	body: string;
	postId: number;
	likes: number;
	user: User;
	deleted: boolean;
	createdAt: Date;
}

export interface User {
	id: number;
	fullName: string;
	username: string;
}
