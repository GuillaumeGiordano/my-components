import type { PageLoad } from './$types';

const ALL_DATA = [
  { id: 1,  nom: 'Alice Martin',    statut: 'actif',    role: 'admin' },
  { id: 2,  nom: 'Bob Dupont',      statut: 'inactif',  role: 'user'  },
  { id: 3,  nom: 'Clara Leroy',     statut: 'actif',    role: 'user'  },
  { id: 4,  nom: 'David Moreau',    statut: 'suspendu', role: 'admin' },
  { id: 5,  nom: 'Eva Bernard',     statut: 'actif',    role: 'user'  },
  { id: 6,  nom: 'Frank Simon',     statut: 'inactif',  role: 'user'  },
  { id: 7,  nom: 'Grace Petit',     statut: 'actif',    role: 'admin' },
  { id: 8,  nom: 'Hugo Laurent',    statut: 'actif',    role: 'user'  },
  { id: 9,  nom: 'Iris Blanc',      statut: 'inactif',  role: 'user'  },
  { id: 10, nom: 'Jules Fontaine',  statut: 'actif',    role: 'admin' },
  { id: 11, nom: 'Karen Dubois',    statut: 'suspendu', role: 'user'  },
  { id: 12, nom: 'Luc Renard',      statut: 'actif',    role: 'user'  },
];

export const load: PageLoad = ({ url }) => {
  const nom     = url.searchParams.get('nom')     ?? '';
  const statut  = url.searchParams.get('statut')  ?? '';
  const role    = url.searchParams.get('role')    ?? '';
  const page    = Math.max(1, parseInt(url.searchParams.get('page')    ?? '1'));
  const perPage = Math.max(1, parseInt(url.searchParams.get('perPage') ?? '4'));

  const filtered = ALL_DATA.filter(row =>
    (!nom    || row.nom.toLowerCase().includes(nom.toLowerCase())) &&
    (!statut || row.statut === statut) &&
    (!role   || row.role   === role)
  );

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const safePage   = Math.min(page, totalPages);
  const items      = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  return { items, totalItems, totalPages, page: safePage, perPage };
};
