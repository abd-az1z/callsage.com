"use client";

import { ErrorState } from "@/components/errorState";
import { LoadingState } from "@/components/loadingState";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AgentIdViewHeader } from "../components/AgentIdViewHeader";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { GeneratedAvatar } from "@/components/generated-avatar";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <div className="flex-1 p-4 md:px-8 flex flex-col gap-y-4 ">
      <AgentIdViewHeader
        agentId={agentId}
        agentName={data.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />
      <div className="bg-white border rounded-lg ">
        <div className="p-4 gap-y-5 flex flex-col col-span-5 ">
          <div className="flex items-center gap-x-3">
            <GeneratedAvatar
              variant="bottsNeutral"
              seed={data.name}
              className="size-9"
            />
            <h2 className="text-2xl font-medium">{data.name}</h2>
          </div>
          <Badge
            variant="outline"
            className="flex items-center gap-x-2 [&>svg]:size-4 "
          >
            <VideoIcon className="text-blue-700" />
            {data.meetingCount}{" "}
            {data.meetingCount === 1 ? "meeting" : "meetings"}
          </Badge>
          <div className="flex flex-col gap-y-4 ">
            <p className="text-lg font-medium">Instructions</p>
            <p className="text-netural-800">{data.instructions}</p>
          </div>
        </div>
      </div>
      {/* {JSON.stringify(data, null, 2)} */}
    </div>
  );
};

export const AgentIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agent"
      description="This may take few seconds"
    />
  );
};

export const AgentIdViewError = () => {
  return (
    <ErrorState
      title="Error loading agent"
      description="Please try again later"
    />
  );
};

// <h1>{data.name}</h1>
//     <p>{data.email}</p>
//     <p>{data.phone}</p>
//     <p>{data.role}</p>
//     <p>{data.status}</p>
//     <p>{data.createdAt}</p>
//     <p>{data.updatedAt}</p>
