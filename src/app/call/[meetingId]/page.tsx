import { auth } from "@/lib/auth";
import { CallView } from "@/modules/call/ui/views/CallView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// interface PageProps {
//   params: { meetingId: string };
//   searchParams?: { [key: string]: string | string[] | undefined };
// }

// export default async function Page({ params }: PageProps) {
  type RouteParams = { meetingId: string };

  export default async function Page({
    params,
  }: {
    params: Promise<RouteParams>;
  }) {
  const { meetingId } = await params;

  const headersList = headers();
  const session = await auth.api.getSession({
    headers: new Headers(headersList as unknown as HeadersInit),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CallView meetingId={meetingId} />
    </HydrationBoundary>
  );
}



// import { auth } from "@/lib/auth";
// import { CallView } from "@/modules/call/ui/views/CallView";
// import { getQueryClient, trpc } from "@/trpc/server";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";


// interface Props {
//   params: {
//     meetingId: string;
//   };
// }


// const Page = async ({ params }: Props) => {
//   const { meetingId } = params;

//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   if (!session) {
//     redirect("/sign-in");
//   }

//   const queryClient = getQueryClient();
//   void queryClient.prefetchQuery(
//     trpc.meetings.getOne.queryOptions({
//       id: meetingId
//     })
//   );

//   return (
//     <HydrationBoundary  state={dehydrate(queryClient)}>
//       <CallView meetingId={meetingId} />
//     </HydrationBoundary>
//   );
// };

// export default Page;
