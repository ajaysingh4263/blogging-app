'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { fetchPostById, updatePost } from '@/redux/posts/postsThunk';
import { RootState } from '@/redux/store';
import { toast } from 'react-hot-toast';

export default function EditPostPage() {
  const { id } = useParams();     
  const postId = Number(id);
  const dispatch = useDispatch();
  const router = useRouter();

  const { selectedPost, loading, error } = useSelector(
    (s: RootState) => s.posts
  );

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchPostById(postId) as any);
  }, [postId, dispatch]);

  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title);
      setBody(selectedPost.body);
    }
  }, [selectedPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await dispatch(updatePost({ id: postId, data: { title, body } }) as any);
      toast.success('Post updated');
      router.push('/');
    } catch {
      toast.error('Failed to update');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !selectedPost) return <p className="mt-10 text-center">Loading…</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
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
                         focus:outline-none focus:ring-4 focus:ring-blue-300
                         transition"
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
                         focus:outline-none focus:ring-4 focus:ring-blue-300
                         transition resize-none"
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
