import { NextResponse, NextRequest } from "next/server";

export function middleware(request: Request) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("access_token")?.value;
  const validToken = process.env.PRIVATE_ACCESS_TOKEN;

  if (pathname.includes("/dashboard")) {
    if (token === undefined || token !== validToken) {
      console.log("❌ Acceso no autorizado - Redirigiendo al inicio");
      console.log("Token recibido:", token);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}
