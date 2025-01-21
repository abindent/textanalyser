// REACT AND NEXTJS
import * as React from "react";

// MUI
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// ICON
import { CodeIcon, KeyboardArrowRightIcon } from "@/icon";

export default function Intro() {
  const StyledBox = styled("div")(({ theme }) => ({
    alignSelf: "center",
    width: "100%",
    height: 400,
    marginTop: theme.spacing(8),
    borderRadius: "10px",
    outline: "6px solid",
    outlineColor: "hsla(220, 25%, 80%, 0.2)",
    border: "1px solid",
    borderColor: theme.palette.grey[200],
    boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
    backgroundImage: `url(./resources/light/txt-analyser.png)`,
    backgroundSize: "cover",
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10),
      height: 700,
    },
    ...theme.applyStyles("dark", {
      boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
      backgroundImage: `url(./resources/dark/txt-analyser.png)`,
      outlineColor: "hsla(220, 20%, 42%, 0.1)",
      borderColor: theme.palette.grey[700],
    }),
  }));

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: { xs: 14, sm: 20 },
        pb: { xs: 8, sm: 12 },
      }}
    >
      <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
        <Typography
          variant="h1"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignSelf: "center",
            textAlign: "center",
            fontSize: "clamp(2rem, 7.5vw, 2.5rem)!important",
            fontWeight: "500",
          }}
        >
          A new way to crazify your texts&nbsp;
          <Typography
            component="span"
            variant="h1"
            sx={(theme) => ({
              fontSize: "clamp(2rem, 7.35vw, 2.25rem)!important",
              color: "primary.light",
              ...theme.applyStyles("dark", {
                color: "primary.main",
              }),
            })}
          >
            - TextAnalyser
          </Typography>
        </Typography>
        <Typography
          textAlign="center"
          color="text.secondary"
          sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
        >
          Welcome to TextAnalyser! Step into a world where your words come
          alive. Refine, enhance, style, and design your text effortlessly with
          this powerful tool. Unleash your creativity, explore text analysis,
          and make every word count. TextAnalyzer – because your ideas deserve
          the spotlight they truly deserve.
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignSelf="center"
          spacing={1}
          useFlexGap
          sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
        >
          <Button
            variant="contained"
            color="primary"
            LinkComponent={"a"}
            href="/tools/analyser"
            startIcon={<KeyboardArrowRightIcon />}
          >
            Start now
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CodeIcon />}
            LinkComponent={"a"}
            href="https://github.com/abindent/textanalyser"
            target="_blank"
          >
            Get Code
          </Button>
        </Stack>
      </Stack>
      <StyledBox id="image" />
    </Container>
  );
}
