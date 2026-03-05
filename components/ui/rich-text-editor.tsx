"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import CharacterCount from "@tiptap/extension-character-count";
import React, { useEffect } from "react";

import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  actionButtons?: React.ReactNode;
  maxLength?: number;
  disabled?: boolean;
}

export default function TextEditor({
  value,
  onChange,
  className,
  autoFocus = false,
  actionButtons,
  maxLength,
  disabled = false,
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Strike,
      CharacterCount.configure({
        limit: maxLength,
      }),
    ],
    content: value,
    editable: !disabled,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none max-w-full w-full break-words [word-break:break-word]",
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.isEmpty ? "" : editor.getHTML();
      onChange(content);
    },
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [disabled, editor]);

  useEffect(() => {
    if (editor && autoFocus && !disabled) {
      setTimeout(() => {
        editor.commands.focus("end");
      }, 50);
    }
  }, [editor, autoFocus, disabled]);

  if (!editor) {
    return null;
  }

  const currentCount = editor.storage.characterCount.characters();

  return (
    <div
      className={cn(
        "rounded-lg border border-input flex flex-col overflow-hidden w-full max-w-full min-w-0",
        disabled && "opacity-60 bg-muted/20 cursor-not-allowed",
        className,
      )}
    >
      <div
        className={cn(
          "p-4 min-h-12 w-full max-w-full",
          !disabled ? "cursor-text" : "pointer-events-none",
        )}
        onClick={() => !disabled && editor.commands.focus()}
      >
        <EditorContent editor={editor} />
      </div>

      <div className="flex items-center justify-between p-2 text-foreground">
        <div className="flex gap-1">
          <Toggle
            size="sm"
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            disabled={disabled}
            aria-label="Bold"
            className="data-[state=on]:bg-primary font-bold"
          >
            B
          </Toggle>

          <Toggle
            size="sm"
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            disabled={disabled}
            aria-label="Italic"
            className="italic font-serif data-[state=on]:bg-primary"
          >
            I
          </Toggle>

          <Toggle
            size="sm"
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            disabled={disabled}
            aria-label="Strike"
            className="line-through data-[state=on]:bg-primary"
          >
            S
          </Toggle>
        </div>

        <div className="flex items-center gap-3">
          {maxLength && (
            <span className="text-xs text-muted-foreground font-medium">
              {currentCount}/{maxLength}
            </span>
          )}
          {actionButtons && (
            <div
              className={cn(
                "flex items-center gap-2",
                disabled && "opacity-50 pointer-events-none",
              )}
            >
              {actionButtons}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
