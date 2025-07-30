// * api endpoint for creating an order

import { type NextRequest, NextResponse } from "next/server";
import { apiFetch } from "@/shared/utils/apiFetch";
import { API_CONFIG } from "@/shared/constants/api";

export async function POST(request: NextRequest) {
  try {
    const { orderData, accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json(
        { error: "Access token is required" },
        { status: 400 }
      );
    }

    if (!orderData) {
      return NextResponse.json(
        { error: "Order data is required" },
        { status: 400 }
      );
    }

    const data = await apiFetch(
      `${API_CONFIG.SQUARE_BASE_URL}/v2/orders`,
      {
        method: "POST",
        body: JSON.stringify(orderData),
      },
      accessToken
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 