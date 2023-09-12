import { MapView } from "@/components/Map";
import { SearchRouteForm } from "@/components/SearchRouteForm";
import { CreateRoute } from "@/components/CreateRoute";
import { SideMenu } from "@/components/SideMenu";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function NewRoutePage() {
  return (
    <Grid2 display={"flex"} flex={1} style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
      <SideMenu title="Nova rota">
        <SearchRouteForm />
        <CreateRoute />
      </SideMenu>

      <MapView />
    </Grid2>
  );
}

export default NewRoutePage;
