import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const address = url.searchParams.get("address");
  const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_WS_URL}/place?address=${address}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  return NextResponse.json(await response.json());
}