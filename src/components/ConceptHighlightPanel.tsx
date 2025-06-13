
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ConceptHighlightPanelProps {
  sharedConcepts: string[];
  sourceDocument: string;
  targetDocument: string;
}

const ConceptHighlightPanel: React.FC<ConceptHighlightPanelProps> = ({
  sharedConcepts,
  sourceDocument,
  targetDocument
}) => {
  return (
    <Card className="glass-panel border-chaldeas-glow/30">
      <CardHeader>
        <CardTitle className="text-chaldeas-glow font-heading text-lg">
          Shared Concepts
        </CardTitle>
        <p className="text-cosmic-muted text-sm">
          Connection between "{sourceDocument}" and "{targetDocument}"
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {sharedConcepts.map((concept, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-chaldeas-insight text-chaldeas-insight hover:bg-chaldeas-insight/10"
              >
                {concept}
              </Badge>
            ))}
          </div>
          
          <div className="text-xs text-cosmic-muted">
            <p>Click on graph connections to explore conceptual relationships between documents.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptHighlightPanel;
