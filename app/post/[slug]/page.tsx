// path: app/.../[slug]/page.tsx (หรือไฟล์ Page ของคุณ)
'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import TiptapEditor from '@/components/TiptapEditor' // ตรวจสอบ path ให้ถูกต้อง

type Post = {
  id: string
  title: string
  content: string // content จะเป็น HTML string จาก Tiptap
  date: string
  author: string
}

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [post, setPost] = useState<Post | null>(null)

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงของเนื้อหาจาก Tiptap
  const handleContentChange = (newContent: string) => {
    // อัปเดต state เฉพาะส่วน content โดยไม่กระทบส่วนอื่นของ post
    setPost((prevPost) => (prevPost ? { ...prevPost, content: newContent } : null))
  }

  useEffect(() => {
    if (post != null) {
      return
    }
    
    console.log('Calling API to fetch post data by slug id')
    setIsLoading(true)
    setTimeout(() => {
      setPost({
        id: '1',
        title: 'Editor with Image Support',
        // --- ตัวอย่าง content เริ่มต้นที่มีรูปภาพ ---
        content: `
          <h1>Welcome to Your Advanced Editor!</h1>
          <p>This editor now supports images. You can add an image using the "Add Image" button in the toolbar.</p>
          <img src="https://inwfile.com/s-de/bee2ed.jpg" />
          <p>This is a sample image from Unsplash. You can also add your own image URLs.</p>
          <ul>
            <li><p>Bold and <em>italic</em> text are supported.</p></li>
            <li><p>Lists are easy to create.</p></li>
          </ul>
          <p>Start editing and bring your content to life!</p>
        `,
        date: '2025-06-08',
        author: 'John Doe',
      })
      setIsLoading(false)
    }, 1000)
  }, [])

  // ฟังก์ชันจำลองการบันทึกข้อมูล
  const savePost = async () => {
    if (!post) return
    
    setIsLoading(true) // แสดงสถานะกำลังโหลดระหว่างบันทึก
    console.log('Saving post content to the database...')
    console.log(post.content)

    // จำลองการเรียก API
    setTimeout(() => {
      setIsLoading(false)
      alert('Post saved successfully!')
      // ในการใช้งานจริง:
      // try {
      //   const response = await fetch(`/api/posts/${post.id}`, {
      //     method: 'PUT',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ content: post.content }),
      //   });
      //   if (!response.ok) throw new Error('Failed to save');
      //   const result = await response.json();
      //   console.log('Saved:', result);
      //   alert('Post saved successfully!');
      // } catch (error) {
      //   console.error(error);
      //   alert('Error saving post.');
      // } finally {
      //   setIsLoading(false);
      // }
    }, 1500)
    console.log('Post saved:', post)
  }

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen p-4 bg-gray-100 text-black pt-10">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-white text-lg">Processing...</p>
          </div>
        </div>
      )}

      {post && (
        <div className="w-full max-w-4xl flex flex-col items-center gap-6">
          <div className="text-center w-full">
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="text-4xl font-bold mb-2 text-center w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md py-2"
            />
            <p className="text-gray-600">
              By <strong>{post.author}</strong> on <span>{post.date}</span>
            </p>
          </div>

          {/* --- Tiptap Editor Component --- */}
          <TiptapEditor
            content={post.content}
            onContentChange={handleContentChange}
          />
          
          <button
            onClick={savePost}
            className="mt-4 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  )
}