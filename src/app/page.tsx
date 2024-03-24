"use client";
import Login from "@/components/login";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <SessionProvider>
      <Login />
    </SessionProvider>
  );
}
