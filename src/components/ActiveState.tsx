import { VideoIcon } from "lucide-react";
import { EmptyState } from "./emptyState";
import { Button } from "./ui/button";
import Link from "next/link";

interface Props {
  meetingId: string;
}

export const ActiveState = ({
  meetingId,
}: Props) => {
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col gap-y-8 items-center justify-center ">
      <EmptyState
        image="/upcoming.svg"
        title="Meeting is active"
        description="Meeting will end once all yje participants have left the meeting"
      />
      <div className="flex flex-col-reverse lg:flex-row gap-x-2 items-center lg:justify-center gap-2 w-full  ">
        <Button asChild className="lg:w-auto ">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Join meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
