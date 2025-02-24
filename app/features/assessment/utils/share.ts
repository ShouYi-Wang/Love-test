import { AssessmentResult } from '../types';
import { SHARE_CONFIG } from '../constants';

interface ShareData {
  title: string;
  text: string;
  url: string;
}

export async function shareResults(result: AssessmentResult): Promise<void> {
  const text = SHARE_CONFIG.template
    .replace('{score}', result.overallScore.toString())
    .replace('{strengths}', result.strengthAreas.join(', '));

  const shareData: ShareData = {
    title: SHARE_CONFIG.title,
    text,
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(text);
      alert('结果已复制到剪贴板!');
    }
  } catch (err) {
    throw new Error('分享失败: ' + (err as Error).message);
  }
} 