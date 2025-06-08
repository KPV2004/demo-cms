// path: components/TiptapEditor.tsx
'use client'

import React from 'react'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

// --- คอมโพเนนต์สำหรับ Toolbar ---
const Toolbar = ({ editor }: { editor: Editor | null }) => {
  
  if (!editor) {
    return null
  }

  // ฟังก์ชันสำหรับเพิ่มรูปภาพจาก URL
  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className="border border-gray-300 rounded-t-lg p-2 bg-gray-50 flex items-center flex-wrap gap-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        Strike
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        Paragraph
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        Bullet List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        Ordered List
      </button>
      <button type="button" onClick={addImage}>
        เพิ่มรูปภาพด้วย URL
      </button>

      {/* CSS Styling สำหรับปุ่มใน Toolbar */}
      <style jsx>{`
        button {
          padding: 0.25rem 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: white;
          transition: background-color 0.2s, color 0.2s;
        }
        button:hover {
          background-color: #f0f0f0;
        }
        button.is-active {
          background-color: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
}


// --- คอมโพเนนต์หลักของ Tiptap Editor ---
type TiptapEditorProps = {
  content: string
  onContentChange: (newContent: string) => void
}

export default function TiptapEditor({ content, onContentChange }: TiptapEditorProps) {
  const editor = useEditor({
    // 1. เพิ่ม Extension ที่จำเป็น
    extensions: [
      StarterKit.configure({
        // สามารถตั้งค่ารายละเอียดของแต่ละ extension ใน StarterKit ได้
        // เช่น ปิดบางอย่างที่ไม่ต้องการใช้งาน
      }),
      Image.configure({
        // อนุญาตให้แทรกรูปภาพแบบ inline ได้
        inline: true, 
      }),
    ],
    // 2. กำหนด content เริ่มต้น
    content: content,
    // 3. กำหนด CSS class ให้กับ Editor
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none prose-sm sm:prose-base focus:outline-none border border-t-0 border-gray-300 rounded-b-lg p-4 min-h-[300px] bg-white',
      },
    },
    // 4. ส่งข้อมูลกลับไปยัง Parent component ทุกครั้งที่มีการอัปเดต
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML())
    },
  })

  return (
    <div className="w-full max-w-4xl">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}