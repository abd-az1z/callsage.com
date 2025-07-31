import { EmptyState } from "./emptyState";


export const AfterMeetingProcessingState = () => {
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col gap-y-8 items-center justify-center ">
      <EmptyState
        image="/processing.svg"
        title="Meeting completed"
        description="Meeting has been completed, a summary will appear soon"
      />
    </div>
  );
};
