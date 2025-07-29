import { ResponsiveDialog } from "@/components/reponsiveDialog";
import { MeetingForm } from "./MeetingForm";
import { useRouter } from "next/navigation";

interface NewMeetingDailogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewMeetingDailog = ({
  open,
  onOpenChange,
}: NewMeetingDailogProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Start a new meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={(id) => {
          onOpenChange(false);
          router.push(`/meetings/${id}`);
        }}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};
