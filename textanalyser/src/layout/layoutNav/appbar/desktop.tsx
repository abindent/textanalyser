// NEXT JS IMPORTS
import Link from "next/link";
import Image from "next/image";

// MUI COMPONENTS
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// COMPONENT
import MenuButton, { type MenuListType } from "@/utils/menubutton";
import ThemeModeToggler from "./theme";
import Search from "./searchbar";

// ICON
import {
  BiotechIcon,
  CallIcon,
  EditIcon,
  HomeIcon,
  PersonIcon,
  RssFeedIcon,
} from "@/icon";

// NAVBAR
export default function DeskTopVersion() {
  // MENU LIST
  const menuList: MenuListType = {
    analyser: {
      label: "Analyse Text",
      icon: <BiotechIcon />,
      link: "/tools/analyser",
    },
    styler: {
      label: "Style Text",
      icon: <EditIcon />,
      link: "/tools/styler",
    },
  };
  return (
    <AppBar
      sx={{
        display: "block",
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        borderBottomRightRadius: "2rem",
        borderBottomLeftRadius: "2rem",
        mt: 2,
      }}
      position="fixed"
      color="transparent"
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            borderRadius: "999px",
            bgcolor:
              theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.4)"
                : "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(24px)",
            maxHeight: 40,
            border: "1px solid",
            borderColor: "divider",
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
          })}
        >
          {/* ---- DESKTOP MODE ---- */}

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={[
              (theme) => ({
                mr: 1,
                display: { xs: "none", md: "inline-flex" },
                fontFamily: "sans-serif",
                fontWeight: 700,
                color: "black",
                ...theme.applyStyles("dark", {
                  color: "white",
                }),
                textDecoration: "none",
                cursor: "pointer",
              }),
            ]}
          >
            <Image src="/icon.png" width={32} height={32} alt="TextAnalyser" />
            TextAnalyser
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link href="/">
              <Button
                size="small"
                key={"home"}
                variant="contained"
                sx={{
                  color: "white",
                  display: "inline-flex",
                  fontWeight: 600,
                  mx: 2,
                }}
              >
                <HomeIcon sx={{ fontSize: "0.81rem" }} />{" "}
                <Typography
                  sx={{ mx: 1 }}
                  fontFamily={"sans-serif"}
                  fontSize={"0.79rem"}
                  fontWeight={600}
                  textAlign="center"
                >
                  Home
                </Typography>
              </Button>
            </Link>

            <Link href="/about">
              <Button
                size="small"
                key={"about"}
                variant="contained"
                sx={{
                  color: "white",
                  display: "inline-flex",
                  fontWeight: 600,
                  mx: 2,
                }}
              >
                <PersonIcon sx={{ fontSize: "0.81rem" }} />{" "}
                <Typography
                  sx={{ mx: 1 }}
                  fontFamily={"sans-serif"}
                  fontSize={"0.79rem"}
                  fontWeight={600}
                  textAlign="center"
                >
                  About
                </Typography>
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                size="small"
                key={"blog"}
                variant="contained"
                sx={{
                  color: "white",
                  display: "inline-flex",
                  fontWeight: 600,
                  mx: 2,
                }}
              >
                <RssFeedIcon sx={{ fontSize: "0.81rem" }} />{" "}
                <Typography
                  sx={{ mx: 1 }}
                  fontFamily={"sans-serif"}
                  fontSize={"0.79rem"}
                  fontWeight={600}
                  textAlign="center"
                >
                  Blog
                </Typography>
              </Button>
            </Link>
            <Link href="https://github.com/abindent/textanalyser/issues/new?template=Blank+issue" target="_blank">
              <Button
                size="small"
                key={"contact"}
                variant="contained"
                sx={{
                  color: "white",
                  display: "inline-flex",
                  fontWeight: 600,
                  mx: 2,
                }}
              >
                <CallIcon sx={{ fontSize: "0.81rem" }} />{" "}
                <Typography
                  sx={{ mx: 1 }}
                  fontFamily={"sans-serif"}
                  fontSize={"0.79rem"}
                  fontWeight={600}
                  textAlign="center"
                >
                  Contact
                </Typography>
              </Button>
            </Link>

            <MenuButton name={"Tools"} startIcon={<BiotechIcon/>} list={menuList} />
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <ThemeModeToggler />
          </Box>

          <Search />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
