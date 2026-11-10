import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface CountdownTimerProps {
  targetIsoDate?: string;
  className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetIsoDate,
  className = '',
}) => {
  const { t, language } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number; isExpired: boolean }>({
    hours: 72,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    if (!targetIsoDate) return;

    const calculate = () => {
      const targetTime = new Date(targetIsoDate).getTime();
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ hours, minutes, seconds, isExpired: false });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetIsoDate]);

  if (timeLeft.isExpired) {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200 ${className}`}>
        <AlertTriangle size={13} className="shrink-0" />
        <span>{t('timer_72h_expired')}</span>
      </span>
    );
  }

  const isUrgent = timeLeft.hours < 24;

  const hoursLabel = language === 'en' ? 'h' : 'giờ';
  const minsLabel = language === 'en' ? 'm' : 'phút';

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border ${
        isUrgent
          ? 'bg-orange-50 text-orange-800 border-orange-200 animate-pulse'
          : 'bg-amber-50 text-amber-900 border-amber-200'
      } ${className}`}
    >
      <Clock size={13} className="shrink-0" />
      <span>
        {t('timer_remaining')}:{' '}
        <strong className="font-semibold">
          {timeLeft.hours} {hoursLabel} {timeLeft.minutes} {minsLabel} {timeLeft.seconds}s
        </strong>
      </span>
    </span>
  );
};
