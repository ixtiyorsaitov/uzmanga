"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic"; // Italic qo'shildi
import Strike from "@tiptap/extension-strike"; // Strike qo'shildi

import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function TextEditor({ value, onChange, className }: TextEditorProps) {
  const editor = useEditor({
    // Faqatgina bizga kerakli funksiyalarni ulaymiz:
    extensions: [
      Document, // Asosiy qobiq
      Paragraph, // Xatboshi (Enter bosganda ishlashi uchun)
      Text, // Oddiy matn yoza olish uchun
      Bold, // Matnni qalin qilish uchun
      Italic, // Matnni qiya qilish uchun
      Strike, // Matnni chizish uchun
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      // O'zgarish bo'lganda formani yangilaymiz (masalan: "<p><strong>Salom</strong></p>")
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={cn("rounded-lg border border-input", className)}>
      <div
        className="cursor-text p-4 min-h-12!"
        onClick={() => editor.commands.focus()}
      >
        <EditorContent editor={editor} />
      </div>
      <div className="flex gap-1 p-2 text-foreground">
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
          className="data-[state=on]:bg-primary font-bold"
        >
          B
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
          className="italic font-serif data-[state=on]:bg-primary"
        >
          I
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Strike"
          className="line-through data-[state=on]:bg-primary"
        >
          S
        </Toggle>
      </div>
    </div>
  );
}
