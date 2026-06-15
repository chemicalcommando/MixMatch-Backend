'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthForm } from '../../components/AuthForm';
import { useAuth } from '../../lib/auth-context';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  async function handleSubmit(email: string, password: string) {
    await register(email, password);
    router.push('/');
  }

  return (
    <>
      <h1>Create account</h1>
      <AuthForm mode="register" onSubmit={handleSubmit} />
      <p>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </>
  );
}
