"use client";

import DefaultCard from "@/components/pages/manga-add/DefaultCard";
import UploadCover from "./UploadCover";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useFormContext } from "react-hook-form";
import { MangaSchema } from "@/lib/validations/manga.validations";

const AddMangaTitles = () => {
  const { control } = useFormContext<MangaSchema>();

  return (
    <DefaultCard className="p-4 flex flex-col md:flex-row items-start justify-start gap-6">
      <UploadCover />

      {/* flex-col va gap-4 orqali qatorlarni ajratamiz */}
      <div className="flex-1 flex flex-col gap-4 w-full">
        {/* Asosiy Sarlavha */}
        <FieldGroup>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-title">Sarlavha (Title)</FieldLabel>
                <Input
                  {...field}
                  id="form-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Manga sarlavhasini kiriting"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* 1-QATOR: 3 ta ustun (Тип, Возрастное ограничение, Год выпуска) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FieldGroup>
            <Controller
              name="type" // Zod schemadagi nomiga moslang
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-type">Turi (Тип)</FieldLabel>
                  {/* Agar Select komponentingiz bo'lsa, shuni o'rniga qo'ying */}
                  <Input {...field} id="form-type" placeholder="Tanlang..." />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              name="ageLimit"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-age">Yosh chegarasi</FieldLabel>
                  <Input {...field} id="form-age" placeholder="Tanlang..." />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              name="releaseYear"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-year">Chiqqan yili</FieldLabel>
                  <Input
                    {...field}
                    id="form-year"
                    placeholder="Yil"
                    type="number"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>

        {/* 2-QATOR: 2 ta ustun (Статус произведения, Статус перевода) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldGroup>
            <Controller
              name="status"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-status">Asar holati</FieldLabel>
                  <Input {...field} id="form-status" placeholder="Tanlang..." />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              name="translationStatus"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-t-status">
                    Tarjima holati
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-t-status"
                    placeholder="Tanlang..."
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>

        {/* 3-QATOR: 2 ta ustun (Категории, Жанры) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldGroup>
            <Controller
              name="categories"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-categories">
                    Kategoriyalar
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-categories"
                    placeholder="Tanlang..."
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              name="genres"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-genres">Janrlar</FieldLabel>
                  <Input {...field} id="form-genres" placeholder="Tanlang..." />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>
      </div>
    </DefaultCard>
  );
};

export default AddMangaTitles;
