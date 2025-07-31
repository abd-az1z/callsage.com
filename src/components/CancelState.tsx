import { EmptyState } from "./emptyState";


export const CancelState = () => {
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col gap-y-8 items-center justify-center ">
      <EmptyState
        image="/cancelled.svg"
        title="Meeting cancelled"
        description="Meeting has been cancelled"
      />
    </div>
  );
};
