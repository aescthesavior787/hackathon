
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface EndpointCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText: string;
  suggestedName: string;
  suggestedValue: string | number;
}

const EndpointCreationModal: React.FC<EndpointCreationModalProps> = ({
  isOpen,
  onClose,
  selectedText,
  suggestedName,
  suggestedValue
}) => {
  const [endpointName, setEndpointName] = useState(suggestedName);
  const [endpointValue, setEndpointValue] = useState(suggestedValue.toString());
  const { toast } = useToast();

  const handleCreateEndpoint = () => {
    console.log('Creating endpoint:', {
      name: endpointName,
      value: endpointValue,
      sourceText: selectedText
    });
    
    toast({
      title: "Endpoint Created",
      description: `Successfully created endpoint "${endpointName}" with value "${endpointValue}"`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel border-chaldeas-glow/30">
        <DialogHeader>
          <DialogTitle className="text-chaldeas-glow font-heading">Create Endpoint from Selection</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className="text-cosmic-primary">Selected Text</Label>
            <div className="p-2 bg-cosmic-panel rounded border border-chaldeas-glow/20 text-cosmic-muted">
              "{selectedText}"
            </div>
          </div>
          
          <div>
            <Label htmlFor="endpoint-name" className="text-cosmic-primary">Endpoint Name</Label>
            <Input
              id="endpoint-name"
              value={endpointName}
              onChange={(e) => setEndpointName(e.target.value)}
              className="bg-cosmic-panel border-chaldeas-glow/30 text-cosmic-primary"
            />
          </div>
          
          <div>
            <Label htmlFor="endpoint-value" className="text-cosmic-primary">Endpoint Value</Label>
            <Input
              id="endpoint-value"
              value={endpointValue}
              onChange={(e) => setEndpointValue(e.target.value)}
              className="bg-cosmic-panel border-chaldeas-glow/30 text-cosmic-primary"
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose} className="border-cosmic-muted text-cosmic-muted">
              Cancel
            </Button>
            <Button onClick={handleCreateEndpoint} className="bg-chaldeas-glow text-cosmic-center hover:bg-chaldeas-glow/80">
              Create Endpoint
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EndpointCreationModal;
