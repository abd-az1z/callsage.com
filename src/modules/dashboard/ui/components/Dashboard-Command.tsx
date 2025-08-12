import { GeneratedAvatar } from "@/components/generated-avatar";
import {
  CommandResponsiveDialog,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
  CommandEmpty,
  CommandDialog
} from "@/components/ui/command";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
// Define types for our data since we can't import from @/trpc/shared
type Meeting = {
  id: string;
  name: string;
  // Add other meeting properties as needed
};

type Agent = {
  id: string;
  name: string;
  // Add other agent properties as needed
};

type ApiResponse<T> = {
  items: T[];
  // Add pagination properties if needed
};

import { useTRPC } from "@/trpc/client";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const trpc = useTRPC();

  const { data: meetingsData } = useQuery<ApiResponse<Meeting>>(
    trpc.meetings.getMany.queryOptions({
      search,
      pageSize: 100,
    }) as any // Type assertion needed due to TRPC typing complexity
  );

  const { data: agentsData } = useQuery<ApiResponse<Agent>>(
    trpc.agents.getMany.queryOptions({
      search,
      pageSize: 100,
    }) as any // Type assertion needed due to TRPC typing complexity
  );

  const meetings = meetingsData?.items || [];
  const agents = agentsData?.items || [];

  return (
    <CommandResponsiveDialog
      shouldFilter={false}
      open={open}
      onOpenChange={setOpen}
    >
      <CommandInput
        value={search}
        onValueChange={(value: string) => setSearch(value)}
        placeholder="Search for a meeting or agent..."
      />
      <CommandList>
        <CommandGroup heading="Meetings">
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No meetings found
            </span>{" "}
          </CommandEmpty>
          {meetings.map((meeting: Meeting) => (
            <CommandItem
              onSelect={() => {
                router.push(`/meetings/${meeting.id}`);
                setOpen(false);
              }}
              key={meeting.id}
            >
              {meeting.name}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Agents">
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No agents found
            </span>
          </CommandEmpty>
          {agents.map((agent: Agent) => (
            <CommandItem
              onSelect={() => {
                router.push(`/agents/${agent.id}`)
                setOpen(false);
              }}
              key={agent.id}
            >
              <GeneratedAvatar
                seed={agent.name}
                variant="botttsNeutral"
                className="size-6"
              />
              {agent.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandResponsiveDialog>
  );
};

