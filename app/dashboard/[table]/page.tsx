"use client";

import { useEffect, useState } from "react";
import CrudPage from "@/components/CrudPage";
import { getModule } from "@/lib/modules";
import { supabase } from "@/lib/supabase";

export default function ModulePage({ params }: { params: { table: string } }) {
  const config = getModule(params.table);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = "/login";
      else setUserId(data.user.id);
    });
  }, []);

  if (!config) return <p>Módulo não encontrado.</p>;
  if (!userId) return <p>Carregando...</p>;

  return <CrudPage config={config} userId={userId} />;
}
