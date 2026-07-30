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
  NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TableSchema, TableRelation } from "@/hooks/useSqlEngine";
import { TableNode } from "@/components/TableNode";

interface CanvasWorkspaceProps {
  tables: TableSchema[];
  relations: TableRelation[];
  onSelectTable: (table: TableSchema) => void;
  onExecuteCommand: (sql: string) => void;
}

const nodeTypes: NodeTypes = { sqlTable: TableNode as any };

export function CanvasWorkspace({
  tables,
  relations,
  onSelectTable,
  onExecuteCommand,
}: CanvasWorkspaceProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    setNodes((prevNodes) => {
      return tables.map((table, index) => {
        const existingNode = prevNodes.find((n) => n.id === table.id);

        return {
          id: table.id,
          type: "sqlTable",
          position: existingNode
            ? existingNode.position
            : { x: (index % 3) * 340 + 80, y: Math.floor(index / 3) * 300 + 100 },
          data: {
            ...table,
            onDelete: (tableName: string) => onExecuteCommand(`DROP TABLE ${tableName}`),
          },
        };
      });
    });
  }, [tables, setNodes, onExecuteCommand]);

  useEffect(() => {
    const newEdges: Edge[] = relations.map((rel) => ({
      id: rel.id,
      source: rel.sourceTable,
      target: rel.targetTable,
      animated: true,
      style: { stroke: "#F37023", strokeWidth: 2 },
    }));
    setEdges(newEdges);
  }, [relations, setEdges]);

  return (
    <div className="w-full h-full bg-[#FAFAFA]">
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
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1.2} color="#E5E7EB" />
        <Controls className="!bg-white !border-gray-200 !rounded-lg shadow-sm !fill-[#111827]" />
      </ReactFlow>
    </div>
  );
}