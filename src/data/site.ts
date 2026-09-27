export const navigation = [
  { href: '/', label: 'Strona główna' },
  { href: '/o-pasiece', label: 'O pasiece' },
  { href: '/produkty', label: 'Produkty' },
  { href: '/kontakt', label: 'Kontakt' },
];

// Dane robocze — uzupełnij przed publikacją strony.
export const contact = {
  phone: '+48 123 456 789',
  phoneHref: 'tel:+48123456789',
  email: 'email@email.pl',
  address: 'Miejscowość 1',
  facebookUrl: '',
  directionsUrl: '',
};

export interface Product {
  id: string;
  name: string;
  description: string;
  detail: string;
  character: string;
  sizes?: string;
  preview: { src: string; index: 0 | 1 | 2 | 3; columns: number };
}

// Preview position belongs to the product, independently of its catalog order.
// Further collections can point to another sprite without changing the layout.
export const products: Product[] = [
  { id: 'faceliowy', preview: { src: '/assets/products.png', index: 0, columns: 4 }, character: 'Łagodny, kwiatowy, subtelny.', name: 'Miód faceliowy', description: 'Delikatny, jasny miód o łagodnym, kwiatowym smaku.', detail: 'Subtelny aromat dobrze komponuje się z pieczywem, jogurtem i lekkimi deserami.' },
  { id: 'lipowy', preview: { src: '/assets/products.png', index: 1, columns: 4 }, character: 'Wyrazisty, z aromatem kwiatów lipy.', name: 'Miód lipowy', description: 'Charakterystyczny aromat lipy i pełny, wyrazisty smak.', detail: 'Dla miłośników intensywnych kwiatowych nut. Sprawdzi się jako dodatek do letniej herbaty.' },
  { id: 'gryczany', preview: { src: '/assets/products.png', index: 2, columns: 4 }, character: 'Zdecydowany, intensywny, głęboki.', name: 'Miód gryczany', description: 'Ciemny miód o zdecydowanym smaku i głębokim aromacie.', detail: 'Wyrazisty towarzysz domowych wypieków, twarogu i śniadań z charakterem.' },
  { id: 'spadziowy', preview: { src: '/assets/products.png', index: 3, columns: 4 }, character: 'Leśny, bogaty, z żywiczną nutą.', name: 'Miód spadziowy', description: 'Głęboki smak i leśny charakter miodu ze spadzi.', detail: 'Bogaty aromat dla osób, które szukają mniej kwiatowych, bardziej żywicznych nut.' },
];
