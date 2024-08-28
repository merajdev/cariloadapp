import { HeroSection } from "@/components/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="mx-auto md:w-10/12 px-4">
        <HeroSection />
      </div>
    </>
  );
}
