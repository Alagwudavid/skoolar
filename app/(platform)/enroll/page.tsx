'use client'

import { EnrollmentForm } from "./enrollment-form";

export default function EnrollPage() {
  // Mock data for frontend-only version
  const schools = [
    { id: '1', name: 'Stanford University' },
    { id: '2', name: 'MIT' },
    { id: '3', name: 'Harvard University' },
    { id: '4', name: 'UC Berkeley' },
  ];

  return (
    <div className="container mx-auto px-4">
      <EnrollForm schools={schools} />
    </div>
  );
}
