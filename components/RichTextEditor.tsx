'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { EditorToolbar } from '@/components/EditorToolbar'
import { useCallback } from 'react'

interface RichTextEditorProps {
  content?: string
  placeholder?: string
  onChange?: (html: string) => void
  /** Máximo de caracteres permitidos (opcional) */
  limit?: number
}

export function RichTextEditor({
  content = '',
  placeholder = 'Escribe el contenido de tu blog...',
  onChange,
  limit,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-blue-600 underline cursor-pointer' },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
      ...(limit ? [CharacterCount.configure({ limit })] : [CharacterCount]),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-slate max-w-none min-h-[280px] px-5 py-4 focus:outline-none text-slate-800 leading-relaxed',
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  const setLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('URL del enlace', prev ?? 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }, [editor])

  const charCount = editor?.storage.characterCount?.characters?.() ?? 0
  const wordCount = editor?.storage.characterCount?.words?.() ?? 0

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Toolbar */}
      <EditorToolbar editor={editor} onSetLink={setLink} />

      {/* Área de edición */}
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>

      {/* Footer con contadores */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2 text-xs text-slate-400 select-none">
        <span>{wordCount} palabras</span>
        <span>
          {charCount}
          {limit ? ` / ${limit} caracteres` : ' caracteres'}
        </span>
      </div>
    </div>
  )
}