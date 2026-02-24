import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MangaSchema } from "@/lib/validations/manga.validations";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function ReleaseYear() {
  const { control } = useFormContext<MangaSchema>();
  return (
    <FieldGroup>
      <Controller
        name="releaseYear"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-year">Chiqqan yili</FieldLabel>
            <Input {...field} id="form-year" type="number" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
