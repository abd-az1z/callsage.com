import { ResponsiveDialog } from "@/components/reponsiveDialog";
import { AgentForm } from "./AgentForm";
import { AgentGetOne } from "../../types";

interface UpdateAgentDailogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}

export const UpdateAgentDailog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateAgentDailogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit this agent details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
