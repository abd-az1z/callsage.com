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
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDailog } from "../components/UpdateMeetingDailog copy";
import { useState } from "react";
import { ActiveState } from "@/components/ActiveState";
import { CancelState } from "@/components/CancelState";
import { AfterMeetingProcessingState } from "@/components/AfterMeetingProcessingState";
import { UpComingState } from "@/components/UpComingState";
import { CompletedState } from "../components/CompletedState";

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
    })
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    await removeMeeting.mutateAsync({ id: meetingId });
  };

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCompleted = data.status === "completed";
  const isCancelled = data.status === "cancelled";
  const isProcessing = data.status === "processing";

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
        {isCancelled && <CancelState />}
        {isCompleted && <CompletedState data={data} />}
        {isProcessing && <AfterMeetingProcessingState />}
        {isActive && <ActiveState meetingId={meetingId} />}

        {isUpcoming && (
          <UpComingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={false}
          />
        )}
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
