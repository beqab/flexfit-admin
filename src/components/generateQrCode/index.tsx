"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, QrCode as QrCodeIcon } from "lucide-react";
import { useGetCurrentUser } from "@/lib/hooks/profile/useGetCurrentUser";
import toast from "react-hot-toast";

export default function GenerateQrCode() {
  const { data: currentUser } = useGetCurrentUser();
  const facilityId = currentUser?.facility?._id;
  const facilityName = currentUser?.facility?.name || "";

  const [isOpen, setIsOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = useCallback(async () => {
    // Wait for canvas to be available
    let attempts = 0;
    const maxAttempts = 10;

    if (!facilityId) {
      toast.error("Facility ID not found");
      return;
    }

    while (!canvasRef.current && attempts < maxAttempts) {
      console.log(`Waiting for canvas... attempt ${attempts + 1}`);
      await new Promise((resolve) => setTimeout(resolve, 50));
      attempts++;
    }

    if (!canvasRef.current) {
      console.error("Canvas ref is still null after waiting");
      setError("Canvas element not available");
      setIsGenerating(false);
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      console.log("Starting QR generation...");
      console.log("facilityId:", facilityId);

      console.log("Canvas ref available:", canvasRef.current);

      // Generate QR code data - can be a URL or just the facility ID

      // Generate QR code as canvas
      await QRCode.toCanvas(canvasRef.current, facilityId, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });

      console.log("QR Code rendered to canvas successfully");

      // Also generate data URL for download
      const dataUrl = await QRCode.toDataURL(facilityId, {
        width: 600,
        margin: 2,
      });

      console.log("Data URL generated:", dataUrl.substring(0, 50) + "...");
      setQrCodeUrl(dataUrl);
      setIsGenerating(false);
    } catch (error) {
      console.error("Error generating QR code:", error);
      setError(
        error instanceof Error ? error.message : "Failed to generate QR code"
      );
      setIsGenerating(false);
    }
  }, [facilityId]);

  // Generate QR code when dialog opens
  useEffect(() => {
    if (isOpen && facilityId) {
      console.log("Dialog opened, will generate QR code...");
      generateQRCode();
    }
  }, [isOpen, generateQRCode, facilityId]);

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = `${facilityName}-QR-${facilityId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <QrCodeIcon className="mr-2 h-4 w-4" />
          Generate QR
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Facility QR Code</DialogTitle>
          <DialogDescription>
            Scan this QR code for gym access and check-ins
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 py-4">
          {/* QR Code Display */}
          <div className="rounded-lg border-2 border-gray-200 p-4 bg-white min-h-[300px] min-w-[300px] flex items-center justify-center relative">
            {/* Canvas - Always rendered in DOM */}
            <canvas
              ref={canvasRef}
              style={{
                display: isGenerating || error ? "none" : "block",
              }}
            />

            {/* Loading State - Overlay */}
            {isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="text-sm text-gray-600 mt-2">
                  Generating QR Code...
                </p>
              </div>
            )}

            {/* Error State - Overlay */}
            {error && !isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <p className="text-sm text-red-600">⚠️ {error}</p>
                  <Button onClick={generateQRCode} size="sm" variant="outline">
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Facility Info */}
          {!isGenerating && !error && (
            <>
              <div className="text-center space-y-1">
                <p className="text-sm font-medium text-gray-900">
                  {facilityName}
                </p>
                <p className="text-xs text-gray-500">
                  Facility ID: {facilityId}
                </p>
              </div>

              {/* Download Button */}
              <Button
                onClick={downloadQRCode}
                className="w-full"
                disabled={!qrCodeUrl}
              >
                <Download className="mr-2 h-4 w-4" />
                Download QR Code
              </Button>

              {/* Instructions */}
              <div className="bg-blue-50 rounded-lg p-3 w-full">
                <p className="text-xs text-blue-900">
                  <strong>How to use:</strong> Visitors can scan this QR code to
                  check in to your facility. Print and display it at your
                  entrance or share it digitally.
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
