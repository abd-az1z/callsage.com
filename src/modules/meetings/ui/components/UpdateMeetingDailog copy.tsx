import { ResponsiveDialog } from "@/components/reponsiveDialog";
import { MeetingForm } from "./MeetingForm";
import { MeetingGetOne } from "../../types";

interface UpdateMeetingDailogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}

export const UpdateMeetingDailog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateMeetingDailogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Edit this meeting details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
