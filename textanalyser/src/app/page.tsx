import HomePage from "@/components/pages/home";
import type { Metadata } from "next";

export const metadata : Metadata ={
  title: "Home | TextAnalyser",
  description: "A destination to analyse crazify your texts.",
  verification:{
    google: "RxEp4MDwAJu9fHlP-U2MIdzjSqTIi7eCyyF7kj8oAnc"
  }
}

export default function Home() {
  return (
    <div><HomePage /></div>
  );
}