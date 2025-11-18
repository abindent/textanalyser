import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function BSkeleton() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Box sx={{ pt: 0.5 }}>
        <Skeleton />
        <Skeleton  />
      </Box>
    </Box>
  );
}
