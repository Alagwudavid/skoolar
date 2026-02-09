"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { registerSchool } from "@/actions/register-school";
import { toast } from "sonner"; // Assuming sonner or use toast from hooks if available, but let's use simple logic for now

export default function RegisterSchoolPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const result = await registerSchool(formData);

    setLoading(false);
    if (result && result.error) {
      setMessage(result.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register Your School</CardTitle>
          <CardDescription>Create a profile for your educational institution.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">School Name</Label>
              <Input id="name" name="name" placeholder="University of ... " required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (Unique Handle)</Label>
              <Input id="slug" name="slug" placeholder="university-of-Example" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input id="website" name="website" placeholder="https://..." />
            </div>
            {message && <p className="text-sm text-red-500">{message}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Create School"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
