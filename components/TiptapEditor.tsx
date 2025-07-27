'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'

type TiptapEditorProps = {
  content: string
  onChange: (html: string) => void
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const [fallback, setFallback] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editorProps: {
      attributes: {
        class: 'min-h-[150px] border border-gray-300 rounded p-2 focus:outline-none',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    autofocus: true,
    injectCSS: false,
    // fix SSR hydration issue
    immediatelyRender: false,
  })

  useEffect(() => {
    if (!editor) {
      setFallback(true)
    }
  }, [editor])

  if (fallback) {
    return (
      <textarea
        defaultValue={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[150px] border border-gray-300 rounded p-2"
      />
    )
  }

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 bg-gray-100 border rounded">
        <button onClick={() => editor?.chain().focus().toggleBold().run()} className={editor?.isActive('bold') ? 'font-bold underline' : ''}>B</button>
        <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={editor?.isActive('italic') ? 'italic underline' : ''}>I</button>
        <button onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button onClick={() => editor?.chain().focus().toggleBulletList().run()}>• List</button>
        <button onClick={() => editor?.chain().focus().undo().run()}>↶ Undo</button>
        <button onClick={() => editor?.chain().focus().redo().run()}>↷ Redo</button>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />
    </div>
  )
}
