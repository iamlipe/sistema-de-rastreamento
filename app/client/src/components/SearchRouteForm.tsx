"use client"

import { FormEvent, useContext, useState } from "react"
import { DirectionsResponseData, FindPlaceFromTextResponseData } from "@googlemaps/google-maps-services-js"
import { DirectionsContext } from "@/context/Directions";
import { Button, FormControl, Input, InputLabel, TextField } from "@mui/material";

export function SearchRouteForm() {
  const { setDirections } = useContext(DirectionsContext)
  
  const search = async (e: FormEvent) => {
    e.preventDefault()

    const { value: origin } = window.document.getElementById("origin") as HTMLInputElement
    const { value: destination } = window.document.getElementById("destination") as HTMLInputElement

    const [originResponse, destinationResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/place?address=${origin}`),
      fetch(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/place?address=${destination}`),
    ]);
    
    const [originPlace, destinationPlace]: FindPlaceFromTextResponseData[] =
      await Promise.all([originResponse.json(), destinationResponse.json()]);

    if (originPlace.status !== "OK") {
      console.error(originPlace);
      alert("Não foi possível encontrar a origem");
      return;
    }

    if (destinationPlace.status !== "OK") {
      console.error(destinationPlace);
      alert("Não foi possível encontrar o destino");
      return;
    }

    const originId = originPlace.candidates[0].place_id;
    const destinationId = destinationPlace.candidates[0].place_id;

    const destinations = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_API_URL}/direction?origin_id=${originId}&destination_id=${destinationId}`
    );

    const directions: DirectionsResponseData & { request: any } = await destinations.json();

    setDirections(directions);
  }

  return (
    <form onSubmit={search}>
      <TextField
        id="origin"
        placeholder="origem"
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField 
        id="destination"
        placeholder="destino"
        fullWidth sx={{ mb: 2 }}
      />
      <Button variant="contained" type="submit" fullWidth>
        Pesquisar
      </Button>
    </form>
  )
}