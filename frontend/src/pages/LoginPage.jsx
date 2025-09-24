import React, { useEffect } from 'react';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function LoginPage() {
  useEffect(() => {
    // Optionally, check if already authenticated and redirect
    fetch(`${BACKEND_URL}/api/auth/check`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          window.location.href = '/'; // Redirect to home if already logged in
        }
      });
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/api/auth/google`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Sign in to Two Cents</h1>
      <button onClick={handleGoogleLogin} style={{ padding: '1em 2em', fontSize: '1.2em', cursor: 'pointer' }}>
        Sign in with Google
      </button>
    </div>
  );
}
