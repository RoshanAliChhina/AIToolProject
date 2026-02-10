// Backend configuration and adapter
// Supports: localStorage (default), Firebase, Supabase

const BACKEND_TYPE = import.meta.env.VITE_BACKEND_TYPE || 'localStorage';

// Backend adapter interface
class BackendAdapter {
  async save() {
    throw new Error('save() must be implemented');
  }

  async get() {
    throw new Error('get() must be implemented');
  }

  async update() {
    throw new Error('update() must be implemented');
  }

  async delete() {
    throw new Error('delete() must be implemented');
  }
}

// localStorage Adapter (default)
class LocalStorageAdapter extends BackendAdapter {
  async save(collection, data) {
    try {
      const items = this.getCollection(collection);
      const newItem = {
        ...data,
        id: data.id || Date.now().toString(),
        createdAt: data.createdAt || new Date().toISOString(),
      };
      items.push(newItem);
      localStorage.setItem(collection, JSON.stringify(items));
      return { success: true, id: newItem.id };
    } catch (error) {
      console.error(`Error saving to ${collection}:`, error);
      throw error;
    }
  }

  async get(collection, filters = {}) {
    try {
      const items = this.getCollection(collection);

      // Apply filters
      let filtered = items;
      if (filters.toolId) {
        filtered = filtered.filter(item => item.toolId === filters.toolId.toString());
      }
      if (filters.userId) {
        filtered = filtered.filter(item => item.userId === filters.userId);
      }
      if (filters.status) {
        filtered = filtered.filter(item => item.status === filters.status);
      }

      return filtered.sort((a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
    } catch (error) {
      console.error(`Error getting from ${collection}:`, error);
      return [];
    }
  }

  async update(collection, id, data) {
    try {
      const items = this.getCollection(collection);
      const index = items.findIndex(item => item.id === id.toString());
      if (index === -1) throw new Error('Item not found');

      items[index] = {
        ...items[index],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(collection, JSON.stringify(items));
      return { success: true };
    } catch (error) {
      console.error(`Error updating ${collection}:`, error);
      throw error;
    }
  }

  async delete(collection, id) {
    try {
      const items = this.getCollection(collection);
      const filtered = items.filter(item => item.id !== id.toString());
      localStorage.setItem(collection, JSON.stringify(filtered));
      return { success: true };
    } catch (error) {
      console.error(`Error deleting from ${collection}:`, error);
      throw error;
    }
  }

  getCollection(collection) {
    try {
      const stored = localStorage.getItem(collection);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
}

// Firebase Adapter
class FirebaseAdapter extends BackendAdapter {
  constructor() {
    super();
    this.db = null;
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;

    try {
      // Use dynamic import with error handling
      // Use string-based import to prevent Vite from analyzing it
      let initializeApp, getFirestore;

      try {
        // Use Function constructor to prevent static analysis
        const firebaseAppModule = 'firebase/app';
        const firebaseFirestoreModule = 'firebase/firestore';

        const firebaseApp = await import(/* @vite-ignore */ firebaseAppModule);
        const firebaseFirestore = await import(/* @vite-ignore */ firebaseFirestoreModule);
        initializeApp = firebaseApp.initializeApp;
        getFirestore = firebaseFirestore.getFirestore;
      } catch {
        // Firebase not installed - this is OK, we'll use localStorage fallback
        console.warn('Firebase not installed. Using localStorage fallback.');
        throw new Error('Firebase not available');
      }

      const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
      };

      // Check if config is valid
      if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
        throw new Error('Firebase config not provided');
      }

      const app = initializeApp(firebaseConfig);
      this.db = getFirestore(app);
      this.initialized = true;
    } catch (error) {
      // Don't throw - let it fall back to localStorage
      console.warn('Firebase initialization failed, using localStorage:', error.message);
      throw error;
    }
  }

  async save(collection, data) {
    try {
      await this.init();
    } catch {
      throw new Error('Firebase not available');
    }

    try {
      const { collection: col, addDoc } = await import(/* @vite-ignore */ 'firebase/firestore');
      const docRef = await addDoc(col(this.db, collection), {
        ...data,
        createdAt: new Date().toISOString(),
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error(`Error saving to ${collection}:`, error);
      throw error;
    }
  }

  async get(collection, filters = {}) {
    try {
      await this.init();
    } catch {
      throw new Error('Firebase not available');
    }

    try {
      const { collection: col, getDocs, query, where } = await import(/* @vite-ignore */ 'firebase/firestore');
      let q = col(this.db, collection);

      if (filters.toolId) {
        q = query(q, where('toolId', '==', filters.toolId.toString()));
      }
      if (filters.userId) {
        q = query(q, where('userId', '==', filters.userId));
      }
      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
    } catch (error) {
      console.error(`Error getting from ${collection}:`, error);
      return [];
    }
  }

  async update(collection, id, data) {
    try {
      await this.init();
    } catch {
      throw new Error('Firebase not available');
    }

    try {
      const { doc, updateDoc } = await import(/* @vite-ignore */ 'firebase/firestore');
      await updateDoc(doc(this.db, collection, id), {
        ...data,
        updatedAt: new Date().toISOString(),
      });
      return { success: true };
    } catch (error) {
      console.error(`Error updating ${collection}:`, error);
      throw error;
    }
  }

  async delete(collection, id) {
    try {
      await this.init();
    } catch {
      throw new Error('Firebase not available');
    }

    try {
      const { doc, deleteDoc } = await import(/* @vite-ignore */ 'firebase/firestore');
      await deleteDoc(doc(this.db, collection, id));
      return { success: true };
    } catch (error) {
      console.error(`Error deleting from ${collection}:`, error);
      throw error;
    }
  }
}

// Supabase Adapter
class SupabaseAdapter extends BackendAdapter {
  constructor() {
    super();
    this.client = null;
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;

    try {
      const { createClient } = await import(/* @vite-ignore */ '@supabase/supabase-js');

      this.client = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY
      );
      this.initialized = true;
    } catch (error) {
      console.error('Supabase initialization error:', error);
      throw error;
    }
  }

  async save(collection, data) {
    await this.init();

    try {
      const { data: result, error } = await this.client
        .from(collection)
        .insert([{
          ...data,
          created_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) throw error;
      return { success: true, id: result.id };
    } catch (error) {
      console.error(`Error saving to ${collection}:`, error);
      throw error;
    }
  }

  async get(collection, filters = {}) {
    await this.init();

    try {
      let query = this.client.from(collection).select('*');

      if (filters.toolId) {
        query = query.eq('tool_id', filters.toolId.toString());
      }
      if (filters.userId) {
        query = query.eq('user_id', filters.userId);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error(`Error getting from ${collection}:`, error);
      return [];
    }
  }

  async update(collection, id, data) {
    await this.init();

    try {
      const { error } = await this.client
        .from(collection)
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error(`Error updating ${collection}:`, error);
      throw error;
    }
  }

  async delete(collection, id) {
    await this.init();

    try {
      const { error } = await this.client
        .from(collection)
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error(`Error deleting from ${collection}:`, error);
      throw error;
    }
  }
}

// Express Adapter (Custom Node.js Backend)
class ExpressAdapter extends BackendAdapter {
  constructor() {
    super();
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  }

  async save(collection, data) {
    try {
      const response = await fetch(`${this.baseUrl}/${collection}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Save failed');
      return { success: true, id: result.id || result._id || (result.review && result.review._id) };
    } catch (error) {
      console.error(`Express save error (${collection}):`, error);
      throw error;
    }
  }

  async get(collection, filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = `${this.baseUrl}/${collection}${queryParams ? `?${queryParams}` : ''}`;
      const response = await fetch(url, {
        headers: this.getHeaders(),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Fetch failed');

      // Normalize MongoDB _id to id
      const items = Array.isArray(data) ? data : (data.data && Array.isArray(data.data) ? data.data : [data]);
      return items.map(item => ({
        ...item,
        id: item.id || item._id,
      }));
    } catch (error) {
      console.error(`Express get error (${collection}):`, error);
      return [];
    }
  }

  async post(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Request failed');
      return result;
    } catch (error) {
      console.error(`Express post error (${endpoint}):`, error);
      throw error;
    }
  }

  async update(collection, id, data) {
    try {
      let url = `${this.baseUrl}/${collection}/${id}`;
      let method = 'PUT';

      if (collection === 'reviews' && data.helpful !== undefined) {
        url = `${this.baseUrl}/reviews/${id}/helpful`;
      } else if (collection === 'submissions' && data.status !== undefined) {
        url = `${this.baseUrl}/submissions/${id}/status`;
      }

      const response = await fetch(url, {
        method,
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Update failed');
      return { success: true };
    } catch (error) {
      console.error(`Express update error (${collection}):`, error);
      throw error;
    }
  }

  async delete(collection, id) {
    try {
      const response = await fetch(`${this.baseUrl}/${collection}/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Delete failed');
      return { success: true };
    } catch (error) {
      console.error(`Express delete error (${collection}):`, error);
      throw error;
    }
  }
}


// Factory function to get the right adapter
export const getBackendAdapter = () => {
  switch (BACKEND_TYPE) {
    case 'firebase':
      // Only create Firebase adapter if Firebase is actually available
      // This prevents Vite from trying to resolve Firebase during dev if not installed
      try {
        return new FirebaseAdapter();
      } catch {
        console.warn('Firebase adapter creation failed, using localStorage');
        return new LocalStorageAdapter();
      }
    case 'supabase':
      try {
        return new SupabaseAdapter();
      } catch {
        console.warn('Supabase adapter creation failed, using localStorage');
        return new LocalStorageAdapter();
      }
    case 'express':
      return new ExpressAdapter();
    case 'localStorage':
    default:
      return new LocalStorageAdapter();
  }
};

// Auth Adapter Interface
class AuthAdapter {
  async signIn() {
    throw new Error('signIn() must be implemented');
  }

  async signUp() {
    throw new Error('signUp() must be implemented');
  }

  async signOut() {
    throw new Error('signOut() must be implemented');
  }

  async getCurrentUser() {
    throw new Error('getCurrentUser() must be implemented');
  }
}

// LocalStorage Auth Adapter (Mock - for development)
class LocalStorageAuthAdapter extends AuthAdapter {
  async signIn(email, password) {
    // Mock authentication - in production, use real auth
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify({ id: user.id, email: user.email, name: user.name }));
      return { success: true, user: { id: user.id, email: user.email, name: user.name } };
    }
    return { success: false, error: 'Invalid credentials' };
  }

  async signUp(email, password, name) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      password, // In production, hash this!
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ id: newUser.id, email: newUser.email, name: newUser.name }));

    return { success: true, user: { id: newUser.id, email: newUser.email, name: newUser.name } };
  }

  async signOut() {
    localStorage.removeItem('currentUser');
    return { success: true };
  }

  async getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
}

// Firebase Auth Adapter
class FirebaseAuthAdapter extends AuthAdapter {
  constructor() {
    super();
    this.auth = null;
  }

  async init() {
    if (this.auth) return;

    try {
      const { initFirebase } = await import('./firebase.js');
      const firebase = await initFirebase();
      if (firebase && firebase.auth) {
        this.auth = firebase.auth;
      } else {
        throw new Error('Firebase auth not available');
      }
    } catch (error) {
      console.warn('Firebase auth initialization failed:', error);
      throw error;
    }
  }

  async signIn(email, password) {
    try {
      await this.init();
      const { signInWithEmailAndPassword } = await import(/* @vite-ignore */ 'firebase/auth');
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return {
        success: true,
        user: {
          id: userCredential.user.uid,
          email: userCredential.user.email,
          name: userCredential.user.displayName,
        },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async signUp(email, password, name) {
    try {
      await this.init();
      const { createUserWithEmailAndPassword, updateProfile } = await import(/* @vite-ignore */ 'firebase/auth');
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      if (name) {
        await updateProfile(userCredential.user, { displayName: name });
      }

      return {
        success: true,
        user: {
          id: userCredential.user.uid,
          email: userCredential.user.email,
          name: name || userCredential.user.displayName,
        },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async signOut() {
    try {
      await this.init();
      const { signOut } = await import(/* @vite-ignore */ 'firebase/auth');
      await signOut(this.auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getCurrentUser() {
    try {
      await this.init();
      if (this.auth.currentUser) {
        return {
          id: this.auth.currentUser.uid,
          email: this.auth.currentUser.email,
          name: this.auth.currentUser.displayName,
        };
      }
      return null;
    } catch {
      return null;
    }
  }
}

// Supabase Auth Adapter
class SupabaseAuthAdapter extends AuthAdapter {
  constructor() {
    super();
    this.client = null;
  }

  async init() {
    if (this.client) return;

    try {
      const { initSupabase } = await import('./supabase.js');
      this.client = await initSupabase();
      if (!this.client) {
        throw new Error('Supabase not available');
      }
    } catch (error) {
      console.warn('Supabase auth initialization failed:', error);
      throw error;
    }
  }

  async signIn(email, password) {
    try {
      await this.init();
      const { data, error } = await this.client.auth.signInWithPassword({ email, password });

      if (error) throw error;

      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name,
        },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async signUp(email, password, name) {
    try {
      await this.init();
      const { data, error } = await this.client.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (error) throw error;

      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          name: name || data.user.user_metadata?.name,
        },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async signOut() {
    try {
      await this.init();
      const { error } = await this.client.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getCurrentUser() {
    try {
      await this.init();
      const { data: { user } } = await this.client.auth.getUser();
      if (user) {
        return {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name,
        };
      }
      return null;
    } catch {
      return null;
    }
  }
}

// Express Auth Adapter
class ExpressAuthAdapter extends AuthAdapter {
  constructor() {
    super();
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  }

  async signIn(email, password) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async signUp(email, password, name) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Signup failed');

      localStorage.setItem('token', data.token);
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async signOut() {
    localStorage.removeItem('token');
    return { success: true };
  }

  async getCurrentUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await fetch(`${this.baseUrl}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        localStorage.removeItem('token');
        return null;
      }
      return data.user;
    } catch {
      return null;
    }
  }
}


// Factory function to get auth adapter
export const getAuthAdapter = async () => {
  switch (BACKEND_TYPE) {
    case 'firebase':
      try {
        return new FirebaseAuthAdapter();
      } catch {
        console.warn('Firebase auth not available, using localStorage');
        return new LocalStorageAuthAdapter();
      }
    case 'supabase':
      try {
        return new SupabaseAuthAdapter();
      } catch {
        console.warn('Supabase auth not available, using localStorage');
        return new LocalStorageAuthAdapter();
      }
    case 'express':
      return new ExpressAuthAdapter();
    case 'localStorage':
    default:
      return new LocalStorageAuthAdapter();
  }
};

// Export singleton instance - lazy initialization to prevent module load errors
let backendInstance = null;

const getBackend = () => {
  if (!backendInstance) {
    try {
      backendInstance = getBackendAdapter();
    } catch (error) {
      console.warn('Backend initialization failed, using localStorage:', error);
      backendInstance = new LocalStorageAdapter();
    }
  }
  return backendInstance;
};

// Export backend with lazy initialization
export const backend = {
  async save(...args) {
    return getBackend().save(...args);
  },
  async get(...args) {
    return getBackend().get(...args);
  },
  async update(...args) {
    return getBackend().update(...args);
  },
  async delete(...args) {
    return getBackend().delete(...args);
  }
};

// Export types for reference
export { BackendAdapter, LocalStorageAdapter, FirebaseAdapter, SupabaseAdapter, ExpressAdapter, AuthAdapter, LocalStorageAuthAdapter, FirebaseAuthAdapter, SupabaseAuthAdapter, ExpressAuthAdapter };

