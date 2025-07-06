// File: src/pages/Auth.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Mail, Lock, User as UserIcon } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        fullName,
        email,
        password,
      },
      { withCredentials: true } // include cookies (for session or JWT)
    );

    toast.success(res.data.message);

    // Save JWT token (optional if using cookies/session-based)
    localStorage.setItem("token", res.data.token);

    // Clear the form
    setEmail("");
    setPassword("");
    setFullName("");

    // Redirect user to homepage/dashboard
    window.location.href = "/";
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Signup failed");
  } finally {
    setIsLoading(false);
  }
};

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-lg mr-3">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Employee Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Manage your workforce efficiently
            </p>
          </div>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-slate-900">Welcome</CardTitle>
            <CardDescription>
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" /> Email
                    </Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="signin-password"
                      className="flex items-center"
                    >
                      <Lock className="w-4 h-4 mr-2" /> Password
                    </Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="flex items-center">
                      <UserIcon className="w-4 h-4 mr-2" /> Full Name
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" /> Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="signup-password"
                      className="flex items-center"
                    >
                      <Lock className="w-4 h-4 mr-2" /> Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="bg-white/50"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
