import { persistentAtom } from '@nanostores/persistent';

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}

export const cart = persistentAtom<CartItem[]>('vtr-cart', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function addToCart(item: Omit<CartItem, 'qty'>, qty = 1) {
  const items = cart.get();
  const existing = items.find((i) => i.slug === item.slug);
  if (existing) {
    cart.set(items.map((i) => (i.slug === item.slug ? { ...i, qty: i.qty + qty } : i)));
  } else {
    cart.set([...items, { ...item, qty }]);
  }
}

export function updateQty(slug: string, qty: number) {
  cart.set(cart.get().map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i)));
}

export function removeFromCart(slug: string) {
  cart.set(cart.get().filter((i) => i.slug !== slug));
}

export function clearCart() {
  cart.set([]);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((n, i) => n + i.qty, 0);
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((n, i) => n + i.qty * i.price, 0);
}
