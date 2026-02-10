"use client";

import React, { useEffect, useState, useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Crown, Loader2, Sparkles } from "lucide-react";
// import { SuccessModal } from "@/components/success-modal";
import Image from "next/image";
import userPhoto1 from "@/public/user_photo-1.png";
import userPhoto2 from "@/public/user_photo-2.png";
import userPhoto3 from "@/public/user_photo-3.png";

export function WaitlistSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalData, setModalData] = useState({
    position: 0,
    referralLink: "",
    statusLink: "",
  });
  const emailInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // const { scrollYProgress } = useScroll({
  //   target: sectionRef,
  //   offset: ["start end", "end start"],
  // });

  // const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  // const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  // const borderRadius = useTransform(
  //   scrollYProgress,
  //   [0, 0.5],
  //   ["60px", "40px"],
  // );

  // Sanitize email input
  const sanitizeEmail = (email: string): string => {
    return email.trim().toLowerCase();
  };

  // Validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedEmail = sanitizeEmail(email);
    const sanitizedName = fullName.trim();

    if (!sanitizedName) {
      alert("Please enter your full name");
      return;
    }

    if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: sanitizedName,
          email: sanitizedEmail,
        }),
      });

      const data = await response.json();

      if (data.alreadyExists) {
        // Redirect to existing waitlist status page
        window.location.href = `/waitlist/${data.id}`;
        return;
      }

      if (data.success) {
        const appUrl =
          typeof window !== "undefined" ? window.location.origin : "";
        const referralLink = `${appUrl}?ref=${data.referralId}`;
        const statusLink = `${appUrl}/waitlist/${data.id}`;

        setModalData({
          position: data.position,
          referralLink,
          statusLink,
        });
        setShowSuccessModal(true);
        setFullName("");
        setEmail("");
      } else {
        const errorMessage = data.details
          ? `${data.error}: ${data.details}`
          : data.error || "Failed to join waitlist. Please try again.";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "An error occurred. Please check your internet connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Focus input when hash is #waitlist-form
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#waitlist-form") {
        setTimeout(() => {
          emailInputRef.current?.focus();
        }, 100);
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const userPhoto1Src = userPhoto1.src || userPhoto1;
  const userPhoto2Src = userPhoto2.src || userPhoto2;
  const userPhoto3Src = userPhoto3.src || userPhoto3;

  return (
    <section
      ref={sectionRef}
      id="waitlist-form"
      className="relative w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 rounded-t-3xl lg:rounded-t-[82px] bg-background text-foreground border-t"
    >
      {/* <div
        className="w-full min-h-[500px] mx-auto px-4 sm:px-6 lg:px-14 py-16"
      > */}
      <div className="container flex items-center justify-center">
        <div className="space-y-8 w-full mx-auto text-center">
          <div className="space-y-6 max-w-lg mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-none border border-primary mx-auto">
              <Sparkles className="w-5 h-5 text-foreground animate-pulse" />
              <span className="text-sm font-medium text-foreground">
                Beyond education
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Are you a Student?
            </h2>
            <p className="text-lg text-foreground">
              Be among the first to experience our platform when we launch in
              Q2 2026.
            </p>
          </div>

          {/* Waitlist Form */}
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap items-center justify-center">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isSubmitting}
                required
                className="flex-1 px-4 py-3 rounded-3xl border border-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <input
                ref={emailInputRef}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
                className="flex-1 px-4 py-3 rounded-3xl border border-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-3 rounded-3xl bg-secondary hover:bg-secondary/80 text-white font-semibold flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed gap-2 whitespace-nowrap cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    Join Now
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-foreground overflow-hidden relative">
                <Image
                  src={userPhoto1Src}
                  alt="User 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-foreground overflow-hidden relative">
                <Image
                  src={userPhoto2Src}
                  alt="User 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-foreground overflow-hidden relative">
                <Image
                  src={userPhoto3Src}
                  alt="User 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <span className="text-foreground/80 text-xs">
              Trusted by many students
            </span>
          </div>

          {/* Success Modal */}
          {/* <SuccessModal
              isOpen={showSuccessModal}
              onClose={() => setShowSuccessModal(false)}
              position={modalData.position}
              referralLink={modalData.referralLink}
              statusLink={modalData.statusLink}
            /> */}
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}
