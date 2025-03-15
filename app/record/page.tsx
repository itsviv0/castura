"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Video, Camera, StopCircle, Download, Mic, MicOff } from "lucide-react";
import { toast } from "sonner";

export default function Record() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const webcamVideoRef = useRef<HTMLVideoElement>(null);

  const startRecording = async () => {
    try {
      // Get screen capture with system audio
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      });

      let streams = [screenStream];

      // Get microphone audio if enabled
      if (audioEnabled) {
        const micStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100,
          },
          video: false,
        });
        streams.push(micStream);
      }

      // Add webcam if enabled
      if (webcamEnabled) {
        const webcamStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (webcamVideoRef.current) {
          webcamVideoRef.current.srcObject = webcamStream;
        }

        streams.push(webcamStream);
      }

      // Combine all audio tracks into one stream
      const audioTracks = streams.flatMap((stream) => stream.getAudioTracks());

      // Combine all video tracks
      const videoTracks = streams.flatMap((stream) => stream.getVideoTracks());

      // Create a new stream with all tracks
      const combinedStream = new MediaStream([...videoTracks, ...audioTracks]);

      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: "video/webm;codecs=vp8,opus",
      });

      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setRecordedChunks(chunks);
        if (videoPreviewRef.current) {
          videoPreviewRef.current.src = URL.createObjectURL(blob);
        }
        setShowPreview(true);
        combinedStream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Recording started!");
    } catch (error) {
      console.error("Error starting recording:", error);
      toast.error("Failed to start recording. Please try again.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("Recording completed!");
    }
  };

  const downloadRecording = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = url;
      a.download = "screen-recording.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Download started!");
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 animate-gradient-x">
      <div className="container mx-auto max-w-4xl">
        {!showPreview ? (
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">
              Start Recording
            </h1>
            <p className="text-lg text-gray-300 mb-12 animate-fade-in">
              Capture your screen with professional quality and ease
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                variant="outline"
                className="relative overflow-hidden group hover:text-white transition-colors duration-300"
                onClick={() => setWebcamEnabled(!webcamEnabled)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Camera className="mr-2 h-4 w-4 relative z-10" />
                <span className="relative z-10">
                  {webcamEnabled ? "Disable Camera" : "Enable Camera"}
                </span>
              </Button>
              <Button
                variant="outline"
                className="relative overflow-hidden group hover:text-white transition-colors duration-300"
                onClick={() => setAudioEnabled(!audioEnabled)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {audioEnabled ? (
                  <Mic className="mr-2 h-4 w-4 relative z-10" />
                ) : (
                  <MicOff className="mr-2 h-4 w-4 relative z-10" />
                )}
                <span className="relative z-10">
                  {audioEnabled ? "Disable Audio" : "Enable Audio"}
                </span>
              </Button>
            </div>
            {webcamEnabled && (
              <div className="fixed bottom-4 left-4 z-50">
                <video
                  ref={webcamVideoRef}
                  autoPlay
                  muted
                  className="w-32 h-32 rounded-full object-cover border-2 border-primary shadow-lg shadow-purple-500/50"
                />
              </div>
            )}
            <Button
              size="lg"
              className={`${
                isRecording
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              } transform hover:scale-105 transition-all duration-300 shadow-lg`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? (
                <>
                  <StopCircle className="mr-2 h-4 w-4" /> Stop Recording
                </>
              ) : (
                <>
                  <Video className="mr-2 h-4 w-4" /> Start Recording
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Recording Preview
            </h2>
            <div className="relative rounded-lg overflow-hidden shadow-2xl mb-8 transform hover:scale-[1.01] transition-transform duration-300">
              <video
                ref={videoPreviewRef}
                controls
                className="w-full max-w-2xl mx-auto rounded-lg"
              />
            </div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
              onClick={downloadRecording}
            >
              <Download className="mr-2 h-4 w-4" /> Download Recording
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
