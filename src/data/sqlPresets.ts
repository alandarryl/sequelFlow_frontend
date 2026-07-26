export interface SqlPreset {
  id: string;
  name: string;
  description: string;
  badge: string;
  commands: string[];
}

export const SQL_PRESETS: SqlPreset[] = [
  {
    id: "ecommerce",
    name: "E-Commerce",
    description: "Utilisateurs, Commandes et Produits",
    badge: "Populaire",
    commands: [
      "CREATE TABLE users (id, name, email)",
      "INSERT INTO users VALUES (1, 'Alice Martin', 'alice@test.com')",
      "INSERT INTO users VALUES (2, 'Bob Dupont', 'bob@test.com')",
      "CREATE TABLE products (id, title, price)",
      "INSERT INTO products VALUES (1, 'Clavier Mécanique', 89)",
      "INSERT INTO products VALUES (2, 'Souris Sans Fil', 45)",
      "CREATE TABLE orders (id, user_id, product_id, status)",
      "INSERT INTO orders VALUES (101, 1, 1, 'Expédié')",
      "INSERT INTO orders VALUES (102, 2, 2, 'En attente')",
    ],
  },
  {
    id: "blog",
    name: "Blog / Médias",
    description: "Auteurs, Articles et Commentaires",
    badge: "Classique",
    commands: [
      "CREATE TABLE authors (id, username, role)",
      "INSERT INTO authors VALUES (1, 'Sophie_Tech', 'Admin')",
      "INSERT INTO authors VALUES (2, 'Marc_Dev', 'Auteur')",
      "CREATE TABLE posts (id, author_id, title, views)",
      "INSERT INTO posts VALUES (1, 1, 'Découvrir SequelFlow', 1420)",
      "INSERT INTO posts VALUES (2, 2, 'Les secrets du SQL', 850)",
      "CREATE TABLE comments (id, post_id, content)",
      "INSERT INTO comments VALUES (1, 1, 'Super projet !')",
      "INSERT INTO comments VALUES (2, 1, 'Très clair, merci.')",
    ],
  },
  {
    id: "saas",
    name: "SaaS & Équipes",
    description: "Organisations, Membres et Projets",
    badge: "B2B",
    commands: [
      "CREATE TABLE organizations (id, company_name, plan)",
      "INSERT INTO organizations VALUES (1, 'Acme Corp', 'Enterprise')",
      "CREATE TABLE members (id, organization_id, email, role)",
      "INSERT INTO members VALUES (1, 1, 'ceo@acme.com', 'Owner')",
      "INSERT INTO members VALUES (2, 1, 'dev@acme.com', 'Developer')",
      "CREATE TABLE projects (id, organization_id, name)",
      "INSERT INTO projects VALUES (10, 1, 'Refonte Mobile')",
      "INSERT INTO projects VALUES (11, 1, 'Migration Cloud')",
    ],
  },
];