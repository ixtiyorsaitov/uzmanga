import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { TagsInput } from "@/components/ui/tags-input";
import { MangaSchema } from "@/lib/validations/manga.validations";
import { Controller, useFormContext } from "react-hook-form";

export default function MangaTags() {
  const { control } = useFormContext<MangaSchema>();

  return (
    <Controller
      name="tags"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="relative mt-4">
          <FieldLabel>Teglar</FieldLabel>

          <TagsInput
            value={field.value || []}
            onValueChange={field.onChange}
            placeholder="Teg kiriting va Enter bosing"
            className="bg-muted!"
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
