"use client"

import { DirectionsContext } from "@/context/Directions";
import { useCallback, useContext, useEffect, useRef } from "react";
import { useMap } from "@/hooks/useMap";
import { socket } from '@/utils/socket-io'
 
interface MapViewProps {
  isAdmin?: boolean
}

export function MapView({ isAdmin }: MapViewProps) {
  const { route } = useContext(DirectionsContext)
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapContainerRef)

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    }
  }, [])
  
  const render = useCallback(async() => {
    if (route) {
      map?.removeAllRoutes();
    
      await map?.addRouteWithIcons({
        routeId: route.id,
        startMarkerOptions: {
          position: route.directions.routes[0].legs[0].start_location,
        },
        endMarkerOptions: {
          position: route.directions.routes[0].legs[0].end_location,
        },
        carMarkerOptions: {
          position: route.directions.routes[0].legs[0].start_location,
        },
      });
  
      const { steps } = route.directions.routes[0].legs[0];
  
      for(const step of steps){
        await sleep(2000);
        map?.moveCar(route.id, step.start_location)
        socket.emit('new-point', {
          route_id: route.id,
          lat: step.start_location.lat,
          long: step.start_location.lng,
        })
  
        await sleep(2000);
        map?.moveCar(route.id, step.end_location);
        socket.emit('new-point', {
          route_id: route.id,
          lat: step.end_location.lat,
          long: step.end_location.lng,
        })
      }
    }
  }, [map, route])

  const renderAll = useCallback(async() => {
    socket.on("admin-new-point", async ( data: { route_id: string; lat: number, long: number } ) => {
      if(!map?.hasRoute(data.route_id)) {
        const response = await fetch(`http://client:3001/route/${data.route_id}`)
        const route: Route = await response.json()

        map?.removeRoute(data.route_id)
        await map?.addRouteWithIcons({
          routeId: data.route_id,
          startMarkerOptions: {
            position: route.directions.routes[0].legs[0].start_location
          },
          endMarkerOptions: {
            position: route.directions.routes[0].legs[0].end_location
          },
          carMarkerOptions: {
            position: route.directions.routes[0].legs[0].start_location
          }
        })
      }

      map?.moveCar(data.route_id, { lat: data.lat, lng: data.long })
    }) 
  }, [map])
  
  useEffect(() => {
    if (isAdmin) renderAll()
    if (route) render()
  }, [route, render, isAdmin, renderAll])

  if (!mapContainerRef) return <p>Loading...</p>

  return <div ref={mapContainerRef} id="map" style={{ width: '100%', height: '100%' }} />
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
