
import { useState, useEffect } from 'react';

interface TextSelectionData {
  selectedText: string;
  suggestedEndpointName: string;
  suggestedValue: string | number;
}

const useTextSelection = () => {
  const [selectionData, setSelectionData] = useState<TextSelectionData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const generateEndpointSuggestion = (text: string): TextSelectionData => {
    const cleanText = text.trim();
    
    // AI-powered suggestions based on text content
    let suggestedName = '';
    let suggestedValue: string | number = '';
    
    // Look for patterns that suggest countable items
    const numberMatch = cleanText.match(/(\d+)/);
    const lawsMatch = cleanText.toLowerCase().includes('laws');
    const principlesMatch = cleanText.toLowerCase().includes('principles');
    
    if (cleanText.toLowerCase().includes('three laws of motion')) {
      suggestedName = 'Newton_Laws_Count';
      suggestedValue = 3;
    } else if (numberMatch && (lawsMatch || principlesMatch)) {
      const number = numberMatch[1];
      const type = lawsMatch ? 'Laws' : 'Principles';
      suggestedName = `${type}_Count`;
      suggestedValue = parseInt(number);
    } else {
      // Generic endpoint creation
      const words = cleanText.split(' ').slice(0, 3);
      suggestedName = words.join('_').replace(/[^a-zA-Z0-9_]/g, '');
      suggestedValue = cleanText.length; // Default to character count
    }
    
    return {
      selectedText: cleanText,
      suggestedEndpointName: suggestedName,
      suggestedValue
    };
  };

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        const selectedText = selection.toString();
        console.log('Text selected:', selectedText);
        setSelectionData(generateEndpointSuggestion(selectedText));
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        e.preventDefault();
        setShowModal(true);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return {
    selectionData,
    showModal,
    setShowModal
  };
};

export default useTextSelection;
