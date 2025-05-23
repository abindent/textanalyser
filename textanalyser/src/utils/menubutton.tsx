"use client";

// REACT AND NEXTJS
import * as React from "react";
import Link from "next/link";

// MUI
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// ICONS
import { KeyboardArrowDownIcon } from "@/icon";

// Type
type MenuItemType = {
  label: string;
  icon: React.ReactNode;
  link: string;
};

export type MenuListType = Record<string, MenuItemType>;

// MENU
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

// MENUBUTTON
export default function MenuButton({
  name,
  startIcon,
  list,
}: Readonly<{ name: string; startIcon?: React.ReactNode; list: MenuListType }>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="navtoolsmenubtn"
        variant="contained"
        size="small"
        sx={{
          color: "white",
          display: "inline-flex",
          fontWeight: 600,
          mx: 2,
        }}
        aria-controls={open ? "navtoolsmenu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        onClick={handleClick}
        startIcon={startIcon}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {name}
      </Button>
      <StyledMenu
        id="navtoolsmenu"
        MenuListProps={{
          "aria-labelledby": "NAV Tools",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {Object.keys(list).map((key) => {
          const { label, link, icon } = list[key];
          return (
            <Link href={link} key={`${link}-${label}`}>
              <MenuItem onClick={handleClose} disableRipple>
                {icon}
                {label}
              </MenuItem>
            </Link>
          );
        })}
      </StyledMenu>
    </div>
  );
}
