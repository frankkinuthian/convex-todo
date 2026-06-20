import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { ModeToggle } from "@/components/ui/theme-toggle";

export default function Page() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ModeToggle />
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignIn />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <BackgroundRippleEffect />
      </div>
    </div>
  );
}
