import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    // 1. cookies_დან ამოვიღოთ ჩვენი ადმინის ტოკენი
    const token = request.cookies.get("admin_token")?.value;

    // შევამოწმოთ, რა ლინკზე გადასვლას ცდილობს მომხმარებელი
    const isUrlAdmin = request.nextUrl.pathname.startsWith("/admin");
    const isUrlLogin = request.nextUrl.pathname.startsWith("/login");

    // უსაფრთხოების წესების შემოწმება

    // თუ მიდის ადმინ პანელში, მაგრამ ტოკენი არ აქვს -> გადავიყვანოთ ლოგინზე
    if (isUrlAdmin && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // თუ უკვე დალოგინებულია და მაინც ლოგინის გვერდზე შედის -> გადავიყვანოთ პირდაპირ ადმინში
    if(isUrlLogin && token) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    // თუ ყველაფერი წესრიგშია, ნება მიეცი გააგრძელოს
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/login"
    ],
};