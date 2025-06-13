
import React, { useState } from 'react';
import InteractiveGraph from './InteractiveGraph';
import ConceptHighlightPanel from './ConceptHighlightPanel';
import { Card } from "@/components/ui/card";

interface ConstellationViewProps {
  className?: string;
}

const ConstellationView: React.FC<ConstellationViewProps> = ({ className }) => {
  const [selectedConnection, setSelectedConnection] = useState<{
    sharedConcepts: string[];
    sourceDocument: string;
    targetDocument: string;
  } | null>(null);

  // Sample data - in real implementation, this would come from props or API
  const sampleNodes = [
    { id: 'principia', label: 'Principia Mathematica', x: 100, y: 150 },
    { id: 'electrodynamics', label: 'On the Electrodynamics...', x: 300, y: 100 },
    { id: 'relativity', label: 'Special Relativity', x: 250, y: 250 },
    { id: 'mechanics', label: 'Classical Mechanics', x: 150, y: 300 }
  ];

  const sampleEdges = [
    {
      from: 'principia',
      to: 'electrodynamics',
      sharedConcepts: ['Mechanics', 'Force', 'Mathematical Framework']
    },
    {
      from: 'electrodynamics',
      to: 'relativity',
      sharedConcepts: ['Space-Time', 'Electromagnetic Fields', 'Physical Constants']
    },
    {
      from: 'principia',
      to: 'mechanics',
      sharedConcepts: ['Newton\'s Laws', 'Motion', 'Gravitational Force']
    }
  ];

  const handleEdgeClick = (edge: any) => {
    const sourceNode = sampleNodes.find(n => n.id === edge.from);
    const targetNode = sampleNodes.find(n => n.id === edge.to);
    
    if (sourceNode && targetNode) {
      setSelectedConnection({
        sharedConcepts: edge.sharedConcepts,
        sourceDocument: sourceNode.label,
        targetDocument: targetNode.label
      });
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Card className="glass-panel border-chaldeas-glow/30 p-4">
        <h3 className="text-chaldeas-glow font-heading text-lg mb-4">Knowledge Constellation</h3>
        <InteractiveGraph
          nodes={sampleNodes}
          edges={sampleEdges}
          onEdgeClick={handleEdgeClick}
        />
      </Card>
      
      {selectedConnection && (
        <ConceptHighlightPanel
          sharedConcepts={selectedConnection.sharedConcepts}
          sourceDocument={selectedConnection.sourceDocument}
          targetDocument={selectedConnection.targetDocument}
        />
      )}
    </div>
  );
};

export default ConstellationView;
