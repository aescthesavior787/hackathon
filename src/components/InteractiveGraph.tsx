
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface GraphEdge {
  from: string;
  to: string;
  sharedConcepts: string[];
}

interface InteractiveGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onEdgeClick: (edge: GraphEdge) => void;
}

const InteractiveGraph: React.FC<InteractiveGraphProps> = ({ nodes, edges, onEdgeClick }) => {
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);

  const handleEdgeClick = (edge: GraphEdge) => {
    console.log('Edge clicked:', edge);
    onEdgeClick(edge);
  };

  return (
    <div className="relative w-full h-96 bg-cosmic-panel rounded-lg border border-chaldeas-glow/20">
      <svg className="w-full h-full">
        {/* Render edges */}
        {edges.map((edge, index) => {
          const fromNode = nodes.find(n => n.id === edge.from);
          const toNode = nodes.find(n => n.id === edge.to);
          
          if (!fromNode || !toNode) return null;
          
          const edgeId = `${edge.from}-${edge.to}`;
          const isHovered = hoveredEdge === edgeId;
          
          return (
            <line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={isHovered ? "#00F5D4" : "#8A8A9E"}
              strokeWidth={isHovered ? "3" : "2"}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHoveredEdge(edgeId)}
              onMouseLeave={() => setHoveredEdge(null)}
              onClick={() => handleEdgeClick(edge)}
            />
          );
        })}
        
        {/* Render nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="8"
              fill="#00F5D4"
              className="chaldeas-glow"
            />
            <text
              x={node.x}
              y={node.y - 15}
              textAnchor="middle"
              fill="#E0E0E0"
              fontSize="12"
              className="font-body"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default InteractiveGraph;
