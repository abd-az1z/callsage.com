import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { CallLobby } from "./CallLobby";
import { CallActive } from "./CallActive";
import { CallEnded } from "./CallEnded";

interface Props {
  meetingName: string;
}

export const CallUI = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<"Lobby" | "call" | "ended">("Lobby");

  const handleJoin = async () => {
    if (!call) return;
    await call.join();
    setShow("call");
  };

  const handleLeave = () => {
    if (!call) return;
    call.endCall();
    setShow("ended");
  };

  return (
    <StreamTheme className="h-full">
      {show === "Lobby" && <CallLobby onJoin={handleJoin} />}
      {show === "call" && (
        <CallActive onLeave={handleLeave} meetingName={meetingName} />
      )}
      {show === "ended" && <CallEnded />}
    </StreamTheme>
  );
};
