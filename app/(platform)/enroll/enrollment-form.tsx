"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { enrollStudent } from "@/actions/enroll";

interface School {
  id: string;
  name: string;
}

export function EnrollmentForm({ schools }: { schools: School[] }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const result = await enrollStudent(formData);

    setLoading(false);
    if (result && result.error) {
      setMessage(result.error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Join Your School</CardTitle>
        <CardDescription>Select your school and verify your student status.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="school">Select School</Label>
            <Select name="schoolId" required>
              <SelectTrigger>
                <SelectValue placeholder="Select a school" />
              </SelectTrigger>
              <SelectContent>
                {schools.map((school) => (
                  <SelectItem key={school.id} value={school.id}>
                    {school.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="studentId">Upload Student ID (Optional if using school email)</Label>
            <Input id="studentId" name="studentId" type="file" accept="image/*,.pdf" />
          </div>

          {message && <p className="text-sm text-red-500">{message}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Request Enrollment"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
