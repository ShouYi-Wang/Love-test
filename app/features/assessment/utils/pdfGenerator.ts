import { AssessmentResult } from '../types';
import { jsPDF } from 'jspdf';
import { DIMENSION_LABELS, SCORE_LEVELS } from '../constants';
import { addWatermark } from './watermark';

export async function generatePDF(result: AssessmentResult): Promise<jsPDF> {
  // 创建新的 PDF 文档
  const doc = new jsPDF();
  
  // 设置字体
  doc.setFont('helvetica');
  
  // 添加标题
  doc.setFontSize(20);
  doc.text('AI情感顾问测评报告', 105, 20, { align: 'center' });
  
  // 添加总体评分
  doc.setFontSize(16);
  doc.text('总体契合度评分', 20, 40);
  doc.setFontSize(14);
  const scoreLevel = Object.entries(SCORE_LEVELS)
    .find(([, { min }]) => result.overallScore >= min)?.[1]?.label || SCORE_LEVELS.POOR.label;
  doc.text(`${result.overallScore}分 - ${scoreLevel}`, 20, 50);
  
  // 添加维度分析
  doc.setFontSize(16);
  doc.text('维度对比分析', 20, 70);
  doc.setFontSize(12);
  let y = 80;
  Object.entries(result.dimensionScores).forEach(([dimension, score]) => {
    const label = dimension === 'personality' ? '性格特质' :
                 dimension === 'lifestyle' ? '生活习惯' :
                 dimension === 'values' ? '价值观念' :
                 dimension === 'communication' ? '沟通方式' : '成长意愿';
    doc.text(`${label}: ${score}分`, 20, y);
    y += 10;
  });
  
  // 添加优势领域
  doc.setFontSize(16);
  doc.text('优势领域', 20, y + 10);
  doc.setFontSize(12);
  y += 20;
  result.strengthAreas.forEach(strength => {
    doc.text(`• ${strength}`, 20, y);
    y += 10;
  });
  
  // 添加需要关注的领域
  doc.setFontSize(16);
  doc.text('需要关注', 20, y + 10);
  doc.setFontSize(12);
  y += 20;
  result.riskAreas.forEach(risk => {
    doc.text(`• ${risk}`, 20, y);
    y += 10;
  });
  
  // 添加改善建议
  if (y > 250) {
    doc.addPage();
    y = 20;
  }
  
  doc.setFontSize(16);
  doc.text('改善建议', 20, y + 10);
  doc.setFontSize(12);
  y += 20;
  
  // 短期建议
  doc.text('短期行动计划:', 20, y);
  y += 10;
  result.recommendations.shortTerm.forEach(item => {
    doc.text(`• ${item}`, 25, y);
    y += 10;
  });
  
  // 长期建议
  y += 5;
  doc.text('长期发展建议:', 20, y);
  y += 10;
  result.recommendations.longTerm.forEach(item => {
    doc.text(`• ${item}`, 25, y);
    y += 10;
  });
  
  // 具体步骤
  if (y > 250) {
    doc.addPage();
    y = 20;
  }
  
  y += 5;
  doc.text('具体实践步骤:', 20, y);
  y += 10;
  result.recommendations.practicalSteps.forEach(item => {
    doc.text(`• ${item}`, 25, y);
    y += 10;
  });
  
  // 添加页脚
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `第 ${i} 页 / 共 ${pageCount} 页`,
      105,
      290,
      { align: 'center' }
    );
  }
  
  // 添加水印
  addWatermark(doc);
  
  return doc;
} 