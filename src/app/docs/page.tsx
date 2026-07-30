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
    <div className="relative min-h-screen bg-[#FAFAFA] text-[#111827] font-sans selection:bg-[#F37023]/20 overflow-hidden">
      {/* Logos Fond en Filigrane (MySQL / PostgreSQL) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* SVG MySQL Filigrane */}
        <svg
          className="absolute -top-10 -right-10 w-96 h-96 text-slate-900 opacity-[0.04]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
        </svg>

        {/* SVG PostgreSQL Filigrane */}
        <svg
          className="absolute top-1/2 -left-20 w-[500px] h-[500px] text-slate-900 opacity-[0.03] -translate-y-1/2"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3C6.48 3 2 7.48 2 13c0 3.65 1.95 6.84 4.88 8.58.37.22.84.07 1.04-.3.19-.36.06-.82-.3-1.03C5.08 18.73 3.5 16.03 3.5 13c0-4.69 3.81-8.5 8.5-8.5s8.5 3.81 8.5 8.5c0 3.03-1.58 5.73-4.12 7.25-.36.21-.49.67-.3 1.03.19.37.66.52 1.04.3C20.05 19.84 22 16.65 22 13c0-5.52-4.48-10-10-10z" />
        </svg>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 border-b border-gray-200/80 backdrop-blur-md px-6 py-3.5 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 hover:bg-gray-100 text-[#6B7280] hover:text-[#111827] rounded-lg transition-colors"
              title="Retour"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#F37023]/10 border border-[#F37023]/20 text-[#F37023] rounded-lg">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h1 className="font-semibold text-[#111827] text-xs leading-tight">
                  Documentation & Guide
                </h1>
                <p className="text-[10px] text-[#6B7280]">SequelFlow Studio</p>
              </div>
            </div>
          </div>

          <Link
            href="/workspace"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F37023] hover:bg-[#e05f12] text-white font-medium text-xs rounded-lg shadow-sm transition-all duration-150"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Ouvrir le Workspace</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-8 space-y-10">
        {/* Intro Banner */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="max-w-2xl space-y-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#F37023]/10 border border-[#F37023]/20 text-[#F37023] text-[11px] font-semibold rounded-md">
              <Sparkles className="w-3 h-3" /> Concept & Utilisation
            </span>
            <h2 className="text-xl font-bold text-[#111827] tracking-tight">
              Visualisez vos schémas SQL en temps réel
            </h2>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              SequelFlow est un studio SQL interactif. Écrivez des requêtes SQL standard dans la console pour générer instantanément des diagrammes relationnels animés et inspecter vos jeux de données.
            </p>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2 tracking-tight">
            <Layers className="w-4 h-4 text-[#F37023]" />
            Comment utiliser l'application ?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-2 shadow-sm">
              <div className="w-7 h-7 rounded-lg bg-[#F37023]/10 border border-[#F37023]/20 text-[#F37023] font-bold flex items-center justify-center text-xs">
                1
              </div>
              <h4 className="font-semibold text-[#111827] text-xs">Créez des tables</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Tapez <code className="font-mono text-[11px] text-[#111827] bg-gray-100 px-1 py-0.5 rounded">CREATE TABLE</code> dans la barre du bas. Vos tables apparaissent sous forme de cartes déplaçables.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-2 shadow-sm">
              <div className="w-7 h-7 rounded-lg bg-[#F37023]/10 border border-[#F37023]/20 text-[#F37023] font-bold flex items-center justify-center text-xs">
                2
              </div>
              <h4 className="font-semibold text-[#111827] text-xs">Liaisons automatiques</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Utilisez des conventions de clés étrangères (ex: <code className="font-mono text-[11px] text-[#111827] bg-gray-100 px-1 py-0.5 rounded">user_id</code>). Une flèche reliera automatiquement les tables.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-2 shadow-sm">
              <div className="w-7 h-7 rounded-lg bg-[#F37023]/10 border border-[#F37023]/20 text-[#F37023] font-bold flex items-center justify-center text-xs">
                3
              </div>
              <h4 className="font-semibold text-[#111827] text-xs">Inspectez les données</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Ajoutez des lignes avec <code className="font-mono text-[11px] text-[#111827] bg-gray-100 px-1 py-0.5 rounded">INSERT INTO</code> puis cliquez sur n'importe quelle carte pour afficher l'inspecteur.
              </p>
            </div>
          </div>
        </section>

        {/* Commandes SQL */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-[#111827] flex items-center gap-2 tracking-tight">
            <Terminal className="w-4 h-4 text-[#F37023]" />
            Commandes SQL Supportées
          </h3>

          <div className="space-y-3">
            {SQL_COMMANDS.map((item) => (
              <div
                key={item.cmd}
                className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#F37023] bg-[#F37023]/10 border border-[#F37023]/20 px-2 py-0.5 rounded-md">
                      {item.cmd}
                    </span>
                    <p className="mt-2 text-xs text-[#111827] font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-[#6B7280]">
                    Syntaxe
                  </span>
                  <div className="bg-[#FAFAFA] border border-gray-200 rounded-lg px-3 py-1.5 font-mono text-xs text-[#111827]">
                    {item.syntax}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-[#6B7280]">
                    Exemple à exécuter
                  </span>
                  <div className="flex items-center justify-between bg-[#FAFAFA] border border-gray-200 rounded-lg px-3 py-1.5 font-mono text-xs text-[#111827]">
                    <span className="truncate">{item.example}</span>
                    <button
                      onClick={() => copyToClipboard(item.example)}
                      className="p-1 text-[#6B7280] hover:text-[#111827] hover:bg-gray-200/60 rounded transition-colors shrink-0"
                      title="Copier l'exemple"
                    >
                      {copiedText === item.example ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {item.notes && (
                  <p className="text-[11px] text-[#6B7280] italic">💡 {item.notes}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Astuce de relation automatique */}
        <section className="bg-white border border-gray-200 rounded-xl p-4 space-y-2 shadow-sm">
          <div className="flex items-center gap-1.5 text-[#F37023] text-xs font-semibold">
            <Key className="w-4 h-4" />
            <span>Astuce : Détection des relations</span>
          </div>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Pour qu'une liaison animée s'affiche automatiquement entre deux tables, nommez la colonne étrangère au format <code className="text-[#111827] bg-gray-100 font-mono px-1.5 py-0.5 rounded border border-gray-200">&lt;nom_table_singulier&gt;_id</code>.
            <br />
            <em>Exemple :</em> Si vous avez une table <code className="text-[#111827] font-medium">users</code>, ajouter une colonne <code className="text-[#111827] font-medium">user_id</code> dans une table <code className="text-[#111827] font-medium">orders</code> créera le lien automatiquement.
          </p>
        </section>
      </main>
    </div>
  );
}