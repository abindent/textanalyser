"use client";

// REACT
import * as React from "react";

// MUI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

// APPWRITE
import { getDocuments } from "@/lib/appwrite";
import BlogCard from "./card";
import { Typography } from "@mui/material";

const BlogPosts = () => {
  // BLOGS
  const [blogs, setBlogs] = React.useState<any>([]);

  getDocuments(setBlogs);

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
            sx={{
              mb: { xs: 2, sm: 5 },
            }}
          >
            Blogs
          </Typography>
          <Stack direction={"column"}>
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
