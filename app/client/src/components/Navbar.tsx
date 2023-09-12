import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { DriveEta } from '@mui/icons-material'

export function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <DriveEta />
        </IconButton>

        <Typography variant="h6">Sistema de monitoramento</Typography>
      </Toolbar>
    </AppBar>
  )
}