import { SideMenu } from "@/components/SideMenu";
import { StartTravel } from "@/components/StartTravel";
import { MapView } from "@/components/Map";
import Grid2 from "@mui/material/Unstable_Grid2";

export function DriverPage() {
  return (
    <Grid2 display={"flex"} flex={1} style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
      <SideMenu title="Iniciar viagem" >
        <StartTravel />
      </SideMenu>

      <MapView />
    </Grid2>
  );
}

export default DriverPage;
