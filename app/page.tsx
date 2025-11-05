"use client";
import React, { useEffect, useState } from "react";
import SimliElevenlabs from "@/app/SimliElevenlabs";
import DottedFace from "./Components/DottedFace";
import SimliHeaderLogo from "./Components/Logo";
import Navbar from "./Components/Navbar";
import Image from "next/image";
import GitHubLogo from "@/media/github-mark-white.svg";

interface avatarSettings {
  elevenlabs_agentid: string;
  simli_faceid: string;
}

// Customize your avatar here
const avatar: avatarSettings = {
  elevenlabs_agentid: "YOUR_ELEVENLABS_AGENT_ID", // Replace with your ElevenLabs agent ID
  simli_faceid: "1c6aa65c-d858-4721-a4d9-bda9fde03141", // Replace with your Simli face ID
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
      <Navbar />

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

      <div className="max-w-[350px] font-thin flex flex-col items-center ">
        <span className="font-bold mb-[8px] leading-5 ">
          {" "}
          Create Simli App — стартовий репозиторій для створення візуальних
          аватарів із Simli{" "}
        </span>
        <ul className="list-decimal list-inside max-w-[350px] ml-[6px] mt-2">
          <li className="mb-1">
            Заповніть ключі API ElevenLabs та Simli у файлі .env.
          </li>
          <li className="mb-1">
            Перевірте взаємодію та поспілкуйтеся з аватаром, який озвучується
            ElevenLabs і візуалізується Simli.
          </li>
          <li className="mb-1">
            Ви можете замінити обличчя та агента аватара на власні, відредагувавши
            файл <code>app/page.tsx</code>.
          </li>
        </ul>
        <span className=" mt-[16px]">
          Тепер ви можете розгорнути цей застосунок на Vercel або інтегрувати його
          до свого чинного проєкту.
        </span>
      </div>
    </div>
  );
};

export default Demo;
