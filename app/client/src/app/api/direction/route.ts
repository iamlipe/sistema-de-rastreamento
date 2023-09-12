import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const originId = url.searchParams.get("origin_id");
  const destinationId = url.searchParams.get("destination_id");
  const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_WS_URL}/direction?origin_id=${originId}&destination_id=${destinationId}`, {
    next: {
      revalidate: 60,
    },
  });
  return NextResponse.json(await response.json());
}