/**
 * Pull-to-Refresh Component
 * Visual indicator for pull-to-refresh gesture
 */

import { RefreshCw } from 'lucide-react';

interface PullToRefreshIndicatorProps {
  pullDistance: number;
  isRefreshing: boolean;
  progress: number;
  threshold?: number;
}

export const PullToRefreshIndicator = ({
  pullDistance,
  isRefreshing,
  progress,
  threshold = 80
}: PullToRefreshIndicatorProps) => {
  if (pullDistance === 0 && !isRefreshing) return null;

  const rotation = progress * 180;
  const scale = 0.5 + progress * 0.5;
  const opacity = Math.min(progress * 1.5, 1);

  return (
    <div 
      className="ptr-indicator"
      style={{
        transform: `translateY(${Math.min(pullDistance, threshold)}px)`,
        opacity
      }}
    >
      <div 
        className={`ptr-spinner ${isRefreshing ? 'spinning' : ''}`}
        style={{
          transform: `rotate(${rotation}deg) scale(${scale})`
        }}
      >
        <RefreshCw size={24} />
      </div>
      {!isRefreshing && progress >= 1 && (
        <span className="ptr-text">Release to refresh</span>
      )}
      {isRefreshing && (
        <span className="ptr-text">Refreshing...</span>
      )}
    </div>
  );
};

export default PullToRefreshIndicator;
