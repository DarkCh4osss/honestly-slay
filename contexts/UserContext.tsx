import { createContext, useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export const UserContext = createContext({});

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export function UserContextProvider({ children }: Props) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }
    supabase
      .from("profiles")
      .select()
      .eq("id", session.user.id)
      .then((result) => {
        setProfile(result.data?.[0] as any);
      });
  }, [session?.user?.id]);
  return (
    <UserContext.Provider value={{ profile }}>{children}</UserContext.Provider>
  );
}
