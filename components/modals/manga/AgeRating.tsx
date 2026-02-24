"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MangaSchema } from "@/lib/validations/manga.validations";
import { useAgeRatings } from "@/components/hooks/api/useAgeRatings";
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

export default function AgeRating() {
  const { control } = useFormContext<MangaSchema>();
  const { data: ageRatingRes, isLoading } = useAgeRatings();

  const ageRatings = ageRatingRes?.data || [];

  return (
    <FieldGroup>
      <Controller
        name="ageRating"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="age-rating-select">Yosh chegarasi</FieldLabel>

            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={isLoading}
            >
              <SelectTrigger id="age-rating-select" className="w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent side="bottom">
                <SelectGroup>
                  {ageRatings.map((rating) => (
                    <SelectItem key={rating._id} value={rating._id}>
                      {rating.name}
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
