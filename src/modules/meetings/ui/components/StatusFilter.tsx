import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  LoaderIcon,
  VideoIcon,
} from "lucide-react";
import { MeetingStatus } from "../../types";
import { useMeetingsFilters } from "../../hooks/useMeetingsFilters";
import { CommandSelect } from "@/components/commandSelect";

const options = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="capitalize flex items-center gap-x-2">
        <ClockArrowUpIcon className="size-3 text-muted-foreground " />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="capitalize flex items-center gap-x-2">
        <CircleCheckIcon className="size-3 text-muted-foreground " />
        {MeetingStatus.Completed}
      </div>
    ),
  },

  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="capitalize flex items-center gap-x-2">
        <VideoIcon className="size-3 text-muted-foreground " />
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="capitalize flex items-center gap-x-2">
        <LoaderIcon className="size-3 text-muted-foreground " />
        {MeetingStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="capitalize flex items-center gap-x-2">
        <CircleXIcon className="size-3 text-muted-foreground " />
        {MeetingStatus.Cancelled}
      </div>
    ),
  },
];

export const StatusFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();

  return (
    <div>
      <CommandSelect
        placeholder="Status"
        className="h-9"
        options={options}
        onSelect={(value) => setFilters({ status: value as MeetingStatus })}
        value={filters.status ?? ""}
      />
    </div>
  );
};
