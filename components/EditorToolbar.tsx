'use client'

import type { Editor } from '@tiptap/react'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
} from 'lucide-react'

interface ToolbarButtonProps {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}

function ToolbarButton({ onClick, active, disabled, title, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault() // evita que el editor pierda el foco
        onClick()
      }}
      disabled={disabled}
      title={title}
      className={[
        'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
        'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        'disabled:cursor-not-allowed disabled:opacity-30',
        active ? 'bg-slate-200 text-slate-900' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="mx-1 h-5 w-px bg-slate-200" aria-hidden />
}

interface EditorToolbarProps {
  editor: Editor | null
  onSetLink: () => void
}

export function EditorToolbar({ editor, onSetLink }: EditorToolbarProps) {
  if (!editor) return null

  return (
    <div
      className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-slate-50 px-3 py-2"
      role="toolbar"
      aria-label="Opciones de formato"
    >

      <Divider />

      {/* Encabezados */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive('heading', { level: 3 })}
        title="Título 3"
      >
        <Heading3 size={15} />
      </ToolbarButton>

      <Divider />

      {/* Formato en línea */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        title="Negrita (Ctrl+B)"
      >
        <Bold size={15} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        title="Cursiva (Ctrl+I)"
      >
        <Italic size={15} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive('underline')}
        title="Subrayado (Ctrl+U)"
      >
        <Underline size={15} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive('strike')}
        title="Tachado"
      >
        <Strikethrough size={15} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive('code')}
        title="Código en línea"
      >
        <Code size={15} />
      </ToolbarButton>

      <Divider />

      {/* Listas */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
        title="Lista sin orden"
      >
        <List size={15} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
        title="Lista numerada"
      >
        <ListOrdered size={15} />
      </ToolbarButton>

      <Divider />

      {/* Bloques */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive('blockquote')}
        title="Cita"
      >
        <Quote size={15} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Línea divisora"
      >
        <Minus size={15} />
      </ToolbarButton>

      <Divider />

      {/* Enlace */}
      <ToolbarButton
        onClick={onSetLink}
        active={editor.isActive('link')}
        title="Insertar enlace"
      >
        <Link size={15} />
      </ToolbarButton>

      <Divider />

      {/* Alineación */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        active={editor.isActive({ textAlign: 'left' })}
        title="Alinear izquierda"
      >
        <AlignLeft size={15} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        active={editor.isActive({ textAlign: 'center' })}
        title="Centrar"
      >
        <AlignCenter size={15} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        active={editor.isActive({ textAlign: 'right' })}
        title="Alinear derecha"
      >
        <AlignRight size={15} />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        active={editor.isActive({ textAlign: 'justify' })}
        title="Justificar"
      >
        <AlignJustify size={15} />
      </ToolbarButton>
    </div>
  )
}