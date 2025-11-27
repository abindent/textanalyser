import type { Metadata } from "next";
import BlogPosts from "@/components/pages/blog";

// METADATA
export const metadata: Metadata = {
  title: "Blogs | TextAnalyser",
  description:
    "Quickly design, analyze, and customize your text with our powerful and user-friendly tool. Enjoy features like advanced text editing, styling, and designing, all for free! Experience text design akin to Microsoft Word and more.",
  keywords:
    "text analyzer blog, text editor, text designer, free text editing tool, customize text, text styling, text design tool, powerful editor",
  verification: {
    google: "RxEp4MDwAJu9fHlP-U2MIdzjSqTIi7eCyyF7kj8oAnc",
  },
};

export default function Page() {
  return <BlogPosts />;
}