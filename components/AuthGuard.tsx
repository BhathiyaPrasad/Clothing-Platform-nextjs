// components/AuthGuard.tsx
import { useSession, signIn } from 'next-auth/react';
import { ReactNode } from 'react';

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading...</p>;

  if (!session) {
    signIn();
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
