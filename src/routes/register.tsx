import {createFileRoute, Link, useNavigate} from '@tanstack/react-router'
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft, EyeIcon, EyeOff} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";
import z from "zod/v3";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {useState} from "react";
import {registerNewUser} from "@/services/auth-service.ts";
import {useMutation} from "@tanstack/react-query";
import {Spinner} from "@/components/ui/spinner.tsx";

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

const registerFormSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required"),
  email: z.string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(6, 'Password must be at least 6 characters long')
})

function RegisterPage() {

  const [passwordType, setPasswordType] = useState(true)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const form =
    useForm<z.infer<typeof registerFormSchema>>({
      resolver: zodResolver(registerFormSchema),
      defaultValues: {
        username: "",
        email: "",
        password: ""
      },
    })

  const onSubmit =
    async (values: z.infer<typeof registerFormSchema>) => {
    try {
      setLoading(true)
      const {username, email, password} = values
      const {message} = await registerNewUser(username, email, password)
      toast.success(message)
      navigate({
        to: "/profile"
      })
    }catch (e: any) {
      toast.error(e?.message)
    }finally {
      setLoading(false)
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

            <h3 className="text-lg text-background font-semibold">Register</h3>

            <span></span>
          </div>
        </div>
      </header>

      <section className="relative -top-16">
        <div className="container">
          <Card>
            <CardContent>
              <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Controller
                    name="username"
                    control={form.control}
                    render={({field, fieldState}) => (
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
                          <FieldError errors={[fieldState.error]}/>
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="email"
                    control={form.control}
                    render={({field, fieldState}) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="email">
                          Email Address
                        </FieldLabel>
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          aria-invalid={fieldState.invalid}
                          placeholder=""
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]}/>
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="password"
                    control={form.control}
                    render={({field, fieldState}) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="password">
                          Password
                        </FieldLabel>

                        <InputGroup>
                          <InputGroupInput
                            {...field}
                            type={passwordType ? "password" : "text"}
                            id="password"
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            autoComplete="off"/>
                          <InputGroupAddon align="inline-end">
                            <InputGroupButton
                              aria-label="toggle-password"
                              title="Toggle password"
                              size="icon-xs"
                              onClick={() => {
                                setPasswordType(!passwordType)
                              }}
                            >
                              {passwordType ? <EyeIcon/> : <EyeOff/>}
                            </InputGroupButton>
                          </InputGroupAddon>
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]}/>
                        )}
                      </Field>
                    )}
                  />

                  {/*  register button*/}
                  <div className="flex">
                    <Button
                      size="lg"
                      disabled={loading}
                      className="h-12 bg-primary w-full uppercase text-sm font-medium"
                    >
                      {loading && <Spinner/>}
                      Register
                    </Button>
                  </div>

                  {/*  paragraph*/}
                  <p className="text-sm text-muted-foreground ">
                    Have an account?
                    <Link
                      className="text-primary pl-2 font-medium"
                      to="/login">
                      Login
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
