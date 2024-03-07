import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Signup = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, formData);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError("server", {
          type: "manual",
          message: error.response.data.message,
        });
      }
    }
  };

  return (
    <form
      className="flex items-center justify-center h-screen"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign Up !</CardTitle>
          <CardDescription>
            Enter some basic details to make an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                placeholder="First Name"
                name="firstName"
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
              {errors.firstName && (
                <div className="text-red-500 text-sm">
                  {errors.firstName.message}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                placeholder="Last Name"
                name="lastName"
                {...register("lastName", { required: "Last Name is required" })}
              />
              {errors.lastName && (
                <div className="text-red-500 text-sm">
                  {errors.lastName.message}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="m@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <div className="text-red-500 text-sm">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <div className="text-red-500 text-sm">
                  {errors.password.message}
                </div>
              )}
            </div>
            {errors.server && (
              <div className="w-370 p-15 m-5 mb-0 text-14 bg-red-500 text-white rounded-5 text-center">
                {errors.server.message}
              </div>
            )}
            <Button className="w-full text-md" type="submit">
              Signup
            </Button>
            <div className="text-small text-center p-1">
              Already a user?{" "}
              <Link to="/login" className="font-bold border-b-2 border-black">
                Login
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default Signup;
