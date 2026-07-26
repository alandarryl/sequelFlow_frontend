"use client";

import { useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TableSchema, TableRelation } from "@/hooks/useSqlEngine";
import { TableNode } from "@/components/TableNode";

interface CanvasWorkspaceProps {
  tables: TableSchema[];
  relations: TableRelation[];
  onSelectTable: (table: TableSchema) => void;
  onExecuteCommand: (sql: string) => void; // 👈 1. Ajout de la prop ici
}

const nodeTypes = { sqlTable: TableNode as any };

export function CanvasWorkspace({
  tables,
  relations,
  onSelectTable,
  onExecuteCommand, // 👈 2. Récupération ici
}: CanvasWorkspaceProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // Synchronisation des tables vers les nœuds
  useEffect(() => {
    setNodes((prevNodes) => {
      return tables.map((table, index) => {
        const existingNode = prevNodes.find((n) => n.id === table.id);

        return {
          id: table.id,
          type: "sqlTable",
          position: existingNode
            ? existingNode.position
            : { x: (index % 3) * 320 + 100, y: Math.floor(index / 3) * 280 + 100 },
          data: {
            ...table,
            // 👈 3. Passage de la fonction de suppression au TableNode
            onDelete: (tableName: string) => onExecuteCommand(`DROP TABLE ${tableName}`),
          },
        };
      });
    });
  }, [tables, setNodes, onExecuteCommand]);

  // Synchronisation des relations (Edges)
  useEffect(() => {
    const newEdges: Edge[] = relations.map((rel) => ({
      id: rel.id,
      source: rel.source,
      target: rel.target,
      sourceHandle: "source",
      targetHandle: "target",
      animated: true,
      style: { stroke: "#3b82f6", strokeWidth: 2 },
    }));
    setEdges(newEdges);
  }, [relations, setEdges]);

  return (
    <div className="w-full h-full bg-[#090b11]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => {
          const selected = tables.find((t) => t.id === node.id);
          if (selected) onSelectTable(selected);
        }}
        fitView
        colorMode="dark"
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#1e293b" />
        <Controls className="!bg-[#121520] !border-slate-800 !fill-slate-300" />
      </ReactFlow>
    </div>
  );
}