"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignInView = () => {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);

    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: ({ error }) => {
          setError(error.message);
        },
      }
    );
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSocial = (provider: "github" | "google") => {
    setError(null);
    setPending(true);

    authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: ({ error }) => {
          setError(error.message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0 ">
        <CardContent className="grid p-0 md:grid-cols-2 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 md:p-8 "
            >
              <div className="flex flex-col gap-6 ">
                <div className="flex flex-col items-center justify-center ">
                  <h1 className="text-2xl font-bold ">Welcom Back</h1>
                  <p className="text-muted-foreground text-balance ">
                    Login to your account
                  </p>
                </div>
                {/* Email */}
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Password */}
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert className="bg-destructive/10 border-none ">
                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button disabled={pending} type="submit" className="w-full">
                  Sign in
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t ">
                  <span className="bg-card text-muted-foreground relative z-10 px-2 ">
                    Or continue with
                  </span>
                </div>
                {/* social logins */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    disabled={pending}
                    type="button"
                    className="w-full"
                    variant="outline"
                    onClick={() => onSocial("google")}
                  >
                    <FaGoogle />
                    Google
                  </Button>
                  <Button
                    disabled={pending}
                    type="button"
                    className="w-full"
                    variant="outline"
                    onClick={() => onSocial("github")}
                  >
                    <FaGithub />
                    Github
                  </Button>
                </div>
                <div className="text-center text-sm ">
                  Don&apos;t have an account?{" "}
                  <Link
                    className="underline underline-offset-4 "
                    href="/sign-up"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className="bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center  ">
            <img
              src="/logo.svg"
              alt="image"
              className="h-[92px] w-[92px] "
            />
            <p className="text-2xl font-semibold text-white ">CallSage</p>
          </div>
        </CardContent>
      </Card>
      <div className=" text-muted-foreground *[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4  ">
        By clicking the button, you agree to our{" "}
        <a href="#" className="underline underline-offset-4 ">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4">
          Terms of Service
        </a>
      </div>
    </div>
  );
};
