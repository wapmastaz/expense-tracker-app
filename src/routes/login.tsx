import { Button } from "@/components/ui/button"
import {createFileRoute, Link, useNavigate} from '@tanstack/react-router'
import {ChevronLeft} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod/v3";
import { Input } from "@/components/ui/input";
import {toast} from "sonner";
import {loginUser} from "@/services/auth-service.ts";
import {useState} from "react";
import {Spinner} from "@/components/ui/spinner.tsx";

export const Route =
  createFileRoute('/login')({
  component: LoginPage,
})

const loginFormSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required"),
  password: z.string()
    .min(6, "Password should be at least 6 characters")
})

function LoginPage() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const form =
    useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  const onSubmit =async (values: z.infer<typeof loginFormSchema>) => {
   try {
     setLoading(true);

     const {username, password} = values
     await loginUser(username, password)
     toast.success("Login successfully")
     form.reset()
     navigate({
       to: "/profile"
     })
   }catch (error: any) {
     toast.error(error?.message)
   }finally{
      setLoading(false);
    }
  }

  return (
    <>
      <header
        className="bg-primary h-60 flex
      items-center
      ">
        <div className="container">
          <div className="flex justify-between items-center">
            <Button
              size="icon-lg"
              className="text-background w-10 h-10"
              asChild
            >
              <Link to="/">
                <ChevronLeft/>
              </Link>
            </Button>

            <h3 className="text-lg text-background font-semibold">Login</h3>

            <span></span>
          </div>
        </div>
      </header>

      <section className="relative -top-16">
        <div className="container">
          <Card >
            <CardContent>
              <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="username">
                          Username
                        </FieldLabel>
                        <Input
                          {...field}
                          id="username"
                          aria-invalid={fieldState.invalid}
                          placeholder=""
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="password">
                          Password
                        </FieldLabel>
                        <Input
                          {...field}
                          type="password"
                          id="password"
                          aria-invalid={fieldState.invalid}
                          placeholder=""
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                {/*  login button*/}
                  <div className="flex">
                    <Button
                      disabled={loading}
                      size="lg"
                      className="h-12 bg-primary w-full uppercase text-sm font-medium"
                    >
                      {loading && <Spinner/>}
                      Login
                    </Button>
                  </div>

                {/*  paragraph*/}
                  <p className="text-sm text-muted-foreground ">
                    Doesn't have account?
                    <Link
                      className="text-primary pl-2 font-medium"
                      to="/register">
                     Get Started
                    </Link>
                  </p>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>

  )
}
