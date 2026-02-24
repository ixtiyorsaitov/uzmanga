"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MangaSchema } from "@/lib/validations/manga.validations";
import { useMangaStatus } from "@/components/hooks/api/useMangaStatus";
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

export default function MangaStatus() {
  const { control } = useFormContext<MangaSchema>();
  const { data: mangaStatusRes, isLoading } = useMangaStatus();

  const mangaStatuses = mangaStatusRes?.data || [];

  return (
    <FieldGroup>
      <Controller
        name="status"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="manga-status-select">Asar holati</FieldLabel>

            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={isLoading}
            >
              <SelectTrigger id="manga-status-select" className="w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent side="bottom">
                <SelectGroup>
                  {mangaStatuses.map((status) => (
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
