"use client";

import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [ authenticated, setAuthenticated ] = useState<boolean>(false);
  
  const router = useRouter();

  useEffect(() => {
    if(window.localStorage.getItem("session") === null) {
      router.push("/auth");
    } else {
      setAuthenticated(true);
    }
  }, []);

  if(authenticated) {
    return <Dashboard />;
  }
}
