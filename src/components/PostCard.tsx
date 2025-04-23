'use client';

import { Card } from '@heroui/react';
import { Post } from '@/types/post';
import Link from 'next/link';
import { Edit, Trash } from 'lucide-react';
interface PostCardProps {
  post: Post;
  onEdit?: (post: Post) => void;
  onDelete?: (id: number) => void;
}

export default function PostCard({ post,onDelete }: PostCardProps) {
  const truncateText = (text: string, maxLength: number) =>
    text.length <= maxLength ? text : text.slice(0, maxLength) + '…';

  return (
    <Card className="relative bg-white rounded-2xl shadow-md hover:shadow-xl
                     transition-transform hover:scale-105 duration-300 border
                     border-gray-200 p-6 flex flex-col group">

      <div className="absolute top-3 right-3 flex gap-2 opacity-0
                      group-hover:opacity-100 transition-opacity">
        <Link
          href={`/edit/${post.id}`}
          className="p-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
          title="Edit"
        >
          <Edit size={16} />
        </Link>
        <button
          onClick={() => onDelete?.(post.id)}
          className="p-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white"
          title="Delete"
        >
          <Trash size={16} />
        </button>
      </div>

      {/* content */}
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h2>
      <p className="text-gray-600 text-sm">
        {truncateText(post.body, 120)}{' '}
        <Link href={`/post/${post.id}`} className="text-blue-600 hover:underline font-medium">
          Read More
        </Link>
      </p>
    </Card>
  );
}
