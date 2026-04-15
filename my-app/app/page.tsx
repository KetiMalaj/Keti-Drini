"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "./auth/login/page";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/login");
  }, []);

  return <Login />;
}