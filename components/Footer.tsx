"use client";

import { Github, Video } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-background/95 dark:bg-background/95 dark:text-foreground/80 text-center py-8">
      <div className="mx-auto px-4 flex justify-center">
        <Link href="/" className="flex items-center space-x-1 mr-2">
          <Video className="h-4 w-4 text-primary" />
          <span className="font-bold text-l">Castura</span>
        </Link>
        <span className="text-base fonxxt-medium"> | </span>
        <Link
          href="https://github.com/itsviv0"
          target="_blank"
          className="flex items-center space-x-1 ml-2"
        >
          <Github className="w-4 h-4 mr-1" />
          itsviv0
        </Link>
      </div>
    </footer>
  );
};
