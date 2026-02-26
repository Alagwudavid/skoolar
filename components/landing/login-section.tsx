import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import userPhoto1 from "@/public/user_photo-1.png";
import userPhoto2 from "@/public/user_photo-2.png";
import userPhoto3 from "@/public/user_photo-3.png";

export function LoginSection() {
  const userPhoto1Src = userPhoto1.src || userPhoto1;
  const userPhoto2Src = userPhoto2.src || userPhoto2;
  const userPhoto3Src = userPhoto3.src || userPhoto3;

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-background text-foreground">
      <div className="container flex items-center justify-center">
        <div className="space-y-8 w-full mx-auto text-center">
          <div className="space-y-6 max-w-lg mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Get <span className="relative inline-block text-primary">started<span className="ml-[-5px] inline text-primary">!</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 198 18" width="220" height="18" className="ml-[-2px] h-[12px] w-[100px] text-primary lg:ml-[-20px] lg:h-[19px] lg:w-[230px]"><path stroke="currentColor" strokeLinecap="round" strokeWidth="6" d="M3.25 14.019c55.692-12.681 142.92-12.438 191.5-9"></path></svg></span>
            </h2>
            <p className="text-lg text-foreground">
              Be among the first to experience our platform.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Link
              href="/auth/signup"
              className="px-6 py-3 rounded-3xl dark:text-primary! bg-secondary hover:bg-secondary/80 text-white font-semibold flex items-center justify-center transition gap-2 whitespace-nowrap cursor-pointer"
            >
              Sign Up
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/auth/signin"
              className="px-6 py-3 rounded-3xl border-2 dark:border-primary! dark:text-primary! border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold flex items-center justify-center transition gap-2 whitespace-nowrap cursor-pointer"
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
