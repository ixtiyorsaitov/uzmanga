import { useCategories } from "@/components/hooks/api/useCategories";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { MangaSchema } from "@/lib/validations/manga.validations";
import { Controller, useFormContext } from "react-hook-form";
import { MultiSelect } from "./multiselect";

export default function Categories() {
  const { control } = useFormContext<MangaSchema>();
  const { data: categoriesRes, isLoading } = useCategories();
  const categories = categoriesRes?.data || [];

  return (
    <FieldGroup>
      <Controller
        name="categories"
        control={control}
        defaultValue={[]}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Kategoriyalar</FieldLabel>
            <MultiSelect
              value={field.value}
              onChange={field.onChange}
              options={categories}
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
