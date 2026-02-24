import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import mobileLaptopMockup from "@/public/mobile_tablet_mockup.png";
import { WebBrowserIcon } from "../icons/regular";

export function DownloadSection() {
  // const mobileLaptopMockupSrc = mobileLaptopMockup.src || mobileLaptopMockup;

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 bg-background text-foreground">
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
              Apk Download
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/auth/signin"
              className="px-6 py-3 rounded-3xl border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold flex items-center justify-center transition gap-2 whitespace-nowrap cursor-pointer"
            >
              <WebBrowserIcon className="w-5 h-5" />
              Web
            </Link>
          </div>
          <div className="relative">
              <Image
                  src={mobileLaptopMockup}
                  alt="Student in classroom taking notes"
                  className="w-full max-w-3xl mx-auto h-auto object-cover"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
