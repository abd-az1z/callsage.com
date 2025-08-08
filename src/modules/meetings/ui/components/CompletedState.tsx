import Markdown from "react-markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeetingGetOne } from "../../types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  BookOpenTextIcon,
  ClockFadingIcon,
  FileTextIcon,
  FileVideoIcon,
  SparklesIcon,
} from "lucide-react";
import Link from "next/link";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils";
import { Transcript } from "./Transcript";
import { ChatProvider } from "./ChatProvider";

interface Props {
  data: MeetingGetOne;
}

export const CompletedState = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-y-4 ">
      <Tabs defaultValue="summary">
        <div className="bg-white rounded-lg border px-3">
          <ScrollArea>
            <TabsList className="p-0 bg-background justify-start rounded-none h-13 ">
              <TabsTrigger
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data=[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground "
                value="summary"
              >
                <BookOpenTextIcon />
                Summary
              </TabsTrigger>
              <TabsTrigger
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data=[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground "
                value="transcript"
              >
                <FileTextIcon />
                Transcript
              </TabsTrigger>
              <TabsTrigger
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data=[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground "
                value="recording"
              >
                <FileVideoIcon />
                Recording
              </TabsTrigger>
              <TabsTrigger
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data=[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground "
                value="chat"
              >
                <SparklesIcon />
                Ask AI
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <TabsContent value="recording">
          <div className="bg-white rounded-lg border p-4">
            <video
              src={data.recordingUrl!}
              className="w-full rounded-lg"
              controls
            />
          </div>
        </TabsContent>
        <TabsContent value="summary">
          <div className="bg-white rounded-lg border p-4">
            <div className=" flex flex-col gap-y-5 col-span-5 ">
              <h2 className="text-2xl font-medium capitalize">{data.name}</h2>
              <div className="flex gap-x-2 items-center">
                <Link
                  href={`agents/${data.agent.id}`}
                  className="flex items-center gap-x-2 underline underline-offset-4 capitalize "
                >
                  <GeneratedAvatar
                    variant="bottsNeutral"
                    seed={data.agent.name}
                    className="size-5"
                  />
                  {data.agent.name}
                </Link>{" "}
                <p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>
              </div>
              <div className="flex gap-x-2 items-center">
                <SparklesIcon className="size-4" />
                <p>General summary</p>
              </div>
              <Badge
                variant="outline"
                className="flex items-center gap-x-2 [&>svg]:size-4 "
              >
                <ClockFadingIcon className="text-blue-700  " />
                {data.duration ? formatDuration(data.duration) : "No duration"}
              </Badge>
              <div>
                <Markdown
                  components={{
                    h1: (props) => (
                      <h1 className="text-2xl font-medium mb-6 " {...props} />
                    ),
                    h2: (props) => (
                      <h2 className="text-xl font-medium mb-6 " {...props} />
                    ),
                    h3: (props) => (
                      <h3 className="text-lg font-medium mb-6 " {...props} />
                    ),
                    h4: (props) => (
                      <h4 className="text-base font-medium mb-6 " {...props} />
                    ),
                    p: (props) => (
                      <p className="leading-relaxed mb-6 " {...props} />
                    ),
                    ul: (props) => (
                      <ul className="list-disc list-inside  " {...props} />
                    ),
                    ol: (props) => (
                      <ol
                        className="list-decimal list-inside mb-6 "
                        {...props}
                      />
                    ),
                    li: (props) => <li className="mb-2" {...props} />,
                    strong: (props) => (
                      <strong className="font-semibold " {...props} />
                    ),
                    code: (props) => (
                      <code
                        className="bg-gray-100 px-1 py-0.5 rounded "
                        {...props}
                      />
                    ),
                    blockquote: (props) => (
                      <blockquote
                        className="border-l-4 pl-4 italic my-4 "
                        {...props}
                      />
                    ),
                  }}
                >
                  {data.summary}
                </Markdown>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="transcript">
          <Transcript meetingId={data.id} />
        </TabsContent>
        <TabsContent value="chat">
          <ChatProvider meetingId={data.id} meetingName={data.name} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
