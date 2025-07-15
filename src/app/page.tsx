"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onError: () => {
          window.alert("error");
        },
        onSuccess: () => {
          window.alert("success");
        },
      }
    );
  };

  const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert("error");
        },
        onSuccess: () => {
          window.alert("success");
        },
      }
    );
  };

  if (session) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <p>logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <Input
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button onClick={onLogin}>Login</Button>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <Input
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Input
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button onClick={onSubmit}>Create user</Button>
      </div>
    </>
  );
}
