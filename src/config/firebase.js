// Firebase configuration
// This file is ready to use once you add Firebase credentials to .env

let firebaseApp = null;
let firestore = null;
let auth = null;

export const initFirebase = async () => {
  if (firebaseApp) return { app: firebaseApp, db: firestore, auth };

  try {
      const { initializeApp } = await import(/* @vite-ignore */ 'firebase/app');
      const { getFirestore } = await import(/* @vite-ignore */ 'firebase/firestore');
      const { getAuth } = await import(/* @vite-ignore */ 'firebase/auth');

    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    // Check if config is provided
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey === '') {
      console.warn('Firebase config not provided. Using localStorage fallback.');
      return null;
    }

    firebaseApp = initializeApp(firebaseConfig);
    firestore = getFirestore(firebaseApp);
    auth = getAuth(firebaseApp);

    return { app: firebaseApp, db: firestore, auth };
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return null;
  }
};

// Export initialized instances (will be null if not configured)
export { firebaseApp, firestore, auth };

