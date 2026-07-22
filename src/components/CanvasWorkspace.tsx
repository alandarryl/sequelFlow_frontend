"use client";

import { ReactFlow, Background, Controls, BackgroundVariant } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Exemple temporaire de cartes de tables
const initialNodes = [
  {
    id: "users",
    position: { x: 250, y: 150 },
    data: { label: "Table: Users" },
    style: { background: "#121520", color: "#fff", border: "1px solid #334155", borderRadius: "12px", padding: "16px", minWidth: "180px" },
  },
];

export function CanvasWorkspace() {
  return (
    <div className="w-full h-full bg-[#090b11]">
      <ReactFlow nodes={initialNodes} fitView colorMode="dark">
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#334155" />
        <Controls className="bg-[#121520] border-slate-800 fill-slate-300" />
      </ReactFlow>
    </div>
  );
}