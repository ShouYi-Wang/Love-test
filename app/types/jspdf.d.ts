declare module 'jspdf' {
  interface jsPDFAPI {
    autoTable: (options: {
      startY?: number;
      head?: any[][];
      body?: any[][];
      theme?: string;
      finalY?: number;
    }) => { finalY: number };
  }

  export class jsPDF {
    constructor(options?: { orientation?: string; unit?: string; format?: string });
    text(text: string, x: number, y: number, options?: { align?: string }): jsPDF;
    setFontSize(size: number): jsPDF;
    setTextColor(r: number, g: number, b: number): jsPDF;
    addPage(): jsPDF;
    save(filename?: string): void;
    getNumberOfPages(): number;
    setPage(pageNumber: number): jsPDF;
    internal: {
      pageSize: {
        width: number;
        height: number;
      };
    };
    save(): void;
    restore(): void;
    rotate(angle: number, x: number, y: number): jsPDF;
    autoTable: jsPDFAPI['autoTable'];
  }
  export default jsPDF;
}

declare module 'jspdf-autotable' {
  export interface UserOptions {
    startY?: number;
    head?: any[][];
    body?: any[][];
    theme?: string;
  }
}

interface TableRow {
  [key: string]: string | number;
}

interface AutoTableOptions {
  startY?: number;
  head?: TableRow[][];
  body?: TableRow[][];
  theme?: string;
  finalY?: number;
} 