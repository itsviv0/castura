"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Video, Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showRecordButton, setShowRecordButton] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Check if hero record button is in view
      const heroButton = document.getElementById("hero-record-button");
      if (heroButton && pathname === "/") {
        const rect = heroButton.getBoundingClientRect();
        setShowRecordButton(rect.top < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Video className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Castura</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`hover:text-foreground ${
                pathname === "/" ? "text-foreground" : "text-foreground/80"
              }`}
            >
              Home
            </Link>
            <Link
              href="/features"
              className={`hover:text-foreground ${
                pathname === "/features"
                  ? "text-foreground"
                  : "text-foreground/80"
              }`}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className={`hover:text-foreground ${
                pathname === "/pricing"
                  ? "text-foreground"
                  : "text-foreground/80"
              }`}
            >
              Pricing
            </Link>
            {(showRecordButton || pathname !== "/ ") && (
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 animate-fade-in"
              >
                <Link href="/record">Record Now</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`hover:text-foreground px-4 py-2 ${
                  pathname === "/" ? "text-foreground" : "text-foreground/80"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/features"
                className={`hover:text-foreground px-4 py-2 ${
                  pathname === "/features"
                    ? "text-foreground"
                    : "text-foreground/80"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className={`hover:text-foreground px-4 py-2 ${
                  pathname === "/pricing"
                    ? "text-foreground"
                    : "text-foreground/80"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Button asChild className="bg-primary hover:bg-primary/90 mx-4">
                <Link href="/record" onClick={() => setIsMobileMenuOpen(false)}>
                  Record Now
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
