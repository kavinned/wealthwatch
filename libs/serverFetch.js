import { cookies } from "next/headers";

export async function serverFetch(path, init = {}) {
  const cookieStore = await cookies();
  return fetch(`${process.env.NEXTAUTH_URL}${path}`, {
    cache: "no-store",
    ...init,
    headers: { cookie: cookieStore.toString(), ...init.headers },
  });
}
