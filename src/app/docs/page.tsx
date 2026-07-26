"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Check,
  Copy,
  Database,
  Key,
  Layers,
  Sparkles,
  Terminal,
} from "lucide-react";

interface CommandDoc {
  cmd: string;
  syntax: string;
  description: string;
  example: string;
  notes?: string;
}

const SQL_COMMANDS: CommandDoc[] = [
  {
    cmd: "CREATE TABLE",
    syntax: "CREATE TABLE <nom_table> (<col1>, <col2>, ...)",
    description: "Crée un nouveau nœud de table sur le canvas avec les colonnes spécifiées.",
    example: "CREATE TABLE users (id, name, email)",
    notes: "La première colonne ou la colonne nommée 'id' est automatiquement marquée comme Primary Key (PK).",
  },
  {
    cmd: "INSERT INTO",
    syntax: "INSERT INTO <nom_table> VALUES (<val1>, <val2>, ...)",
    description: "Insère une nouvelle ligne de données dans la table ciblée.",
    example: "INSERT INTO users VALUES (1, 'Alice', 'alice@test.com')",
    notes: "Cliquez sur la carte de la table dans le workspace pour voir les lignes insérées.",
  },
  {
    cmd: "DROP TABLE",
    syntax: "DROP TABLE <nom_table>",
    description: "Supprime définitivement une table et toutes ses liaisons du canvas.",
    example: "DROP TABLE users",
    notes: "Vous pouvez également survoler une carte et cliquer sur l'icône poubelle.",
  },
];

export default function DocsPage() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#090b11] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#121520]/80 border-b border-slate-800/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold text-white text-base leading-tight">
                  Documentation & Guide
                </h1>
                <p className="text-xs text-slate-400">SequelFlow Studio</p>
              </div>
            </div>
          </div>

          <Link
            href="/workspace"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-blue-600/20 transition"
          >
            <Database className="w-4 h-4" />
            <span>Ouvrir le Workspace</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-12">
        {/* Intro Banner */}
        <section className="bg-gradient-to-r from-blue-900/30 via-slate-900 to-indigo-900/30 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Concept & Utilisation
            </span>
            <h2 className="text-2xl font-bold text-white">
              Visualisez vos schémas SQL en temps réel
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              SequelFlow est un studio SQL interactif. Écrivez des requêtes SQL standard dans la console pour générer instantanément des diagrammes relationnels animés et inspecter vos jeux de données.
            </p>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" />
            Comment utiliser l'application ?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#121520] border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h4 className="font-semibold text-white text-sm">Créez des tables</h4>
              <p className="text-xs text-slate-400">
                Tapez `CREATE TABLE` dans la barre du bas. Vos tables apparaissent sous forme de cartes déplaçables.
              </p>
            </div>

            <div className="bg-[#121520] border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h4 className="font-semibold text-white text-sm">Liaisons automatiques</h4>
              <p className="text-xs text-slate-400">
                Utilisez des conventions de clés étrangères (ex: `user_id`). Une flèche animée reliera automatiquement les tables.
              </p>
            </div>

            <div className="bg-[#121520] border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h4 className="font-semibold text-white text-sm">Inspectez les données</h4>
              <p className="text-xs text-slate-400">
                Ajoutez des lignes avec `INSERT INTO` puis cliquez sur n'importe quelle carte pour afficher l'inspecteur latéral.
              </p>
            </div>
          </div>
        </section>

        {/* Commandes SQL */}
        <section className="space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-blue-400" />
            Commandes SQL Supportées
          </h3>

          <div className="space-y-4">
            {SQL_COMMANDS.map((item) => (
              <div
                key={item.cmd}
                className="bg-[#121520] border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-lg">
                      {item.cmd}
                    </span>
                    <p className="mt-2 text-sm text-slate-300 font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase text-slate-500">
                    Syntaxe
                  </span>
                  <div className="bg-[#090b11] border border-slate-800/80 rounded-xl px-3.5 py-2 font-mono text-xs text-slate-300">
                    {item.syntax}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase text-slate-500">
                    Exemple à exécuter
                  </span>
                  <div className="flex items-center justify-between bg-[#090b11] border border-slate-800/80 rounded-xl px-3.5 py-2 font-mono text-xs text-emerald-400">
                    <span>{item.example}</span>
                    <button
                      onClick={() => copyToClipboard(item.example)}
                      className="p-1 text-slate-500 hover:text-slate-300 rounded-lg transition"
                      title="Copier l'exemple"
                    >
                      {copiedText === item.example ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {item.notes && (
                  <p className="text-xs text-slate-500 italic">💡 {item.notes}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Astuce de relation automatique */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
            <Key className="w-4 h-4" />
            <span>Astuce : Détection des relations</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Pour qu'une liaison animée s'affiche automatiquement entre deux tables, nommez la colonne étrangère au format <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">&lt;nom_table_singulier&gt;_id</code>.
            <br />
            <em>Exemple :</em> Si vous avez une table <code className="text-white">users</code>, ajouter une colonne <code className="text-white">user_id</code> dans une table <code className="text-white">orders</code> créera le lien automatiquement.
          </p>
        </section>
      </main>
    </div>
  );
}