import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MangaSchema } from "@/lib/validations/manga.validations";
import { Controller, useFormContext } from "react-hook-form";

const MessageToModerator = () => {
  const { control } = useFormContext<MangaSchema>();

  return (
    <Controller
      name="messageToModerator"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="relative">
          <FieldLabel htmlFor="form-message-to-moderator">
            Moderatorga xabar
          </FieldLabel>
          <Input {...field} id="form-message-to-moderator" />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default MessageToModerator;
