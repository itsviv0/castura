"use client";

import { Video, Monitor, Mic, Download } from "lucide-react";

export const Features = () => {
  const FeatureCard = ({
    icon,
    title,
    description,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }) => (
    <div className="p-6 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-foreground/80">{description}</p>
    </div>
  );

  return (
    <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Everything You Need
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Monitor />}
            title="Screen Recording"
            description="Capture your screen in high quality with smooth frame rates"
          />
          <FeatureCard
            icon={<Video />}
            title="Webcam Overlay"
            description="Add a professional touch with picture-in-picture webcam recording"
          />
          <FeatureCard
            icon={<Mic />}
            title="Audio Recording"
            description="Crystal clear audio from your microphone or system audio"
          />
        </div>
      </div>
    </section>
  );
};
