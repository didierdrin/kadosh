'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const Signup = dynamic(() => import('./signup'), { ssr: false });
const Login = dynamic(() => import('./login'), { ssr: false });

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? <Login setIsLogin={setIsLogin} /> : <Signup setIsLogin={setIsLogin} />}
    </div>
  );
}

