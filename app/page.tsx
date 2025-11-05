"use client";
import React, { useState } from "react";
import SimliElevenlabs from "@/app/SimliElevenlabs";
import DottedFace from "./Components/DottedFace";
import SimliHeaderLogo from "./Components/Logo";
import Image from "next/image";
import GitHubLogo from "@/media/github-mark-white.svg";

interface AvatarSettings {
  elevenlabs_agentid: string;
  simli_faceid: string;
}

// Customize your avatar here
const avatar: AvatarSettings = {
  elevenlabs_agentid:
    process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ?? "ELEVEN-LABS-AGENT-ID",
  simli_faceid: "5514e24d-6086-46a3-ace4-6a7264e5cb7c", // Replace with your Simli face ID
};

const Demo: React.FC = () => {
  const [showDottedFace, setShowDottedFace] = useState(true);

  const onStart = () => {
    console.log("Setting setshowDottedface to false...");
    setShowDottedFace(false);
  };

  const onClose = () => {
    console.log("Setting setshowDottedface to true...");
    setShowDottedFace(true);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center font-abc-repro font-normal text-sm text-white p-8">
      <SimliHeaderLogo />
      <div className="absolute top-[32px] right-[32px]">
        <text
          onClick={() => {
            window.open("https://github.com/simliai/create-simli-app-elevenlabs");
          }}
          className="font-bold cursor-pointer mb-8 text-xl leading-8"
        >
          <Image className="w-[20px] inline mr-2" src={GitHubLogo} alt="" />
          Репозиторій create-simli-app (ElevenLabs)
        </text>
      </div>
      <div className="flex flex-col items-center gap-6 bg-effect15White p-6 pb-[40px] rounded-xl w-full">
        <div>
          {showDottedFace && <DottedFace />}
          <SimliElevenlabs
            agentId={avatar.elevenlabs_agentid}
            simli_faceid={avatar.simli_faceid}
            onStart={onStart}
            onClose={onClose}
            showDottedFace={showDottedFace}
          />
        </div>
      </div>

      <div className="max-w-[350px] font-thin flex flex-col items-center text-center gap-2">
        <p className="font-bold leading-5">
          ОБ’ЄКТИВНИЙ СТРУКТУРОВАНИЙ ПРАКТИЧНИЙ (КЛІНІЧНИЙ) ІСПИТ.
        </p>
        <p className="leading-5">
          Розпитування. Спілкування із голосовим агентом - Human Digital Twin.
        </p>
        <p className="mt-[16px] leading-5">
          Почніть прийом із запитання до пацієнта
        </p>
      </div>
    </div>
  );
};

export default Demo;
