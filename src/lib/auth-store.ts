import { create } from 'zustand';
import { api } from './api';

type Role = { slug: string };
type Me = { id: number; email: string; roles?: Role[] } | null;

type AuthState = {
	me: Me;
	loading: boolean;
	fetchMe: () => Promise<void>;
	clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
	me: null,
	loading: false,
	async fetchMe() {
		set({ loading: true });
		try {
			const me = await api<Me>('/auth/me');
			set({ me, loading: false });
		} catch {
			set({ me: null, loading: false });
		}
	},
	clear() {
		set({ me: null });
	},
}));
