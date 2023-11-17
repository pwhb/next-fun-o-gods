// import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home()
{
  // const { data: session } = useSession();
  // console.log("session", session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/login">Sign In</Link>
      <Link href="/admin">Admin</Link>
    </main>
  );
}
