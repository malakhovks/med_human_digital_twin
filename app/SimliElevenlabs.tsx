"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import { Conversation } from "@elevenlabs/client";
import { SimliClient } from "simli-client";
import VideoBox from "./Components/VideoBox";
import cn from "./utils/TailwindMergeAndClsx";
import IconSparkleLoader from "@/media/IconSparkleLoader";
import { getElevenLabsSignedUrl } from "./actions/actions";

interface SimliElevenlabsProps {
  simli_faceid: string;
  agentId: string;
  onStart: () => void;
  onClose: () => void;
  showDottedFace: boolean;
}

const simliClient = new SimliClient();

const SimliElevenlabs: React.FC<SimliElevenlabsProps> = ({
  simli_faceid,
  agentId,
  onStart,
  onClose,
  showDottedFace,
}) => {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarVisible, setIsAvatarVisible] = useState(false);
  const [error, setError] = useState("");

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const conversationRef = useRef<Conversation | null>(null);
  const manualCleanupPendingRef = useRef(false);

  /**
   * Initializes the Simli client with the provided configuration.
   */
  const initializeSimliClient = useCallback(() => {
    if (videoRef.current && audioRef.current) {
      const SimliConfig = {
        apiKey: process.env.NEXT_PUBLIC_SIMLI_API_KEY,
        faceID: simli_faceid,
        handleSilence: true,
        videoRef: videoRef.current,
        audioRef: audioRef.current,
      };

      simliClient.Initialize(SimliConfig as any);
      console.log("Simli Client initialized");
    }
  }, [simli_faceid]);

  /**
   * Converts base64 audio to Uint8Array for Simli
   */
  const base64ToUint8Array = (base64: string): Uint8Array => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const cleanupAfterDisconnect = useCallback(() => {
    console.log("Cleaning up interaction state");
    setIsLoading(false);
    setIsAvatarVisible(false);
    conversationRef.current = null;
    manualCleanupPendingRef.current = false;
    simliClient?.ClearBuffer();
    simliClient?.close();
    onClose();
    console.log("Interaction stopped");
  }, [onClose]);

  /**
   * Establishes a conversation with ElevenLabs using the official client
   */
  const connectToElevenLabs = useCallback(async () => {
    try {
      // Get signed URL for the agent first
      const signedUrl = await getElevenLabsSignedUrl(agentId);
      console.log("Got ElevenLabs signed URL");
      const conversation = await Conversation.startSession({
        signedUrl,
        connectionType: "websocket",
        onConnect: ({ conversationId }) => {
          console.log("ElevenLabs conversation connected", conversationId);
          setIsAvatarVisible(true);
          setIsLoading(false);
          setError("");
        },
        onMessage: ({ message, source }) => {
          console.log(`${source} message:`, message);
        },
        onAudio: (audioBase64: string) => {
          const audioData = base64ToUint8Array(audioBase64);
          if (simliClient) {
            simliClient.sendAudioData(audioData);
          }
        },
        onError: (message, context) => {
          console.error("ElevenLabs conversation error:", message, context);
          setError(`ElevenLabs error: ${message}`);
          setIsLoading(false);
        },
        onDisconnect: (details) => {
          console.log("ElevenLabs conversation disconnected", details);
          if (details.reason === "error" && details.message) {
            setError(`Connection closed: ${details.message}`);
          }

          if (manualCleanupPendingRef.current) {
            manualCleanupPendingRef.current = false;
            cleanupAfterDisconnect();
            return;
          }

          cleanupAfterDisconnect();
        },
      });

      conversationRef.current = conversation;
    } catch (error) {
      console.error("Failed to connect to ElevenLabs:", error);
      setError(
        error instanceof Error
          ? `Failed to connect: ${error.message}`
          : "Failed to connect to ElevenLabs"
      );
      setIsLoading(false);
    }
  }, [agentId, cleanupAfterDisconnect]);

  const handleSimliConnected = useCallback(() => {
    console.log("SimliClient connected");

    // Send initial audio data to establish connection
    const audioData = new Uint8Array(6000).fill(0);
    simliClient?.sendAudioData(audioData);
    console.log("Sent initial audio data to Simli");

    connectToElevenLabs();
  }, [connectToElevenLabs]);

  const handleSimliDisconnected = useCallback(() => {
    console.log("SimliClient disconnected");
  }, []);

  /**
   * Handles the start of the interaction
   */
  const handleStart = useCallback(async () => {
    initializeSimliClient();

    setIsLoading(true);
    setError("");
    onStart();

    try {
      // Start Simli client
      await simliClient?.start();
    } catch (error: any) {
      console.error("Error starting interaction:", error);
      setError(`Error starting interaction: ${error.message}`);
      setIsLoading(false);
    }
  }, [initializeSimliClient, onStart]);

  /**
   * Handles stopping the interaction
   */
  const handleStop = useCallback(() => {
    console.log("Stopping interaction...");
    setIsLoading(false);
    setError("");
    setIsAvatarVisible(false);

    if (!conversationRef.current) {
      cleanupAfterDisconnect();
      return;
    }

    manualCleanupPendingRef.current = true;

    try {
      conversationRef.current.endSession();
    } catch (error) {
      console.error("Error ending ElevenLabs conversation:", error);
      manualCleanupPendingRef.current = false;
      cleanupAfterDisconnect();
    }
  }, [cleanupAfterDisconnect]);

  // Cleanup on unmount
  useEffect(() => {
    simliClient.on("connected", handleSimliConnected);
    simliClient.on("disconnected", handleSimliDisconnected);

    return () => {
      simliClient.off("connected", handleSimliConnected);
      simliClient.off("disconnected", handleSimliDisconnected);
      try {
        conversationRef.current?.endSession();
      } catch (error) {
        console.error("Error closing ElevenLabs conversation on unmount:", error);
      }
      conversationRef.current = null;
      simliClient?.close();
    };
  }, [handleSimliConnected, handleSimliDisconnected]);

  return (
    <>
      <div
        className={`transition-all duration-300 ${
          showDottedFace ? "h-0 overflow-hidden" : "h-auto"
        }`}
      >
        <VideoBox video={videoRef} audio={audioRef} />
      </div>
      <div className="flex flex-col items-center">
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        {!isAvatarVisible ? (
          <button
            onClick={handleStart}
            disabled={isLoading}
            className={cn(
              "w-full h-[52px] mt-4 disabled:bg-[#343434] disabled:text-white disabled:hover:rounded-[100px] bg-simliblue text-white py-3 px-6 rounded-[100px] transition-all duration-300 hover:text-black hover:bg-white hover:rounded-sm",
              "flex justify-center items-center"
            )}
          >
            {isLoading ? (
              <IconSparkleLoader className="h-[20px] animate-loader" />
            ) : (
              <span className="font-abc-repro-mono font-bold w-[164px]">
                Розпочати взаємодію з автаром
              </span>
            )}
          </button>
        ) : (
          <>
            <div className="flex items-center gap-4 w-full">
              <button
                onClick={handleStop}
                className={cn(
                  "mt-4 group text-white flex-grow bg-red hover:rounded-sm hover:bg-white h-[52px] px-6 rounded-[100px] transition-all duration-300"
                )}
              >
                <span className="font-abc-repro-mono group-hover:text-black font-bold w-[164px] transition-all duration-300">
                  Зупинити взаємодію
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SimliElevenlabs;