import { jsPDF as JsPDF } from "jspdf";
import 'jspdf-autotable';
import { AssessmentResult } from '../types';
import { DIMENSION_LABELS, SCORE_LEVELS } from '../constants';
import { addWatermark } from './watermark';

export async function generatePDF(result: AssessmentResult) {
  const doc = new JsPDF();
  let currentY = 80;
  
  // 添加标题
  doc.setFontSize(20);
  doc.text('AI情感顾问测评报告', 105, 20, { align: 'center' });
  
  // 总体评分
  doc.setFontSize(16);
  doc.text('总体契合度评分', 20, 40);
  doc.setFontSize(14);
  const scoreLevel = Object.entries(SCORE_LEVELS)
    .find(([, { min }]) => result.overallScore >= min)?.[1]?.label || SCORE_LEVELS.POOR.label;
  doc.text(`${result.overallScore}分 - ${scoreLevel}`, 20, 50);

  // 维度分数
  doc.setFontSize(16);
  doc.text('维度详细分析', 20, 70);
  const dimensionData = Object.entries(result.dimensionScores).map(([key, score]) => [
    DIMENSION_LABELS[key as keyof typeof DIMENSION_LABELS],
    `${score}分`
  ]);
  
  // 添加类型定义
  interface AutoTableOptions {
    startY: number;
    head: string[][];
    body: string[][];
    theme: string;
  }

  const table = (doc as unknown as { autoTable: (options: AutoTableOptions) => { finalY: number } })
    .autoTable({
      startY: currentY,
      head: [['维度', '得分']],
      body: dimensionData,
      theme: 'grid'
    });
  
  currentY = (table?.finalY || currentY) + 20;

  // 优势领域
  doc.setFontSize(16);
  doc.text('优势领域', 20, currentY);
  result.strengthAreas.forEach((strength) => {
    currentY += 10;
    doc.setFontSize(12);
    doc.text(`• ${strength}`, 25, currentY);
  });

  currentY += 20;

  // 需要关注
  doc.setFontSize(16);
  doc.text('需要关注', 20, currentY);
  result.riskAreas.forEach((risk) => {
    currentY += 10;
    doc.setFontSize(12);
    doc.text(`• ${risk}`, 25, currentY);
  });

  // 改善建议
  doc.addPage();
  currentY = 20;
  
  doc.setFontSize(16);
  doc.text('改善建议', 20, currentY);

  // 短期建议
  currentY += 15;
  doc.setFontSize(14);
  doc.text('短期行动计划:', 20, currentY);
  result.recommendations.shortTerm.forEach((item) => {
    currentY += 10;
    doc.setFontSize(12);
    doc.text(`• ${item}`, 25, currentY);
  });

  // 长期建议
  currentY += 20;
  doc.setFontSize(14);
  doc.text('长期发展建议:', 20, currentY);
  result.recommendations.longTerm.forEach((item) => {
    currentY += 10;
    doc.setFontSize(12);
    doc.text(`• ${item}`, 25, currentY);
  });

  // 具体步骤
  currentY += 20;
  doc.setFontSize(14);
  doc.text('具体实践步骤:', 20, currentY);
  result.recommendations.practicalSteps.forEach((item) => {
    currentY += 10;
    doc.setFontSize(12);
    doc.text(`• ${item}`, 25, currentY);
  });

  // 添加页脚
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `第 ${i} 页 / 共 ${pageCount} 页`,
      105,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }

  // 添加水印
  addWatermark(doc);

  return doc;
} 