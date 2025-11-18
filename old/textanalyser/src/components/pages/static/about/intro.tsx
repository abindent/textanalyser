// REACT COMPONENTS
import React from "react";

// MUI COMPONENTS
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Intro() {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Box
          sx={{
            mb: 2,
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography fontWeight={600} component="h2" variant="h4">
            ABOUT
          </Typography>
        </Box>
        <Card
          sx={{
            width: { xs: "100%", sm: "55vw", md: "45vw" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: "20vw", backgroundSize: "contain" }}
            image="/icon.png"
            alt="Paella dish"
          />
          <CardContent>
            <Typography
              textAlign={"center"}
              variant="h4"
              color="text.secondary"
              gutterBottom
            >
              About Us
            </Typography>
            <Typography variant="h6">
              Welcome to the Powerful Text Analyzer, Editor, and Designer Tool!
            </Typography>
            <Typography variant="subtitle1" component="div">
              Our tool is a comprehensive solution for all your text editing and
              design needs. Whether you're crafting a professional document,
              styling creative content, or analyzing text for improvements,
              we’ve got you covered!
            </Typography>
            <Typography sx={{ mt: 1.5, mb: 1.5 }} color="text.secondary">
              Why Choose TextAnalyser ?
            </Typography>
            <Typography component={"span"} variant="body2">
              <b>1. Easy to Use:</b> Intuitive design for hassle-free text
              editing and designing.
            </Typography>
            <br />
            <Typography component={"span"} variant="body2">
              <b>2. Feature-Rich:</b> Packed with advanced features that rival
              many text analysing services.
            </Typography>
            <br />
            <Typography component={"span"} variant="body2">
              <b>3. Versatile Design Options:</b> Customize your text with
              fonts, colors, and layouts tailored to your style.
            </Typography>
            <br />
            <Typography component={"span"} variant="body2">
              <b>4. Completely Free:</b> Enjoy premium-quality text editing
              without spending a dime.
            </Typography>
            <br />
            <Typography
              sx={{ mt: 1.5, mb: 1.5 }}
              variant="caption"
              color="GrayText"
            >
              <Link
                href="https://github.com/abindent/textanalyser"
                target="_blank"
              >
                Join the Community Today!
              </Link>
              <br />{" "}
              <span>
                Experience the power of effortless text editing and design
                today! Let’s create something amazing together.. 🚀
              </span>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </React.Fragment>
  );
}
