import { MapView } from "@/components/Map";

export default function Admin() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }} >
      <MapView isAdmin />
    </div>
  )
}