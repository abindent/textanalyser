"use client";

// REACT
import * as React from "react";

// MUI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// APPWRITE
import { Client, Databases, Query } from "appwrite";

// CUSTOM ELEMENTS
import BlogCard from "./card";
import BlogSkeleton from "./skeleton";

const BlogPosts = () => {
  // BLOGS
  const [loading, setLoading] = React.useState<boolean>(true);
  const [_error, setError] = React.useState<string>("");
  const [blogs, setBlogs] = React.useState<any>([]);

  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const databases = new Databases(client);

  function getDocuments() {
    const documents = databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      [Query.equal("is_published", true)]
    );
    documents.then(
      function (response) {
        setBlogs(response.documents);
        setLoading(false);
      },
      function (error: Error) {
        setLoading(false);
        setError(`${error.name}: ${error.message}`);
      }
    );
  }

  React.useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div>
      <Box
        id="blogposts"
        sx={(theme) => ({
          width: "100%",
          height: "100%",
          backgroundImage:
            theme.palette.mode === "light"
              ? "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)"
              : `radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)`,
          backgroundSize: "100% 20%",
          backgroundRepeat: "no-repeat",
        })}
      >
        <Container
          sx={{
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Typography
            variant="h3"
            textAlign={"center"}
            fontStyle={"revert-layer"}
            sx={{
              mb: { xs: 2, sm: 5 },
            }}
          >
            Blogs
          </Typography>
          <Stack direction={"column"}>
            {loading && <BlogSkeleton />}
            {loading === false && blogs.length < 1 && (
              <Typography variant="subtitle1" textAlign={"center"}>
                Couldn't find any blog.
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
                  <b>Error Occured:</b>&nbsp;&nbsp; <pre>{_error}</pre>
                </div>
              </Typography>
            )}
            {blogs.map((blog: any, index: any) => (
              <BlogCard {...blog} key={index} />
            ))}
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

export default BlogPosts;
