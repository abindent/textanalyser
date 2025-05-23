"use client";
import React from "react";

// MUI
import Container from "@mui/material/Container";

// PRISMWRAPPER
import PRISMLoader from "@/utils/prismwrapper";
import Typography from "@mui/material/Typography";

const Showcase = () => {
  return (
    <div>
      <Container
        sx={(theme) => ({
          width: "100%",
          height: "100%",
          marginTop: theme.spacing(12),
          backgroundImage:
            theme.palette.mode === "light"
              ? "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)"
              : "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
          backgroundSize: "100% 20%",
          backgroundRepeat: "no-repeat",
          borderRadius: theme.shape.borderRadius,
          transition: "all 0.3s ease-in-out",
        })}
      >
        <Typography variant="h2" align="center" justifyContent={"center"}>
          Analyser
        </Typography>
        <PRISMLoader>
        <Typography variant="h4">Analyser</Typography>
          <pre
            className="line-numbers"
            data-src="/showcase/scripts/analyser.ts"
          ></pre>
          <br />
        <Typography variant="h4">Extension</Typography>
          <pre
            className="line-numbers"
            data-src="/showcase/scripts/extensions.ts"
          ></pre>
          <br />
          <Typography variant="h2" align="center" justifyContent={"center"}>
            Styler
          </Typography>
          <Typography variant="h4">Lunicode</Typography>
          <pre
            className="line-numbers"
            data-src="/showcase/scripts/styler/lunicode.ts"
          ></pre>
          <Typography variant="h4">Fancy Font Generator</Typography>
          <pre
            className="line-numbers"
            data-src="/showcase/scripts/styler/styler.ts"
          ></pre>
          <br />
        </PRISMLoader>
      </Container>
    </div>
  );
};

export default Showcase;
