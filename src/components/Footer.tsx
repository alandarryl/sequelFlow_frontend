const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 py-8 text-center text-xs font-medium text-neutral-500 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-neutral-900">Sequel<span className="text-[#F37023]">Flow</span></span> © 2026 — Éditeur & Visualiseur SQL Interactif
        </div>
        <div className="text-neutral-400">
          Fait pour la visualisation de schémas de données
        </div>
      </div>
    </footer>
  );
};

export default Footer;