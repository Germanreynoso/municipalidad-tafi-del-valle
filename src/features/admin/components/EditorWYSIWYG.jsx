import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

function Boton({ activo, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2.5 py-1 rounded text-sm font-body border ${activo ? 'bg-stone-dark text-white border-stone-dark' : 'bg-white text-stone-dark border-stone-300 hover:bg-stone-50'}`}
    >
      {children}
    </button>
  );
}

export default function EditorWYSIWYG({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Sincronizar contenido externo (ej. al cargar una noticia para editar).
  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border border-stone-300 rounded-lg overflow-hidden bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
      <div className="flex flex-wrap gap-1 p-2 border-b border-stone-200 bg-stone-100">
        <Boton activo={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>Negrita</Boton>
        <Boton activo={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>Cursiva</Boton>
        <Boton activo={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>Título</Boton>
        <Boton activo={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>Lista</Boton>
        <Boton activo={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>Lista num.</Boton>
      </div>
      {/* cursor-text + click delegado: toda el área blanca enfoca el editor */}
      <div className="cursor-text" onClick={() => editor.chain().focus().run()}>
        <EditorContent
          editor={editor}
          className="prose prose-stone max-w-none p-4 font-body [&_.ProseMirror]:min-h-[200px] [&_.ProseMirror]:outline-none"
        />
      </div>
    </div>
  );
}
