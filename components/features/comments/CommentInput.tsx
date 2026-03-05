"use client";

import { SendIcon } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { CommentSchema } from "@/lib/validations/comment.validations";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";

const DynamicTextEditor = dynamic(
  () => import("@/components/ui/rich-text-editor"),
  {
    ssr: false,
    loading: () => <FakeInput />,
  },
);

interface CommentInputProps {
  defaultOpen?: boolean;
  onCancelClick?: () => void;
  formId: string;
  editorActive?: boolean;
  setEditorActive?: (editorActive: boolean) => void;
  disabled?: boolean;
}

export default function CommentInput({
  defaultOpen = false,
  onCancelClick,
  formId,
  editorActive,
  setEditorActive,
  disabled,
}: CommentInputProps) {
  const { control } = useFormContext<CommentSchema>();

  const isActive = editorActive !== undefined ? editorActive : true;

  if (!isActive) {
    return <FakeInput setIsEditorActive={setEditorActive} />;
  }

  return (
    <Controller
      name="content"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="relative">
          <DynamicTextEditor
            disabled={disabled}
            className="rounded-lg mb-0.5"
            value={field.value || ""}
            onChange={field.onChange}
            autoFocus={true}
            maxLength={600}
            actionButtons={
              <>
                <Button
                  variant="ghost"
                  size={"sm"}
                  className="text-xs h-7.5 px-3 border border-muted hover:bg-accent"
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    if (setEditorActive) setEditorActive(false);
                    if (onCancelClick) onCancelClick();
                  }}
                >
                  Bekor qilish
                </Button>
                <Button
                  disabled={disabled}
                  size={"sm"}
                  className="text-xs h-7.5 px-3"
                  type="submit"
                  form={formId}
                >
                  {"Jo'natish"}
                </Button>
              </>
            }
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

function FakeInput({
  setIsEditorActive,
}: {
  setIsEditorActive?: (value: boolean) => void;
}) {
  return (
    <div
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "bg-background border border-input rounded-xl cursor-text w-full flex items-center justify-between py-7!",
      )}
      onClick={() => setIsEditorActive?.(true)}
    >
      <p className="text-muted-foreground">Izoh qoldirish</p>
      <Button size={"icon"} className="size-6!">
        <SendIcon />
      </Button>
    </div>
  );
}
