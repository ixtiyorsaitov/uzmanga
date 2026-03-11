import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { MangaSchema } from "@/lib/validations/manga.validations";
import { Controller, useFormContext } from "react-hook-form";
import { MultiSelect } from "./multiselect";
import { useGenres } from "@/components/hooks/api/useGenres";

export default function Genres() {
  const { control } = useFormContext<MangaSchema>();
  const { data: genresRes, isLoading } = useGenres();
  const genres = genresRes?.data || [];

  return (
    <FieldGroup>
      <Controller
        name="genres"
        control={control}
        defaultValue={[]}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Janrlar</FieldLabel>
            <MultiSelect
              value={field.value}
              onChange={field.onChange}
              options={genres}
              isLoading={isLoading}
              maxVisible={2}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
