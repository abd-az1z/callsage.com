import { auth } from "@/lib/auth";
import { CallView } from "@/modules/call/ui/views/CallView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type CallRouteParams = { params: { meetingId: string } };

export default async function Page({ params }: CallRouteParams) {
  const { meetingId } = params;

  const session = await auth.api.getSession({
    headers: headers(),
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
