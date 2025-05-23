// REACT
import * as React from "react";

// MUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// CUSTOM
import { convertToDynamicLocalTime } from "@/utils/convertTime";
import { stringToColor } from "@/utils/stringtocolor";

export default function BlogCard({
  title,
  poster_img_url,
  metadescription,
  created_at,
  slug,
}: Readonly<{
  title: any;
  poster_img_url: any;
  metadescription: any;
  created_at: any;
  author: any;
  slug: any;
}>) {
  const [timeZone, setTimezone] = React.useState<any>();
  const color = stringToColor(title);
  React.useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  });

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" sx={{ backgroundColor: color }}>
            {title.charAt(0)}
          </Avatar>
        }
        title={title}
        subheader={convertToDynamicLocalTime(created_at, timeZone)}
      />
      <CardMedia
        component="img"
        height="194"
        image={poster_img_url ? poster_img_url : "/resources/placeholder.jpg"}
        alt="poster_img"
      />
      <CardContent>
        <Typography variant="body2" component="div">
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
