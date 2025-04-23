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
    <div className="min-h-screen bg-slate-100 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Post</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none
                         focus:ring-2 focus:ring-blue-500 text-gray-900 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white
                       font-medium py-3 rounded-lg disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
