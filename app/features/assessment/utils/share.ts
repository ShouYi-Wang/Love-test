import { AssessmentResult } from '../types';
import { SHARE_CONFIG } from '../constants';

export async function shareResults(result: AssessmentResult) {
  const text = SHARE_CONFIG.template
    .replace('{score}', result.overallScore.toString())
    .replace('{strengths}', result.strengthAreas.join(', '));

  if (navigator.share) {
    try {
      await navigator.share({
        title: SHARE_CONFIG.title,
        text,
        url: window.location.href
      });
    } catch (err) {
      throw new Error('分享失败: ' + (err as Error).message);
    }
  } else {
    try {
      await navigator.clipboard.writeText(text);
      alert('结果已复制到剪贴板!');
    } catch (err) {
      throw new Error('复制到剪贴板失败: ' + (err as Error).message);
    }
  }
} 