import BlogPost from "@/components/pages/blog/blog";
import type { ComponentType } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const BlogPostComponent = BlogPost as unknown as ComponentType<{ slug: string }>;
  return <BlogPostComponent slug={slug} />;
}