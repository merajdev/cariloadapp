"use client";

import React, { useEffect, useState } from "react";
import { logout } from "@/redux/slice/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconCircle,
  IconSettings,
  IconUser,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

import userImage from "/public/images/Untitled design.jpg"
import coverImage from "/public/images/about-banner.svg"
import Image from "next/image";
import { log } from "console";
interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
}
// Define the type for the possible views
type View = "dashboard" | "profile" | "settings";

export function OwnerDashboard() {
  const [view, setView] = useState<View>("dashboard");
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-900 h-5 w-5 flex-shrink-0" />
      ),
      view: "dashboard" as View,
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-900 h-5 w-5 flex-shrink-0" />
      ),
      view: "profile" as View,
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-900 h-5 w-5 flex-shrink-0" />
      ),
      view: "settings" as View,
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-900 h-5 w-5 flex-shrink-0" />
      ),
      view: "logout" as View,
    },
  ];

  const renderView = () => {
    switch (view) {
      case "dashboard":
        return <Dashboard />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Setting />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div
      className={cn(
        "rounded-md text-neutral-900 flex flex-col md:flex-row bg-gray-100 flex-1 mx-auto border border-neutral-200 overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  onClick={() => setView(link.view)}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "User",
                href: "#",
                icon: (
                  <IconUser className="text-neutral-900 h-5 w-5 flex-shrink-0" />
                ),
              }}
              onClick={() => setView("profile")}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1">{renderView()}</div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-neutral-900 py-1 relative z-20"
    >
      <IconCircle className="text-neutral-900 h-5 w-5 flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-neutral-900  whitespace-pre"
      >
        CariLoad
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-neutral-900 py-1 relative z-20"
    >
      <IconCircle className="text-neutral-900 h-5 w-5 flex-shrink-0" />
    </Link>
  );
};

const Dashboard = () => {
const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);;
  const handelLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      dispatch(logout());
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  }
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    if (res.status === 200) {
      console.log(res.data);
      setUser(res.data.data);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, [])

  return (
    <div className="flex flex-1 flex-col">
      {/* Content Below Header */}

      <div className="border border-neutral-200 bg-white flex flex-col gap-2 flex-1 w-full h-full">

        <div className="relative w-full h-64">
          {/* Cover Image */}
          <Image
            src={coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          {/* User Image and Welcome Message */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg">
              <Image
                src={userImage}
                alt="User"
                className="w-16 rounded-full border-2 border-neutral-700"
              />
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  Welcome, {user ? user.firstname : "User"}!
                </h2>
                <p className="text-sm text-neutral-700">We&apos;re glad to see you.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 md:p-10">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <button
            onClick={handelLogout}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg" >
            Logout</button>
        </div>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 bg-white flex flex-col gap-2 flex-1 w-full h-full">
        <h1>Profile</h1>

      </div>
    </div>
  );
};

const Setting = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 bg-white flex flex-col gap-2 flex-1 w-full h-full">
        <h1>Setting</h1>

      </div>
    </div>
  );
};




