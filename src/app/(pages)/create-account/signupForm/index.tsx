"use client";

import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/Button";
import { Input } from "@/components/ui/input";
import { Message } from "@/components/Message";
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from "../../../_providers/Auth";

import "./style.css";

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams();
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const { create } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const Icon = showPassword ? Eye : EyeOff;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = useCallback(
    async (data: FormData) => {
      const redirect = searchParams.get("redirect");

      try {
        await create(data);
        if (redirect) router.push(redirect as string);
        else router.push('/');
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
    },
    [create, router, searchParams]
  );

  return (
    <Card className="formContainer">
      <CardHeader>
        <CardTitle className="formTitle">
          {"Welcome!"}
          <Image
            src="/assets/icons/hand-wave.png"
            alt="icon"
            width={39}
            height={30}
          />
        </CardTitle>
        <CardDescription>Create Account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} method="post" className="form">
          <Message error={error} className="message" />
          <Input
            name="name"
            label="Full Name"
            required
            register={register}
            error={errors.name}
            type="text"
          />
          <Input
            name="email"
            label="Email Address"
            required
            register={register}
            error={errors.email}
            type="email"
          />
          <div className="relative w-full">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              required
              register={register}
              error={errors.password}
            />
            <span className="eyeIcon" onClick={() => setShowPassword(!showPassword)}>
              <Icon />
            </span>
          </div>
          <Input
            name="passwordConfirm"
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
            required
            register={register}
            validate={(value) =>
              value === password.current || "The passwords do not match"
            }
            error={errors.passwordConfirm}
          />
          <Button
            type="submit"
            appearance="default"
            label={isSubmitting ? "Processing" : "Create Account"}
            disabled={isSubmitting}
            className="submit"
          />
        </form>
      </CardContent>
      <CardFooter className="block">
        {"Already have an account? "}
        <Link href={`/login${allParams}`}>Login</Link>
      </CardFooter>
    </Card>
  );
};

export default CreateAccountForm;
