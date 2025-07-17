import { auth } from "@/lib/auth";
import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const sessions = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!sessions) {
    redirect("/");
  }

  return <SignInView />;
};
export default page;
