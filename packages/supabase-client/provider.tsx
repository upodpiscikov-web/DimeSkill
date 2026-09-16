import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { Session, SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@athlete/types"
import { createSupabaseClient } from "./client"

type SupabaseContextValue = {
  supabase: SupabaseClient<Database>
  session: Session | null
  isLoading: boolean
}

const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined)

export function SupabaseProvider({
  url,
  anonKey,
  children,
}: {
  url: string | undefined
  anonKey: string | undefined
  children: React.ReactNode
}) {
  const supabase = useMemo(() => createSupabaseClient(url, anonKey), [url, anonKey])
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setIsLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [supabase])

  const value = useMemo(() => ({ supabase, session, isLoading }), [supabase, session, isLoading])

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>
}

function useSupabaseContext(): SupabaseContextValue {
  const ctx = useContext(SupabaseContext)
  if (!ctx) throw new Error("This hook must be used within a <SupabaseProvider>")
  return ctx
}

export function useSupabase(): SupabaseClient<Database> {
  return useSupabaseContext().supabase
}

export function useSession(): { session: Session | null; isLoading: boolean } {
  const { session, isLoading } = useSupabaseContext()
  return { session, isLoading }
}
