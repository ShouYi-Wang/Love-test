import { jsPDF } from "jspdf";

export function addWatermark(doc: jsPDF): void {
  const watermarkText = 'AI情感顾问 - 仅供参考';
  const pages = doc.getNumberOfPages();
  
  doc.setTextColor(200, 200, 200);
  doc.setFontSize(20);
  
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    
    // 添加对角线水印
    const x = doc.internal.pageSize.width / 2;
    const y = doc.internal.pageSize.height / 2;
    
    // 保存当前状态
    (doc as unknown as { save(): void }).save();
    
    // 旋转
    (doc as unknown as { rotate(angle: number, x: number, y: number): void })
      .rotate(45, x, y);
    
    // 添加文本
    doc.text(watermarkText, x, y, { align: 'center' });
    
    // 恢复状态
    (doc as unknown as { restore(): void }).restore();
  }
} 