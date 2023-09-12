import { Dispatch, ReactNode, createContext, useState, SetStateAction } from 'react'
import { DirectionsResponseData } from '@googlemaps/google-maps-services-js'

type Directions = DirectionsResponseData & { request: any }

interface DirectionsContextProps {
  route: Route | null
  setRoute: Dispatch<SetStateAction<Route | null>>
  directions: Directions | null
  setDirections: Dispatch<SetStateAction<Directions | null>>
}

export const DirectionsContext = createContext<DirectionsContextProps>({} as DirectionsContextProps)

export function DirectionProvider({ children }: { children: ReactNode }) {
  const [directions, setDirections] = useState<Directions | null>(null);
  const [route, setRoute] = useState<Route | null>(null)

  return (
    <DirectionsContext.Provider value={{ route, directions, setDirections, setRoute }}>
      {children}
    </DirectionsContext.Provider>
  )
}