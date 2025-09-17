"use client";
import React, { useState } from "react";
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
import { SignInPage } from "@/modules/auth/SignInPage";
import { SignUpPage } from "@/modules/auth/SignUpPage";

const AuthPages = () => {
  const [currentPage, setCurrentPage] = useState("signin"); // 'signin' or 'signup'

  return (
    <section className="relative container min-h-screen mx-auto bg-gradient-to-br from-blue-50 to-indigo-900 dark:from-gray-100 dark:to-gray-800 flex items-center justify-center p-4">
      {currentPage === "signin" ? (
        <SignInPage setCurrentPage={setCurrentPage} />
      ) : (
        <SignUpPage setCurrentPage={setCurrentPage} />
      )}
    </section>
  );
};

export default AuthPages;
