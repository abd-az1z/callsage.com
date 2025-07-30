"use client";

import { ErrorState } from "@/components/errorState";
import { LoadingState } from "@/components/loadingState";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../components/MeetingIdViewHeader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDailog } from "../components/UpdateMeetingDailog copy";
import { useState } from "react";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const trpc = useTRPC();

  const [UpdateMeetingDailogOpen, setUpdateMeetingDailogOpen] = useState(false);

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure you want to delete this meeting?",
    `The following meeting and assosiated data will be deleted permanently.`
  );
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        // free tier usage
        router.push("/meetings");
      },
      //   onError: (error) => {
      //     toast.error(error.message);
      //   },
    })
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    await removeMeeting.mutateAsync({ id: meetingId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDailog
        open={UpdateMeetingDailogOpen}
        onOpenChange={setUpdateMeetingDailogOpen}
        initialValues={data}
      />
      <div className="flex-1 p-4 md:px-8 flex flex-col gap-y-4 ">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDailogOpen(true)}
          onRemove={handleRemoveMeeting}
        />

        {/* 
        
        <div className="bg-white border rounded-lg ">
                  <div className="p-4 gap-y-5 flex flex-col col-span-5 ">
                    <div className="flex items-center gap-x-3">
                      <GeneratedAvatar
                        variant="bottsNeutral"
                        seed={data.name}
                        className="size-9"
                      />
                      <h2 className="text-2xl font-medium">{data.name}</h2>
                    </div>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-x-2 [&>svg]:size-4 "
                    >
                      <VideoIcon className="text-blue-700" />
                      {data.meetingCount}{" "}
                      {data.meetingCount === 1 ? "meeting" : "meetings"}
                    </Badge>
                    <div className="flex flex-col gap-y-4 ">
                      <p className="text-lg font-medium">Instructions</p>
                      <p className="text-netural-800">{data.instructions}</p>
                    </div>
                  </div>
                </div>
        
        */}
      </div>
    </>
  );
};

export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="This may take few seconds"
    />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Error loading meeting"
      description="Please try again later"
    />
  );
};
