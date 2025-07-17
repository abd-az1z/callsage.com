import { auth } from "@/lib/auth";
import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const sessions = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!sessions) {
    redirect("/");
  }

  return <SignUpView />;
};
export default page;
