import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { routeId: string } }
) {
  const id = params.routeId;
  const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_WS_URL}/route/${id}`, {
    next: {
      revalidate: 60,
    },
  });
  return NextResponse.json(await response.json());
}