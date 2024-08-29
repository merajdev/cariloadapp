// src/components/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Provider store={store}>
        {pathname !== "/owner-dashboard" && <Navbar />}
        {children}
      </Provider>
    </>
  );
}
