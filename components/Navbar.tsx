import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Video, Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showRecordButton, setShowRecordButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Check if hero record button is in view
      const heroButton = document.getElementById("hero-record-button");
      if (heroButton && router.pathname === "/home") {
        const rect = heroButton.getBoundingClientRect();
        setShowRecordButton(rect.top < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [router.pathname]);

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
          <Link href="/home" className="flex items-center space-x-2">
            <Video className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">ScreenCast</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/home"
              className="text-foreground/80 hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/features"
              className="text-foreground/80 hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-foreground/80 hover:text-foreground"
            >
              Pricing
            </Link>
            {(showRecordButton || router.pathname !== "/home") && (
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
                href="/home"
                className="text-foreground/80 hover:text-foreground px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/features"
                className="text-foreground/80 hover:text-foreground px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-foreground/80 hover:text-foreground px-4 py-2"
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
