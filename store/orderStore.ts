import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/lib/types';

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered';
}

interface OrderState {
    orders: Order[];
    addOrder: (order: Order) => void;
    clearOrders: () => void;
}

export const useOrderStore = create<OrderState>()(
    persist(
        (set) => ({
            orders: [],
            addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
            clearOrders: () => set({ orders: [] }),
        }),
        {
            name: 'aura-home-orders',
        }
    )
);
