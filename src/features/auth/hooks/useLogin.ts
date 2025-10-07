"use client";

import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface LoginFormValues {
  email: string;
  password: string;
}

export const useLogin = () => {
  const router = useRouter();

  const mutationResult = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: () => {
      toast.success("Login successful");
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Login failed");
    },
  });

  return mutationResult;
};
