import React from 'react';
import { TicketStatus } from '../../types';
import { Lock, Clock, CheckCircle2, AlertCircle, PlayCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface StatusBadgeProps {
  status: TicketStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
}) => {
  const { t } = useLanguage();

  const config = {
    new: {
      label: t('status_new'),
      bg: 'bg-amber-50 text-amber-800 border-amber-200/80',
      dot: 'bg-amber-500',
      icon: Clock,
    },
    in_progress: {
      label: t('status_in_progress'),
      bg: 'bg-blue-50 text-blue-800 border-blue-200/80',
      dot: 'bg-blue-600',
      icon: PlayCircle,
    },
    pending: {
      label: t('status_pending_72h'),
      bg: 'bg-orange-50 text-orange-800 border-orange-200/80',
      dot: 'bg-orange-500',
      icon: AlertCircle,
    },
    resolved: {
      label: t('status_resolved'),
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      dot: 'bg-emerald-600',
      icon: CheckCircle2,
    },
    closed: {
      label: t('status_closed_perm'),
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      dot: 'bg-slate-400',
      icon: Lock,
    },
  }[status] || {
    label: status,
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
    dot: 'bg-slate-400',
    icon: Clock,
  };

  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-xs px-3 py-1.5 gap-2 font-semibold',
  }[size];

  const iconSizes = {
    sm: 11,
    md: 12,
    lg: 14,
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-2xs ${config.bg} ${sizeClasses} transition-all tracking-tight`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      {showIcon && <IconComponent size={iconSizes} className="shrink-0 opacity-80" />}
      <span>{config.label}</span>
    </span>
  );
};
