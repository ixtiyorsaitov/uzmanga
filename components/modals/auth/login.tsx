import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmailIcon, KeyIcon } from "@/components/icons";
import WithProviders from "./with-providers";
import { Dispatch, SetStateAction } from "react";
import { AuthMethod } from "./content";
import { LoginInput, loginSchema } from "@/lib/validations/auth.validations";
import { useLogin } from "@/components/hooks/api/useAuth";
import { appToast } from "@/lib/app-toast";

const Login = ({
  setMethod,
}: {
  setMethod: Dispatch<SetStateAction<AuthMethod>>;
}) => {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      loginOrEmail: "",
      password: "",
    },
  });

  const mutation = useLogin();

  const onSubmit = (data: LoginInput) => {
    mutation.mutate(data, {
      onSuccess: (res) => {
        console.log(res);
        if (res.success) {
          appToast.success("Hisobga kirildi");
        } else {
          appToast.error(res.error || "Hisobga kirilmadi");
        }
      },
    });
  };
  const loading = mutation.isPending;
  return (
    <>
      <h1 className="text-center font-semibold">Hisobga kirish</h1>
      <form
        id="login-form"
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            name="loginOrEmail"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative">
                <div className="relative">
                  <div className="relative">
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="*Login/Pochta"
                      autoComplete="usernameOrEmail"
                      className="rounded-full p-2! h-auto! pl-8!"
                      disabled={loading}
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
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative">
                <div className="relative">
                  <div className="relative">
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      type="password"
                      placeholder="*Parol"
                      className="rounded-full p-2! h-auto! pl-8!"
                      disabled={loading}
                    />
                    <div className="absolute left-0 top-0 flex items-center justify-center w-9 h-full">
                      <KeyIcon className="w-4 h-4" />
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
          form="login-form"
          className="h-10!"
        >
          Kirish
        </Button>
        <Button
          disabled={loading}
          onClick={() => setMethod("forgotPassword")}
          type="button"
          variant="link"
          className="h-auto! py-0! font-semibold"
        >
          Parolni unutdingizmi?
        </Button>
      </Field>
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-muted" />
        <span className="text-muted-foreground text-sm">yoki</span>
        <div className="flex-1 h-px bg-muted" />
      </div>
      <WithProviders disabled={loading} />
    </>
  );
};

export default Login;
