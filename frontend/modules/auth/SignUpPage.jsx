"use client";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowLeft,
  Github,
  Chrome,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { signUpAction } from "./actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = {
      name: signUpData.firstName + " " + signUpData.lastName,
      email: signUpData.email,
      password: signUpData.password,
    };
    console.log(signUpData);
    const res = await signUpAction(formData);
    if (res.success === true) {
      router.push("/signin");
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <User className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <CardTitle className="text-2xl font-bold">Create account</CardTitle>
        <CardDescription>
          Join GameStore and discover amazing games
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={signUpData.firstName}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={signUpData.lastName}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signupEmail">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="signupEmail"
                type="email"
                placeholder="Enter your email"
                className="pl-9"
                value={signUpData.email}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signupPassword">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="signupPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="pl-9 pr-9"
                value={signUpData.password}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, password: e.target.value })
                }
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Must be at least 6 characters
            </p>
          </div>

          <Button
            type="submit"
            className="w-full rounded-full"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => handleSocialAuth("Google")}
            disabled={isLoading}
            className="w-full"
          >
            <Chrome className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialAuth("GitHub")}
            disabled={isLoading}
            className="w-full"
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
      </CardContent>

      <CardFooter>
        <p className="text-center text-sm text-muted-foreground w-full">
          Already have an account?{" "}
          <Link href="/sign-in" className="px-0 text-primary">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
