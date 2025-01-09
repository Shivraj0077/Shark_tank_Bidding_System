import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { RedirectType } from "next/navigation";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        redirect("/")
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
}
