import { jsPDF as JsPDF } from "jspdf";

export function addWatermark(doc: JsPDF) {
  const watermarkText = 'AI情感顾问 - 仅供参考';
  const pages = doc.getNumberOfPages();
  
  doc.setTextColor(200, 200, 200);
  doc.setFontSize(20);
  
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    
    // 添加对角线水印
    doc.save();
    doc.rotate(45, doc.internal.pageSize.width / 2, doc.internal.pageSize.height / 2);
    doc.text(
      watermarkText,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height / 2,
      { align: 'center' }
    );
    doc.restore();
  }
} 