'use client';

interface RetryButtonProps {
  onRetry: () => void;
  className?: string;
}

export default function RetryButton({ onRetry, className = '' }: RetryButtonProps) {
  return (
    <button
      type="button"
      onClick={onRetry}
      className={`px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark ${className}`}
    >
      重试
    </button>
  );
} 