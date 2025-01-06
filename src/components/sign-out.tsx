import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/dist/server/api-utils";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  );
}
