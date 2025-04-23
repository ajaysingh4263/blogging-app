import { createSlice } from '@reduxjs/toolkit';
import { Post } from '@/types/post';
import {
  fetchPosts,
  fetchPostById,
  addPost,
  updatePost,
  deletePost,
} from './postsThunk';

interface PostsState {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching posts';
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.selectedPost = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p.id !== action.payload);
      });
  },
});

export const { clearSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
