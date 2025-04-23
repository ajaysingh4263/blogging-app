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
    
      <>
        <h1 className="text-2xl font-bold mb-4 text-center mt-10">{selectedPost.title}</h1>
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-4">{selectedPost.title}</h1>
      <p className="text-gray-700 text-lg">{selectedPost.body}</p>
    </div>
      
      </>
  );
}
