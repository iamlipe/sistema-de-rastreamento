"use client"

import { DirectionProvider } from "./Directions";
import { CssBaseline } from "@mui/material";
import { ThemeRegistry } from "@/components/ThemeRegistry";

export function Provider({ children }: React.PropsWithChildren) {
  return (
    <ThemeRegistry options={{ key: 'mui' }}>
      <CssBaseline />
      <DirectionProvider>
        {children}
      </DirectionProvider>
    </ThemeRegistry>
  )
}