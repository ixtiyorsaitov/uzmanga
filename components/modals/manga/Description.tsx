import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { TextEditor } from "@/components/ui/rich-text-editor";
import { MangaSchema } from "@/lib/validations/manga.validations";
import { Controller, useFormContext } from "react-hook-form";

export default function Description() {
  const { control } = useFormContext<MangaSchema>();
  return (
    <Controller
      name="description"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="relative">
          <div className="relative p-4 rounded-xl border border-input">
            <TextEditor
              className="rounded-lg mb-0.5"
              value={field.value}
              onChange={field.onChange}
            />

            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : (
              <FieldLabel className="text-xs text-muted-foreground">
                Uchinchi tomon manbalariga havolalar taqiqlangan.
              </FieldLabel>
            )}
          </div>
        </Field>
      )}
    />
  );
}
