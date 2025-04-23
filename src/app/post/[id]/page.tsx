'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { fetchPostById } from '@/redux/posts/postsThunk';
import { RootState } from '@/redux/store';

export default function PostDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedPost, loading, error } = useSelector((state: RootState) => state.posts);
 console.log("selectedPost--",selectedPost)
  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(Number(id)) as any);
    }
  }, [id, dispatch]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!selectedPost) return <div className="text-center mt-10">Post not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center max-w-3xl leading-tight mb-8 shadow-lg p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
        {selectedPost.title}
      </h1>
      <article className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 mt-8 transform transition duration-500 hover:scale-105">
        <p className="prose prose-lg text-gray-800 whitespace-pre-line">
          {selectedPost.body}
        </p>
      </article>
      <div className="mt-8 w-full max-w-3xl flex justify-between">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">
          Share Post
        </button>
        <button className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition-all">
          Back to Posts
        </button>
      </div>
    </div>
  );
}
