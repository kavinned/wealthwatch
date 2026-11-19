import nextAuthMiddleware from "next-auth/middleware";

export default function proxy(request, event) {
	return nextAuthMiddleware(request, event);
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|signup|$).*)"],
};
