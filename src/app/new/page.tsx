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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-teal-100
                    flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md
                      rounded-3xl shadow-2xl p-10 border border-slate-200">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-8 text-center drop-shadow-sm">
          Create New Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block mb-2 text-base font-medium text-slate-700">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Awesome title…"
              className="w-full rounded-xl border border-slate-300 bg-white
                         p-4 text-lg text-slate-900 placeholder-slate-400
                         focus:outline-none focus:ring-4 focus:ring-blue-300
                         transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-base font-medium text-slate-700">
              Body
            </label>
            <textarea
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your post here…"
              className="w-full rounded-xl border border-slate-300 bg-white
                         p-4 text-lg text-slate-900 placeholder-slate-400
                         focus:outline-none focus:ring-4 focus:ring-blue-300
                         transition resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-4 rounded-xl text-lg font-semibold
                        bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                        text-white shadow-md transition
                        disabled:opacity-60 ${submitting && 'cursor-wait'}`}
          >
            {submitting ? 'Posting…' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
