declare module 'jspdf' {
  interface jsPDFAPI {
    autoTable: (options: AutoTableOptions) => { finalY: number };
  }

  interface AutoTableOptions {
    startY?: number;
    head?: TableRow[][];
    body?: TableRow[][];
    theme?: string;
    finalY?: number;
    margin?: { top: number; right: number; bottom: number; left: number };
    pageBreak?: 'auto' | 'avoid' | 'always';
    rowPageBreak?: 'auto' | 'avoid';
  }

  interface TableRow {
    [key: string]: string | number;
  }

  interface jsPDFStatic {
    save(): jsPDF;
    restore(): jsPDF;
    rotate(angle: number, x: number, y: number): jsPDF;
  }

  export class jsPDF implements jsPDFStatic {
    constructor(options?: { 
      orientation?: 'p' | 'portrait' | 'l' | 'landscape';
      unit?: 'pt' | 'px' | 'in' | 'mm' | 'cm' | 'ex' | 'em' | 'pc';
      format?: string | [number, number];
      compress?: boolean;
    });
    
    text(text: string, x: number, y: number, options?: { 
      align?: 'left' | 'center' | 'right' | 'justify';
      baseline?: 'alphabetic' | 'ideographic' | 'bottom' | 'top' | 'middle';
      angle?: number;
      rotationDirection?: 0 | 1;
      isInputVisual?: boolean;
      isOutputVisual?: boolean;
    }): jsPDF;
    
    setFontSize(size: number): jsPDF;
    setTextColor(r: number, g: number, b: number): jsPDF;
    getNumberOfPages(): number;
    setPage(pageNumber: number): jsPDF;
    save(filename?: string): void;
    save(): jsPDF;
    restore(): jsPDF;
    rotate(angle: number, x: number, y: number): jsPDF;
    internal: {
      pageSize: {
        width: number;
        height: number;
        getWidth: () => number;
        getHeight: () => number;
      };
    };
  }
}

declare module 'jspdf-autotable' {
  export interface UserOptions {
    startY?: number;
    head?: TableData[][];
    body?: TableData[][];
    theme?: string;
  }
}

interface TableCell {
  content: string | number;
  styles?: {
    [key: string]: string | number | boolean;
  };
}

interface TableData {
  [key: string]: string | number;
} 