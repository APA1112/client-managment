import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const url = request.nextUrl;

  // --- 1. Variables de Tokens ---
  const validToken = process.env.PRIVATE_ACCESS_TOKEN;
  const token = request.cookies.get("access_token")?.value;
  
  // Nuevo: Token para la ruta de configuración
  const setupTokenSecret = process.env.SETUP_ACCESS_TOKEN;

  // --- 2. Definir Rutas Públicas/Especiales ---
  const publicPaths = ["/", "/auth/logout"];
  const isPublicPath =
    publicPaths.includes(pathname) || 
    pathname.startsWith("/_next") || 
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|map)$/);

  // --- 3. Lógica para la ruta especial /auth/set-token ---
  if (pathname === "/auth/set-token") {
    // Obtener el valor del parámetro 'setup_key' de la URL
    const setupKey = url.searchParams.get('setup_key');

    // Verificar si el setup_key coincide con el token maestro secreto
    if (setupKey && setupKey === setupTokenSecret) {
      // Token maestro válido: permitir el acceso a /auth/set-token
      console.log("✅ Acceso autorizado a /auth/set-token con token maestro.");
      return NextResponse.next();
    }

    // Token maestro inválido o ausente: redirigir al inicio
    console.log("❌ Acceso no autorizado a /auth/set-token. Redirigiendo.");
    const redirectUrl = url.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  // --- 4. Lógica para Rutas Públicas ---
  if (isPublicPath) {
    return NextResponse.next();
  }

  // --- 5. Lógica de Protección para el resto de Rutas Privadas ---
  // (Requieren el 'access_token' normal)
  if (token === undefined || token !== validToken) {
    console.log("❌ Acceso no autorizado a ruta privada - Redirigiendo al inicio");
    
    // Redirige al usuario al inicio ("/") si no está autenticado
    const redirectUrl = url.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  // 6. Si es una ruta privada y el token es válido, permite el acceso.
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|static).*)'],
};