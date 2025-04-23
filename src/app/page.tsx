'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, fetchPosts } from '@/redux/posts/postsThunk';
import { RootState } from '@/redux/store';
import PostCard from '@/components/PostCard';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'; // Import framer-motion for animation

export default function HomePage() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);
  console.log("posts--", posts);

  useEffect(() => {
    dispatch(fetchPosts() as any); 
  }, [dispatch]);
  
  const handleDelete = async (id: number) => {
    const ok = window.confirm('Are you sure you want to delete this post?');
    if (!ok) return;
  
    try {
      await dispatch(deletePost(id) as any);
      toast.success('Post deleted successfully');
    } catch {
      toast.error('Failed to delete post');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 relative">
      {/* Floating Add Post Button */}
      <Link
        href="/new"
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-transform hover:scale-105"
      >
        <Plus size={28} />
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-center">All Blog Posts</h1>
      
      {/* Animated Post Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((p) => (
          <motion.div
            key={p.id}
            className="group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.1 }}
          >
            <PostCard
              post={p}
              onDelete={handleDelete}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
