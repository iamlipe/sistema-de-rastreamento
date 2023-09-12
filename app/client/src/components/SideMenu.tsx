import { Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"

interface SideMenuProps extends React.PropsWithChildren {
  title: string
}

export function SideMenu({title, children }: SideMenuProps) {
  return (
    <Grid2 display={"flex"} flexDirection={"column"} flex={1} p={4}>
      <Typography variant="h4" sx={{ mb: 4 }} >{title}</Typography>
      <Grid2 display={"flex"} flexDirection={"column"} flex={1} >
        {children}
      </Grid2>
    </Grid2>
  )
}