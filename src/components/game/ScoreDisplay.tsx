
import React from 'react';
import { Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className={cn(
      "bg-amber-50 rounded-full border border-amber-200 py-2 px-4",
      "flex items-center shadow-sm hover:shadow transition-all duration-300",
      score > 0 && "animate-pulse-soft"
    )}>
      <Coins className="text-amber-500 mr-2" size={18} />
      <span className="font-bold text-xl">{score}</span>
    </div>
  );
};

export default ScoreDisplay;
