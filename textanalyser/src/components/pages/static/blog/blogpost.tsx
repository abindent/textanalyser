"use client";

import * as React from "react";

//MUI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

// MARKDOWN
import { MuiMarkdown } from "mui-markdown";
import { Highlight, themes } from "prism-react-renderer";

// APPWRITE
import { Client, Databases, Query } from "appwrite";

// CUSTOM ELEMENTS
import { convertToDynamicLocalTime } from "@/utils/convertTime";
import BlogSkeleton from "./skeleton";

function BlogPost(slug: any) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [timeZone, setTimezone] = React.useState<any>();
  const [blog, setBlog] = React.useState<any>();

  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const databases = new Databases(client);
  function getDocument(slug: string) {
    const document = databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      [Query.equal("slug", slug), Query.equal("is_published", true)]
    );

    document.then(
      function (response) {
        setBlog(response.documents[0]);
        setLoading(false);
      },
      function (error: Error) {
        throw Error(`${error.name}: ${error.message}`);
      }
    );
  }

  React.useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    getDocument(slug.slug);
  }, [blog]);

  return (
    <div>
      <Container
        sx={{
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        {loading && <BlogSkeleton />}
        {loading === false && !blog && (
          <Typography
            variant="subtitle1"
            sx={{
              color: "text.secondary",
              mb: 1.5,
              mt: 0.75,
              display: "flex",
            }}
          >
            Couldn't find any blogat requested url&nbsp;&nbsp;{" "}
            <Typography variant="kbd">{`/blog/${slug.slug}`}</Typography>
          </Typography>
        )}
        {blog && (
          <div>
            <Box marginBottom={"1.2rem"}>
              {" "}
              <Typography variant="h2" fontWeight={500}>
                {blog.title}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "text.secondary", mb: 1.5, mt: 0.75 }}
              >
                <b>Created At</b>:{" "}
                {convertToDynamicLocalTime(blog?.created_at, timeZone)}
              </Typography>
              <Typography variant="subtitle2" sx={{ display: "flex" }}>
                Posted By:&nbsp;&nbsp;
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  {blog.author}
                </Typography>
              </Typography>
              <Divider />
            </Box>

            <MuiMarkdown
              Highlight={Highlight}
              themes={themes}
              prismTheme={themes.github}
            >
              {blog.content}
            </MuiMarkdown>
          </div>
        )}
      </Container>
    </div>
  );
}

export default BlogPost;
