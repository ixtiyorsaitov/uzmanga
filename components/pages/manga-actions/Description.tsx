import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { MangaSchema } from "@/lib/validations/manga.validations";
import dynamic from "next/dynamic";
import { Controller, useFormContext } from "react-hook-form";

const TextEditor = dynamic(() => import("@/components/ui/rich-text-editor"), {
  ssr: false,
  loading: () => <Skeleton className="h-[102px] w-full rounded-lg" />,
});

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
