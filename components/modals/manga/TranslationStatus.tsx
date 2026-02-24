"use client";

import { useTranslationStatus } from "@/components/hooks/api/useTranslationStatus";
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
import { MangaSchema } from "@/lib/validations/manga.validations";
import { Controller, useFormContext } from "react-hook-form";

export default function TranslationStatus() {
  const { control } = useFormContext<MangaSchema>();
  const { data: translationStatusRes, isLoading } = useTranslationStatus();

  const translationStatuses = translationStatusRes?.data || [];

  return (
    <FieldGroup>
      <Controller
        name="translationStatus"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="translation-status-select">
              Tarjima holati
            </FieldLabel>

            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={isLoading}
            >
              <SelectTrigger id="translation-status-select" className="w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent side="bottom">
                <SelectGroup>
                  {translationStatuses.map((status) => (
                    <SelectItem key={status._id} value={status._id}>
                      {status.name}
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
