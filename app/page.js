"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";

export default function Page() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    (isAuthenticated)
    ? router.replace("/dashboard")
    : router.replace("/login")
  }, [isAuthenticated, router]);
  return <Loading />;
}
