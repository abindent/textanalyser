"use client";

import * as React from "react";

//MUI
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

// MARKDOWN
import { MuiMarkdown, getOverrides } from "mui-markdown";
import { Highlight, themes } from "prism-react-renderer";

// APPWRITE
import { Client, Databases, Query } from "appwrite";

// CUSTOM ELEMENTS
import BlogSkeleton from "./skeleton";
import { convertToDynamicLocalTime } from "@/utils/convertTime";
import { stringToColor } from "@/utils/stringtocolor";

function BlogPost(slug: any) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [_error, setError] = React.useState<string>("");
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
        const document = response.documents[0];
        setBlog(document);
        setLoading(false);
      },
      function (error: Error) {
        setLoading(false);
        setError(`${error.name}: ${error.message}`);
      }
    );
  }

  React.useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    getDocument(slug.slug);
  }, []);

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
            Couldn't find any blog at requested url {"\u00A0"}
            <Typography variant="kbd">{`/blog/${slug.slug}`}</Typography>
          </Typography>
        )}
        {_error.length > 0 && (
          <Typography
            variant="subtitle1"
            justifyContent={"center"}
            textAlign={"center"}
            display={"inline-flex"}
          >
            <div>
              <b>Error Occured:</b>
              <br />
              <pre>{_error}</pre>
            </div>
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
              <Typography variant="body2">
                <b>Written By:</b>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  mt: 1,
                  p: 1,
                }}
              >
                {blog.authors?.map((name: string, index: number) => {
                  const color = stringToColor(name);
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 1,
                        borderRadius: "8px",
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          fontSize: 14,
                          backgroundColor: color,
                          color: "#fff",
                        }}
                        aria-label={name}
                      >
                        {name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}{" "}
                      </Avatar>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.primary", fontWeight: 500 }}
                      >
                        {name}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
              <Divider />
            </Box>

            <MuiMarkdown
              Highlight={Highlight}
              themes={themes}
              prismTheme={themes.github}
              overrides={{
                ...getOverrides,
                a: {
                  props: {
                    style: { textDecoration: "none" },
                  },
                },
              }}
            >
              {blog.content}
            </MuiMarkdown>
          </div>
        )}
        <Divider />
      </Container>
    </div>
  );
}

export default BlogPost;
