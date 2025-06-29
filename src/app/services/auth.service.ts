import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Session } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase = inject(SupabaseService);
  session = signal<Session | null>(null);

  constructor() {
    this.supabase.client.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      console.log('Session', session);
    });

    this.supabase.client.auth.getSession().then(({ data }) => {
      this.session.set(data.session);
    });
  }

  async signUp(email: string, password: string) {
    return await this.supabase.client.auth.signUp({ email, password });
  }

  async signIn(email: string, password: string) {
    return await this.supabase.client.auth.signInWithPassword({
      email,
      password,
    });
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.client.auth.signOut();

    if (error) throw error;
    localStorage.removeItem('session');
  }

  async signInWithGoogle() {
    const { error } = await this.supabase.client.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) throw error;
  }

  get isLoggedIn(): boolean {
    return !!this.session()?.access_token;
  }

  get userId() {
    return this.session()?.user?.id ?? null;
  }

  async getSession() {
    const { data } = await this.supabase.client.auth.getSession();
    if (data.session) {
      return data.session;
    }
    return null;
  }
}
