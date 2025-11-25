"use client";

import * as React from "react";
import { Client, TablesDB, Query } from "appwrite";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface BlogDocument {
    $id: string;
    title: string;
    poster_img_url?: string;
    metadescription: string;
    created_at: string;
    slug: string;
    authors?: string[];
    is_published: boolean;
}

/**
 * FadeInSection: Component that applies fade-in animation on scroll
 */
function FadeInSection({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) {
    const ref = React.useRef<HTMLDivElement>(null);
    const [isVisible, setVisible] = React.useState(false);

    React.useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                    ? "translateY(0px) scale(1)"
                    : "translateY(30px) scale(0.98)",
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1)`,
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

export default function BlogPosts() {
    const [blogs, setBlogs] = React.useState<BlogDocument[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");

    const getDocuments = async () => {
        try {
            const client = new Client()
                .setEndpoint("https://fra.cloud.appwrite.io/v1")
                .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)

            const databases = new TablesDB(client);

            const response = await databases.listRows({
                databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
                tableId: "6791ed5f0031bbd7569c",
                queries: [
                    Query.equal("is_published", true),
                    Query.orderDesc("$createdAt"),
                ],
            });

            return response.rows;
        } catch (error) {
            console.error("Appwrite Error:", error);
            throw new Error("Failed to fetch blogs");
        }
    };

    // Then in your useEffect:
    React.useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const documents = await getDocuments();
                console.log(documents)
                setBlogs(documents as unknown as BlogDocument[]);
            } catch (error: any) {
                setError(error.message || "Failed to load blogs");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-300 dark:bg-sky-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                <div
                    className="absolute -bottom-32 right-40 w-96 h-96 bg-blue-300 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
                    style={{ animationDelay: "2s" }}
                />
            </div>

            <div className="relative z-10 py-12 px-4 sm:px-6 max-w-6xl mx-auto">
                <FadeInSection>
                    {/* Header */}
                    <div className="text-center mb-12">
                        <Badge className="inline-block mb-4" variant="secondary">
                            📚 Blog & Articles
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-200 bg-clip-text text-transparent">
                            Latest Articles
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            Explore insights, tutorials, and updates about TextAnalyser and text processing techniques.
                        </p>
                    </div>
                </FadeInSection>

                {/* Loading state */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Card key={i} className="overflow-hidden">
                                <Skeleton className="w-full h-48" />
                                <CardHeader>
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-1/2" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-2/3" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <FadeInSection>
                        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-200">
                            {error}
                        </div>
                    </FadeInSection>
                )}

                {/* Empty state */}
                {!loading && !error && blogs.length === 0 && (
                    <FadeInSection>
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No published blogs yet.</p>
                        </div>
                    </FadeInSection>
                )}

                {/* Blog Grid */}
                {!loading && !error && blogs.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog, idx) => (
                            <FadeInSection key={blog.$id} delay={idx * 100}>
                                <Card className="overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
                                    {/* Image */}
                                    <div className="relative w-full h-48 bg-linear-to-br from-sky-100 to-blue-100 dark:from-slate-800 dark:to-slate-900">
                                        {blog.poster_img_url ? (
                                            <Image
                                                src={blog.poster_img_url}
                                                alt={blog.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-blue-400">
                                                {blog.title[0]?.toUpperCase()}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <CardHeader>
                                        <h3 className="text-xl font-semibold leading-tight line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {new Date(blog.created_at).toLocaleDateString("en-IN", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </CardHeader>

                                    <CardContent className="grow">
                                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                                            {blog.metadescription}
                                        </p>
                                        {blog.authors && blog.authors.length > 0 && (
                                            <div className="mt-3 flex gap-1 flex-wrap">
                                                {blog.authors.map((author, i) => (
                                                    <Badge key={i} variant="outline" className="text-xs">
                                                        {author}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>

                                    {/* Footer */}
                                    <CardFooter className="pt-0">
                                        <Link href={`/blog/${blog.slug}`} className="w-full">
                                            <Button className="w-full" variant="default">
                                                Read Article
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </FadeInSection>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}