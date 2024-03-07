import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

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

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, formData);
      localStorage.setItem("token", res.token);
      navigate("/"); // Replace with the desired route after successful login
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
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
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
            {error && (
              <div className="w-370 p-15 m-5 mb-0 text-14 bg-red-500 text-white rounded-5 text-center">
                {error}
              </div>
            )}
            <Button className="w-full" type="submit">
              Login
            </Button>
            <div className="text-small text-center p-1">
              Not a user?{" "}
              <Link to="/signup" className="font-bold border-b-2 border-black">
                Sign Up !
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default Login;
