// REACT ESSENTAILS
import { useState } from "react";

// NEXT JS IMPORTS
import { useRouter } from "next/navigation";
import Image from "next/image";

// COMPONENTS
import ThemeModeToggler from "./theme";

// MUI
import {
  alpha,
  styled,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

// COMPONENTS
import MenuButton, { type MenuListType } from "@/utils/menubutton";
import Search from "./searchbar";

// ICON
import {
  BiotechIcon,
  CallIcon,
  CloseIcon,
  EditIcon,
  HomeIcon,
  MenuIcon,
  PersonIcon,
} from "@/icon";

// APPBAR
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// NAVBAR
export default function MobileVersion() {
  // ROUTER
  const router = useRouter();
  // MUI THEME
  const theme = useTheme();

  // COMPONENT CUSTOM STYLE
  const drawerWidth = 240;
  const isHideable = useMediaQuery(theme.breakpoints.up(376));
  const imgWidth = isHideable ? 30 : 40;
  const imgHeight = isHideable ? 30 : 40;

  // MENULIST
  const menuList: MenuListType = {
    analyser: {
      label: "Analyse Text",
      icon: <BiotechIcon />,
      link: "/analyser",
    },
    styler: {
      label: "Style Text",
      icon: <EditIcon />,
      link: "/styler",
    },
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  }));

  // DRAWER TOGGLE
  const [open, setOpen] = useState(false);

  function handleDrawerToggle(): void {
    setOpen(!open);
  }

  return (
    <Box
      sx={{
        display: "flex",
        mt: 3,
      }}
    >
      <CssBaseline />
      <AppBar
        position="static"
        open={open}
        color="default"
        sx={(theme) => ({
          display: "flex",
          top: 40,
          borderTopLeftRadius: "2rem",
          borderTopRightRadius: "2rem",
          borderBottomRightRadius: "2rem",
          borderBottomLeftRadius: "2rem",
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "linear-gradient(180deg, #CEE5FD, #FFF)",
          ...theme.applyStyles("dark", {
            backgroundImage: `linear-gradient(#02294F, ${alpha(
              "#090E10",
              0.0
            )})`,
          }),
        })}
      >
        <Container maxWidth="xs">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Image
              src="/icon.png"
              alt="TextAnalyser"
              width={imgWidth}
              height={imgHeight}
              onClick={() => {
                router.push("/");
              }}
            />
            <Typography variant="h1">TextAnalyser</Typography>
            <Box>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                {!open && <MenuIcon />}
              </Button>
            </Box>
          </Toolbar>
        </Container>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 1,
            backgroundColor: "background.paper",
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <Box
            sx={{
              backgroundColor: "background.paper",
              flexGrow: 1,
            }}
          >
            <DrawerHeader>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ThemeModeToggler />
              </Box>
              <IconButton onClick={handleDrawerToggle}>
                <CloseIcon />
              </IconButton>
            </DrawerHeader>
            <Divider />

            <MenuItem
              onClick={() => {
                router.push("/");
              }}
            >
              <HomeIcon fontSize="small" /> Home
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push("/about");
              }}
            >
              <PersonIcon fontSize="small" /> About
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push("/contact");
              }}
            >
              <CallIcon fontSize="small" /> Contact
            </MenuItem>
            <Divider />
            <MenuButton name={"Tools"} list={menuList} />
            <MenuItem>
              <Search />
            </MenuItem>
          </Box>
        </Drawer>
      </AppBar>
    </Box>
  );
}
