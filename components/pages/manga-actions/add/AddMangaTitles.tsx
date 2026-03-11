"use client";

import DefaultCard from "@/components/pages/manga-actions/DefaultCard";
import UploadCover from "../UploadCover";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useFormContext } from "react-hook-form";
import { MangaSchema } from "@/lib/validations/manga.validations";
import Categories from "../Categories";
import Genres from "../Genres";
import TranslationStatus from "../TranslationStatus";
import MangaStatus from "../MangaStatus";
import ReleaseYear from "../ReleaseYear";
import AgeRating from "../AgeRating";
import MangaType from "../MangaType";

const AddMangaFields = () => {
  const { control } = useFormContext<MangaSchema>();

  return (
    <DefaultCard className="p-4 flex flex-col md:flex-row md:items-start items-center justify-start gap-6">
      <UploadCover />

      <div className="flex-1 flex flex-col gap-4 w-full">
        <FieldGroup>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-title">Asar nomi</FieldLabel>
                <Input
                  {...field}
                  id="form-title"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MangaType />

          <AgeRating />

          <ReleaseYear />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MangaStatus />

          <TranslationStatus />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Categories />

          <Genres />
        </div>
      </div>
    </DefaultCard>
  );
};

export default AddMangaFields;
