'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthForm } from '../../components/AuthForm';
import { useAuth } from '../../lib/auth-context';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(email: string, password: string) {
    await login(email, password);
    router.push('/');
  }

  return (
    <>
      <h1>Log in</h1>
      <AuthForm mode="login" onSubmit={handleSubmit} />
      <p>
        Need an account? <Link href="/register">Create one</Link>
      </p>
    </>
  );
}
