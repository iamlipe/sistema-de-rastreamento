"use client"

import { fetcher } from "@/utils/http";
import { useContext } from "react";
import useSwr from "swr";
import { DirectionsContext } from "@/context/Directions";
import { Typography, Button, NativeSelect } from "@mui/material";

export function StartTravel() { 
  const { setRoute } = useContext(DirectionsContext)

  const { data: routes, isLoading} = useSwr<Route[]>(
    `${process.env.NEXT_PUBLIC_NEXT_API_URL}/route`,
    fetcher, { fallbackData: [] }
  );

  console.log(routes)

  const start = async () => {
    const { value: routeId } = document.getElementById("route") as HTMLSelectElement;
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/route/${routeId}`);
    const route = await response.json();
    setRoute(route)
  }

  return (
    <div>
      <NativeSelect id="route" sx={{ mb: 4 }} >
        {isLoading && <option value="">Loading...</option>}
        {routes && (
          <>
            <option value="">Select a route</option>
            {routes!.map((route) => (
              <option key={route.id} value={route.id}>
                {route.name}
              </option>
            ))}
          </>
        )}
      </NativeSelect>

      <Button variant="contained" onClick={start} fullWidth>
        Iniciar a viagem
      </Button>
    </div>
  )
}