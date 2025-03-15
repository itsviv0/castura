"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Record Your Screen with Ease
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
          Create professional screen recordings with webcam overlay in just a
          few clicks. Perfect for tutorials, presentations, and more.
        </p>
        <Button
          asChild
          size="lg"
          id="hero-record-button"
          className="bg-primary hover:bg-primary/90"
        >
          <Link href="/record" className="text-lg px-8">
            Start Recording
          </Link>
        </Button>
      </div>
    </section>
  );
};
