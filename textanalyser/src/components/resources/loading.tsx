// REACT
import React from "react";

// MUI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";

export default function Loader() {
  return (
    <div>
      <Container
        sx={{
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Box sx={{ overflow: "hidden" }}>
          <Box sx={{ pt: 0.5 }}>
            <Skeleton />
            <Skeleton width={"70%"} />
            <Skeleton width={"60%"} />
            <Skeleton width={"20%"} />
            <Skeleton />
            <Skeleton />
            <Skeleton width={"70%"} />
            <Skeleton width={"60%"} />
            <Skeleton width={"20%"} />
            <Skeleton />
            <Skeleton />
            <Skeleton width={"70%"} />
            <Skeleton width={"60%"} />
            <Skeleton width={"20%"} />
            <Skeleton />
          </Box>
        </Box>
      </Container>
    </div>
  );
}
