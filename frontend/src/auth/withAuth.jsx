import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function withAuth(WrappedComponent) {
  return function(props) {
    const router = useRouter();

    useEffect(() => {
      // Check the token from localStorage
      const token = localStorage.getItem('token');
      // If no token, redirect to login page
      if (!token) {
        router.push('/');
      }
    }, [router]);

    // If there's a token, render the component that was passed with all its props
    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
