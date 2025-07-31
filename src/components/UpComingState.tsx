import { BanIcon, VideoIcon } from "lucide-react";
import { EmptyState } from "./emptyState";
import { Button } from "./ui/button";
import Link from "next/link";

interface Props {
  meetingId: string;
  onCancelMeeting: () => void;
  isCancelling: boolean;
}

export const UpComingState = ({
  meetingId,
  onCancelMeeting,
  isCancelling,
}: Props) => {
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col gap-y-8 items-center justify-center ">
      <EmptyState
        image="/upcoming.svg"
        title="Not started yet"
        description="Once you start the meeting, the summary will be available here."
      />
      <div className="flex flex-col-reverse lg:flex-row gap-x-2 items-center lg:justify-center gap-2 w-full  ">
        <Button onClick={onCancelMeeting} disabled={isCancelling} variant="secondary" className="w-full lg:w-auto ">
          <BanIcon />
          Cancel meeting
        </Button>
        <Button disabled={isCancelling} asChild className="w-full lg:w-auto ">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
