"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { MessageCircle } from "lucide-react";

// UTILS
import { fetchBlog } from "@/lib/blog/fetch";
import Comments from "./comments";

interface BlogDocument {
    $id: string;
    title: string;
    content: string;
    poster_img_url?: string;
    created_at: string;
    authors?: string[];
    slug: string;
}

function stringToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 60%, 60%)`;
}

export default function BlogPost() {
    const params = useParams();
    const slug = params?.slug as string;
    const [blog, setBlog] = React.useState<BlogDocument | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        if (!slug) return;

        fetchBlog(slug).then((response) => {
            if (response.rows.length > 0) {
                setBlog(response.rows[0] as unknown as BlogDocument);
            }
            setLoading(false);
        })
            .catch((e) => {
                setError(e.message || "Failed to load this blog.");
                setLoading(false);
            });
    }, [slug]);

    // Sanitize HTML content - remove div tags but keep content
    const sanitizeContent = (content: string): string => {
        return content
            .replace(/<div[^>]*id="[^"]*"[^>]*>/g, "")
            .replace(/<div[^>]*class="[^"]*"[^>]*>/g, "")
            .replace(/<div[^>]*>/g, "")
            .replace(/<\/div>/g, "")
            .trim();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <div className="max-w-3xl mx-auto px-4 py-10">
                    <Card className="p-6 md:p-10">
                        <Skeleton className="w-full h-96 mb-6" />
                        <Skeleton className="h-10 w-3/4 mb-4" />
                        <Skeleton className="h-6 w-1/2 mb-6" />
                        <div className="space-y-3">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <Skeleton key={i} className="h-4 w-full" />
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <Link href="/blog">
                        <Button>Back to Blogs</Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                        Could not find blog at{" "}
                        <Badge variant="secondary">{`/blog/${slug}`}</Badge>
                    </p>
                    <Link href="/blog">
                        <Button>Back to Blogs</Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Comments configuration
    const DISQUS_APP_ID = "textanalyser";

    const pageId = blog.$id;
    const pageTitle = blog.title;
    const pageUrl = typeof window !== "undefined" ? window.location.href : "";


    return (
        <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500 py-10 px-4">
            {/* Animated background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-300 dark:bg-sky-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                <div
                    className="absolute -bottom-32 right-40 w-96 h-96 bg-blue-300 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
                    style={{ animationDelay: "2s" }}
                />
            </div>

            <Card className="max-w-6xl mx-auto relative z-10">
                <Link href="/blog" className="inline-flex items-center gap-2 mb-6">
                    <Button variant="ghost" size="sm">
                        ← Back to Blogs
                    </Button>
                </Link>

                <div className="overflow-hidden w-full max-w-screen">
                    {/* Hero Image */}
                    {blog.poster_img_url && (
                        <div
                            className="relative w-full bg-linear-to-b from-sky-100 to-sky-50 dark:from-slate-800 dark:to-slate-900"
                            style={{ aspectRatio: "16/9" }}
                        >
                            <Image
                                src={blog.poster_img_url}
                                alt={blog.title}
                                fill
                                className="object-contain"
                                priority
                                sizes="(max-width: 368px) 50vw, 400px"
                            />
                        </div>
                    )}

                    <div className="p-6 md:p-10">
                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-slate-900 dark:text-white">
                            {blog.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-200 dark:border-slate-700 mb-6">
                            <div className="flex flex-col gap-2">
                                <Badge variant="outline">
                                    📅{" "}
                                    {new Date(blog.created_at).toLocaleDateString("en-IN", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </Badge>                       
                            </div>

                            {/* Authors */}
                            {blog.authors && blog.authors.length > 0 && (
                                <div className="flex gap-3 items-center flex-wrap">
                                    {blog.authors.map((author, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <Avatar className="w-8 h-8">
                                                <AvatarFallback
                                                    style={{
                                                        background: stringToColor(author),
                                                        color: "white",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {author
                                                        .split(" ")
                                                        .map((word) => word[0])
                                                        .join("")
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium">{author}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Markdown Content */}
                        <div className="prose prose-sky dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-sky-600 dark:prose-a:text-sky-400 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-pre:bg-slate-900 prose-img:rounded-lg prose-img:shadow-lg">
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                                components={{
                                    h1: ({ node, ...props }) => (
                                        <h1
                                            className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 mt-6"
                                            {...props}
                                        />
                                    ),
                                    h2: ({ node, ...props }) => (
                                        <h2
                                            className="scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors mb-3 mt-5 pb-2"
                                            {...props}
                                        />
                                    ),
                                    h3: ({ node, ...props }) => (
                                        <h3
                                            className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2 mt-4"
                                            {...props}
                                        />
                                    ),
                                    h4: ({ node, ...props }) => (
                                        <h4
                                            className="scroll-m-20 text-xl font-semibold tracking-tight mb-2 mt-3"
                                            {...props}
                                        />
                                    ),
                                    p: ({ node, ...props }) => (
                                        <p className="leading-7 not-first:mt-6" {...props} />
                                    ),
                                    ul: ({ node, ...props }) => (
                                        <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
                                    ),
                                    ol: ({ node, ...props }) => (
                                        <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
                                    ),
                                    li: ({ node, ...props }) => (
                                        <li className="leading-7" {...props} />
                                    ),
                                    blockquote: ({ node, ...props }) => (
                                        <blockquote
                                            className="mt-6 border-l-2 border-sky-500 pl-6 italic text-slate-600 dark:text-slate-400"
                                            {...props}
                                        />
                                    ),
                                    code: ({ node, inline, ...props }: any) =>
                                        inline ? (
                                            <code
                                                className="relative rounded bg-slate-100 dark:bg-slate-800 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
                                                {...props}
                                            />
                                        ) : (
                                            <code {...props} />
                                        ),
                                    pre: ({ node, ...props }) => (
                                        <pre
                                            className="mb-4 mt-6 overflow-x-auto rounded-lg bg-slate-900 p-4"
                                            {...props}
                                        />
                                    ),
                                    img: ({ node, ...props }) => (
                                        <img
                                            className="rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg"
                                            {...props}
                                        />
                                    ),
                                    table: ({ node, ...props }) => (
                                        <div className="my-6 w-full overflow-y-auto">
                                            <table
                                                className="w-full border-collapse border border-slate-300 dark:border-slate-600"
                                                {...props}
                                            />
                                        </div>
                                    ),
                                    tr: ({ node, ...props }) => (
                                        <tr
                                            className="border border-slate-300 dark:border-slate-600 even:bg-slate-50 dark:even:bg-slate-800"
                                            {...props}
                                        />
                                    ),
                                    td: ({ node, ...props }) => (
                                        <td
                                            className="border border-slate-300 dark:border-slate-600 px-4 py-2"
                                            {...props}
                                        />
                                    ),
                                    th: ({ node, ...props }) => (
                                        <th
                                            className="border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 px-4 py-2 font-bold"
                                            {...props}
                                        />
                                    ),
                                    div: ({ node, children, ...props }) => (
                                        <section
                                            className="my-8 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                                            {...props}
                                        >
                                            {children}
                                        </section>
                                    ),
                                    hr: ({ node, ...props }) => (
                                        <hr
                                            className="my-6 border-slate-300 dark:border-slate-600"
                                            {...props}
                                        />
                                    ),
                                }}
                            >
                                {sanitizeContent(blog.content)}
                            </ReactMarkdown>
                        </div>

                        {/* Comments Section Divider */}
                        <div className="mt-12 mb-8">
                            <div className="flex items-center gap-3">
                                <MessageCircle className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    Comments
                                </h2>
                            </div>
                            <div className="mt-2 h-1 w-20 bg-linear-to-r from-sky-500 to-blue-500 rounded-full" />
                        </div>
                        {/* Cusdis Comments */}
                        <Comments
                            shortname={DISQUS_APP_ID}
                            identifier={pageId}
                            title={pageTitle}
                            url={pageUrl}
                        />
                    </div>
                </div>
            </Card >
        </div >

    );
}
