'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '@/redux/posts/postsThunk';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast'; 

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [body,  setBody]  = useState('');
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();
  const router   = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      toast.error('Title and body are required');
      return;
    }

    setSubmitting(true);
    try {
      await dispatch(addPost({ title, body, userId: 1 }) as any);
      toast.success('Post created successfully');
      router.push('/');            
    } catch {
      toast.error('Failed to create post');
    } finally {
      setSubmitting(false);
    }
            
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Post</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Awesome title…"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none
                         focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Body
            </label>
            <textarea
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your post here…"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none
                         focus:ring-2 focus:ring-blue-500 text-gray-900 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white
                       font-medium py-3 rounded-lg disabled:opacity-60"
          >
            {submitting ? 'Posting…' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
