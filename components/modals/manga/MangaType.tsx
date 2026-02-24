"use client";

import { Controller, useFormContext } from "react-hook-form";
import { MangaSchema } from "@/lib/validations/manga.validations";
import { useMangaTypes } from "@/components/hooks/api/useMangaTypes";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MangaType() {
  const { control } = useFormContext<MangaSchema>();
  const { data: mangaTypeRes, isLoading } = useMangaTypes();

  const mangaTypes = mangaTypeRes?.data || [];

  return (
    <FieldGroup>
      <Controller
        name="type"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="manga-type-select">Turi (Тип)</FieldLabel>

            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={isLoading}
            >
              <SelectTrigger id="manga-type-select" className="w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent side="bottom">
                <SelectGroup>
                  {mangaTypes.map((type) => (
                    <SelectItem key={type._id} value={type._id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
