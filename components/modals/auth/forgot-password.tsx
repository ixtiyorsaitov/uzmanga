import { Dispatch, SetStateAction, useState } from "react";
import { AuthMethod } from "./content";
import { Controller, useForm } from "react-hook-form";
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
} from "@/lib/validations/auth.validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmailIcon } from "@/components/icons";
import useAuthModal from "@/components/hooks/modals/useAuthModal";
import { useForgotPassword } from "@/components/hooks/api/useAuth";
import { appToast } from "@/lib/app-toast";

const ForgotPassword = ({
  setMethod,
}: {
  setMethod: Dispatch<SetStateAction<AuthMethod>>;
}) => {
  const authModal = useAuthModal();
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const mutation = useForgotPassword();
  const onSubmit = (data: ForgotPasswordInput) => {
    console.log(data);
    mutation.mutate(data, {
      onSuccess: (res) => {
        console.log(res);
        if (res.success) {
          setEmailSent(true);
          appToast.success("Xat yuborildi");
          authModal.setOpen(false);
        } else {
          appToast.error(res.error || "Xat yuborilmadi");
        }
      },
    });
  };
  const loading = mutation.isPending;
  return emailSent ? (
    <>
      <h1 className="text-center font-semibold">Xat yuborildi</h1>
      <p className="text-sm font-semibold text-center">
        {`Parolingizni qanday tiklash bo'yicha ko'rsatmalarga ega elektron pochta
        xabari elektron pochta manzilingizga yuborildi. Agar uni bir necha
        daqiqa ichida olmasangiz, iltimos, hisobingiz uchun to'g'ri elektron
        pochta manzilini kiritganingizga ishonch hosil qiling va qaytadan urinib
        ko'ring yoki yordam uchun biz bilan bog'laning.`}
      </p>
      <h1 className="text-sm text-center">
        {"Elektron pochta xabarini olmadingizmi? "}
        <span className="text-primary hover:underline cursor-pointer font-semibold">
          {"Qayta yuboring"}
        </span>
      </h1>
      <Button
        onClick={() => {
          authModal.setOpen(false);
        }}
        className="h-10!"
      >
        Tushundim
      </Button>
    </>
  ) : (
    <>
      <h1 className="text-center font-semibold">Parolni unutdingizmi?</h1>

      <form
        id="forgot-password-form"
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative">
                <div className="relative">
                  <div className="relative">
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      disabled={loading}
                      placeholder="*Pochta"
                      autoComplete="email"
                      className="rounded-full p-2! h-auto! pl-8!"
                    />
                    <div className="absolute left-0 top-0 flex items-center justify-center w-9 h-full">
                      <EmailIcon className="w-4 h-4" />
                    </div>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <Field orientation="vertical">
        <Button
          disabled={loading}
          type="submit"
          form="forgot-password-form"
          className="h-10!"
        >
          Xatni yuborish
        </Button>
      </Field>
      <h1 className="text-sm text-center">
        {"Parolingizni eslaysizmi? "}
        <span
          onClick={() => !loading && setMethod("login")}
          className="text-primary hover:underline cursor-pointer font-semibold"
        >
          {"Kirish"}
        </span>
      </h1>
    </>
  );
};

export default ForgotPassword;
