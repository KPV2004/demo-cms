// app/.../[slug]/page.tsx (หรือไฟล์ที่คุณใช้งาน)
'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import TiptapEditor from '@/components/TiptapEditor' // แก้ไข path ตามตำแหน่งที่เก็บไฟล์

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
    if (post) {
      setPost({ ...post, content: newContent })
    }
  }

  useEffect(() => {
    // ในชีวิตจริง ส่วนนี้จะเป็นการ fetch ข้อมูลจาก API
    // โดย slug ที่ได้จาก params จะถูกใช้เพื่อดึง post ที่ถูกต้อง
    if (post != null) {
      return
    }
    
    console.log('Calling API to fetch post data by slug id')
    setIsLoading(true)
    setTimeout(() => {
      setPost({
        id: '1',
        title: 'Post Title - Editable',
        // เนื้อหาเริ่มต้นควรเป็น HTML
        content: '<h1>สวัสดี Tiptap!</h1><p>นี่คือ Text Editor ที่มีความสามารถคล้าย <strong>Google Docs</strong> ลองพิมพ์และจัดรูปแบบดูสิ</p><ul><li><p>รายการที่ 1</p></li><li><p>รายการที่ 2</p></li></ul>',
        date: '2023-10-01',
        author: 'John Doe',
      })
      setIsLoading(false)
    }, 1000)
  }, []) // Dependency array ยังคงเป็น [] เพื่อให้ fetch ข้อมูลครั้งเดียว

  const params = useParams()

  // ฟังก์ชันสำหรับบันทึกข้อมูล (ตัวอย่าง)
  const savePost = async () => {
    if (!post) return;
    alert('กำลังบันทึกข้อมูล...\n' + post.content);
    // ในการใช้งานจริง:
    // const response = await fetch(`/api/posts/${post.id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ content: post.content }),
    // });
    // const result = await response.json();
    // console.log('Saved:', result);
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-white text-black pt-10">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-lg">กำลังโหลดข้อมูล...</p>
          </div>
        </div>
      )}

      {post && (
        <div className="w-full max-w-4xl flex flex-col items-center gap-6">
          {/* ส่วนหัวของ Post */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-600">
              By <strong>{post.author}</strong> on <span>{post.date}</span>
            </p>
          </div>

          {/* Tiptap Editor */}
          <TiptapEditor
            content={post.content}
            onContentChange={handleContentChange}
          />
          
          {/* ปุ่มสำหรับบันทึก */}
          <button
            onClick={savePost}
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  )
}