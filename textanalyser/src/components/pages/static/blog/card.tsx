import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BlogCard({
  title,
  metadescription,
  created_at,
  author,
  slug,
}: Readonly<{
  title: any;
  metadescription: any;
  created_at: any;
  author: any;
  slug: any;
}>) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">
          <b>Author</b>: {author}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "text.secondary", mb: 1.5 }}
        >
          <b>Created At</b>: {created_at}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "text.secondary", mb: 1.5 }}
        >
          {metadescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" href={`/blog/${slug}`}>
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}
