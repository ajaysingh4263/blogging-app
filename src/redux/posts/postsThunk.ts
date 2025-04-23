import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/services/axiosInstance';
import { Post } from '@/types/post';

// Get all posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await axiosInstance.get<Post[]>('/posts');
  return res.data;
});

// Get single post
export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id: number) => {
  const res = await axiosInstance.get<Post>(`/posts/${id}`);
  return res.data;
});

// Add new post
export const addPost = createAsyncThunk('posts/addPost', async (post: Partial<Post>) => {
  console.log("inside the post ")
  const res = await axiosInstance.post<Post>('/posts', post);
  console.log("res for the post",res)
  return res.data;
});

// Update post
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, data }: { id: number; data: Partial<Post> }) => {
    const res = await axiosInstance.put<Post>(`/posts/${id}`, data);
    return res.data;
  }
);

// Delete post
export const deletePost = createAsyncThunk('posts/deletePost', async (id: number) => {
  await axiosInstance.delete(`/posts/${id}`);
  return id;
});
