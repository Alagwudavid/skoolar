import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import userPhoto1 from "@/public/user_photo-1.png";
import userPhoto2 from "@/public/user_photo-2.png";
import userPhoto3 from "@/public/user_photo-3.png";

export function DownloadSection() {
  const userPhoto1Src = userPhoto1.src || userPhoto1;
  const userPhoto2Src = userPhoto2.src || userPhoto2;
  const userPhoto3Src = userPhoto3.src || userPhoto3;

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-background text-foreground">
      <div className="container flex items-center justify-center">
        <div className="space-y-8 w-full mx-auto text-center">
          <div className="inline-flex items-center gap-2 p-2 mx-auto">
            <Download className="w-5 h-5 fill-foreground" />
            <span className="text-sm font-semibold text-foreground uppercase">
              Download our App
            </span>
          </div>
          <div className="space-y-6 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Access <span className="relative inline-block text-primary">Anywhere</span> and <span className="relative inline-block text-primary">Anytime</span>
            </h2>
            <p className="text-lg text-foreground">
              Experience seamless access to our latest content on the go.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Link
              href="/auth/signup"
              className="px-6 py-3 rounded-3xl bg-secondary hover:bg-secondary/80 text-white font-semibold flex items-center justify-center transition gap-2 whitespace-nowrap cursor-pointer"
            >
              Sign Up
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/auth/signin"
              className="px-6 py-3 rounded-3xl border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold flex items-center justify-center transition gap-2 whitespace-nowrap cursor-pointer"
            >
              Log In
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full border border-foreground overflow-hidden relative">
                <Image src={userPhoto1Src} alt="User 1" fill className="object-cover" />
              </div>
              <div className="w-6 h-6 rounded-full border border-foreground overflow-hidden relative">
                <Image src={userPhoto2Src} alt="User 2" fill className="object-cover" />
              </div>
              <div className="w-6 h-6 rounded-full border border-foreground overflow-hidden relative">
                <Image src={userPhoto3Src} alt="User 3" fill className="object-cover" />
              </div>
            </div>
            <span className="text-foreground/80 text-xs">
              Trusted by many students
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
