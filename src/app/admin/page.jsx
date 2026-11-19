import React from "react";
import Unauthorized from "../(components)/Unauthorized";
import UsersList from "../(components)/UsersList";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { serverFetch } from "../../../libs/serverFetch";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    return <Unauthorized />;
  }

  const users = await serverFetch("/api/users").then((res) => res.json());

  return (
    <div className="page-shell py-8">
      <div>
        <p className="text-sm font-medium text-muted">Admin</p>
        <h1 className="page-title mt-1">Users</h1>
      </div>

      {users.length === 0 ? (
        <div className="card-light mt-6 p-6 text-sm text-muted">
          No users to show. Admins are excluded from this list.
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {users.map((user) => (
            <UsersList key={user._id} user={user} />
          ))}
        </ul>
      )}
    </div>
  );
}
