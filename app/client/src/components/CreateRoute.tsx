"use client"

import { DirectionsContext } from "@/context/Directions"
import { Card, CardContent, List, ListItem, ListItemText, CardActions, Button, Alert, Snackbar } from "@mui/material"
import { useContext, useState } from "react"

export function CreateRoute() {
  const { directions } = useContext(DirectionsContext)
  const [ success, setSucces ] = useState(false);

  const create = async () => {
    const startAddress = directions?.routes[0].legs[0].start_address;
    const endAddress = directions?.routes[0].legs[0].end_address;
    
    await fetch(`${process.env.NEXT_PUBLIC_NEXT_API_URL}route`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name:`${startAddress} - ${endAddress}`,
        origin_id: directions?.request.origin.id,
        destination_id: directions!.request.destination.id,
      })
    });

    setSucces(true)
  }

  return (
    <>
      <Card sx={{ my: 4 }}>
        <CardContent sx={{ p: 0 }}>
          <List>
            <ListItem>
              <ListItemText
                primary={"Origem"}
                secondary={
                  directions?.routes[0]!.legs[0]!.start_address
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={"Destino"}
                secondary={
                  directions?.routes[0]!.legs[0]!.end_address
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={"Distância"}
                secondary={
                  directions?.routes[0]!.legs[0]!.distance.text
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={"Duração"}
                secondary={
                  directions?.routes[0]!.legs[0]!.duration.text
                }
              />
            </ListItem>
          </List>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center", p: 0, m: 2 }}>
          <Button type="button" variant="contained" onClick={create} fullWidth>
            Adicionar rota
          </Button>
        </CardActions>
      </Card>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSucces(false)}
        
      >
        <Alert onClose={() => setSucces(false)} severity="success">
          Rota cadastrada com sucesso
        </Alert>
      </Snackbar>
    </>
  )
}