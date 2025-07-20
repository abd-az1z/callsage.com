import { AlertCircleIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: Props) => {
  return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center ">
        <div className="flex flex-col gap-y-4 bg-background rounded-lg p-10 shadow-sm items-center justify-center">
            <AlertCircleIcon className="size-6 text-red-500"/>
            <div className="flex flex-col gap-y-1 text-center">
                <h6 className="text-lg font-medium ">{title}</h6>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    </div>
  );
};
