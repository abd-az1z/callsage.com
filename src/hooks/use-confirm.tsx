import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/reponsiveDialog";

export const useConfirm = (
  title: string,
  description: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void; 
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDailog = () => (
    <ResponsiveDialog
      open={promise !== null}
      onOpenChange={handleClose}
      title={title}
      description={description}
    >
      <div className="flex flex-col-reverse lg:flex-row gap-x-2 items-center justify-end gap-y-2 pt-4 ">
        <Button
          onClick={handleCancel}
          variant="outline"
          className="w-full lg:w-auto"
        >
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleConfirm} className="w-full lg:w-auto">
          Confirm
        </Button>
      </div>
    </ResponsiveDialog>
  );

  return [ConfirmationDailog, confirm];
};
