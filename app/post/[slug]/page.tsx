'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Post = {
  id: string
  title: string
  content: string
  date: string
  author: string
}



export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [post, setPost] = useState<(null | Post)>(null)


  useEffect(() => {
    console.log('Calling API to fetch post data by slug id');
    console.log(post)
    if(post!=null) {
      return
    } else {
      setIsLoading(true)
      setTimeout(() => {
      setPost({
        id: '1',
        title: 'Post Title',
        content: 'This is the content of the post.',
        date: '2023-10-01',
        author: 'John Doe'
      })
      setIsLoading(false)
    }, 1000)
    }
  }, [])

  const params = useParams()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-black">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-lg">กำลังโหลดข้อมูล...</p>
          </div>
        </div>
      )}
      {post && (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <p>
            <strong>Author:</strong> {post.author}
          </p>
          <p>
            <strong>Date:</strong> {post.date}
          </p>
        </div>
      )}
    </div>
  )
}