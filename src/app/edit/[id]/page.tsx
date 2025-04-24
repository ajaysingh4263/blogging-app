'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { fetchPostById, updatePost } from '@/redux/posts/postsThunk';
import type { RootState, AppDispatch } from '@/redux/store';
import { toast } from 'react-hot-toast';

export default function EditPostPage() {
  const { id }   = useParams();                 // dynamic [id]
  const postId   = Number(id);

  /* typed dispatch so thunks are accepted */
  const dispatch = useDispatch<AppDispatch>();
  const router   = useRouter();

  /* 1️⃣  look for the post in the list (handles new local posts) */
  const postFromStore = useSelector((s: RootState) =>
    s.posts.posts.find(p => p.id === postId)
  );

  /* keep selectedPost for server‑fetched items */
  const { selectedPost, loading, error } = useSelector(
    (s: RootState) => s.posts
  );

  const post = postFromStore ?? selectedPost;   // unified source

  /* form state */
  const [title, setTitle] = useState(post?.title || '');
  const [body,  setBody]  = useState(post?.body  || '');
  const [saving, setSaving] = useState(false);

  /* 2️⃣ only hit server if not already local */
  useEffect(() => {
    if (!postFromStore) {
      dispatch(fetchPostById(postId));
    }
  }, [postId, postFromStore, dispatch]);

  /* 3️⃣ sync form once post is available */
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  /* submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await dispatch(updatePost({ id: postId, data: { title, body } }));
      toast.success('Post updated');
      router.push('/');
    } catch {
      toast.error('Failed to update');
    } finally {
      setSaving(false);
    }
  };

  /* loading / error states */
  if (!post) return <p className="mt-10 text-center">Loading…</p>;
  if (error)  return <p className="text-center text-red-600 mt-10">{error}</p>;

  /* ---------- UI (unchanged) ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-teal-100
                    flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md
                      rounded-3xl shadow-2xl p-10 border border-slate-200">
        <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center drop-shadow-sm">
          Edit Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block mb-2 text-base font-medium text-slate-700">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white
                         p-4 text-lg text-slate-900 placeholder-slate-400
                         focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
              placeholder="Enter post title"
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
              className="w-full rounded-xl border border-slate-300 bg-white
                         p-4 text-lg text-slate-900 placeholder-slate-400
                         focus:outline-none focus:ring-4 focus:ring-blue-300 transition resize-none"
              placeholder="Write your post content here"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className={`w-full py-4 rounded-xl text-lg font-semibold
                        bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                        text-white shadow-md transition
                        disabled:opacity-60 ${saving && 'cursor-wait'}`}
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
