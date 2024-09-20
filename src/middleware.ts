import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

export function middleware(req: NextRequest, event: NextFetchEvent) {
    const token = req.cookies.get("token");
    const url = req.nextUrl.clone(); // copy the current url

    console.log("Token data:", { token });
    console.log("Pathname:", url.pathname);
    const requestUrl = req.url;
    console.log("Request Url", requestUrl);
    const protectedPageRoutes = [
        "v1/billing",
        "v1/addRecipient",
        "v1/dashboard",
        "v1/transaction",
    ].map((lasturl) => requestUrl + lasturl);

    console.log({ protectedPageRoutes });
    if (protectedPageRoutes.includes(url.pathname) && !token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    const protectedApiRoutes = [
        "/api/v1/billing",
        "/api/v1/addRecipient",
        "/api/v1/dashboard",
        "/api/v1/transaction",
    ];

    if (protectedApiRoutes.includes(url.pathname) && !token) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    return NextResponse.next();
}
