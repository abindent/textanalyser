import BlogPost
 from "@/components/pages/static/blog/blogpost";
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return <BlogPost slug={slug} />;
}
