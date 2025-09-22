"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginFormValues, { setSubmitting }: any) => {
    setIsLoading(true);
    try {
    
      await new Promise(resolve => setTimeout(resolve, 1000));
      
     
      console.log("Login attempt:", values);
      
      // In a real app, you would:
      // 1. Call your authentication API
      // 2. Store the token
      // 3. Redirect to dashboard
      
      // Redirect to dashboard after successful login
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Admin Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@example.com"
                      className={errors.email && touched.email ? "border-red-500" : ""}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className={errors.password && touched.password ? "border-red-500" : ""}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
