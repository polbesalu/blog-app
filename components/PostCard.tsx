import Link from "next/link"

type Post = {
  id: string
  title: string
  category: string
  content: string
  author: string
  createdAt: string
}

type PostCardProps = {
  post: Post
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors duration-200">
      <Link href={`/blog/${post.id}`} className="block">
        <h2 className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition-colors">{post.title}</h2>
      </Link>
      <p className="text-sm text-gray-400 mb-3">
        {post.category} | {post.createdAt} | by {post.author}
      </p>
      <p className="text-gray-300 mb-4 line-clamp-3">{post.content}</p>
      <Link href={`/blog/${post.id}`} className="text-blue-400 hover:text-blue-300 transition-colors">
        Read more
      </Link>
    </div>
  )
}

