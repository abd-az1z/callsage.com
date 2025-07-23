import { ResponsiveDialog } from "@/components/reponsiveDialog";
import { AgentForm } from "./AgentForm";

interface NewAgentDailogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewAgentDailog = ({ open, onOpenChange }: NewAgentDailogProps) => {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};
