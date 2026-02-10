import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, change, colorClass = 'text-indigo-600' }) => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] transition-all duration-300 p-6 group">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                        {title}
                    </p>
                    <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white ">
                        {value}
                    </h3>
                </div>
                <div className={`w-14 h-12 rounded-2xl ${colorClass.replace('text-', 'bg-')}/10 flex items-center justify-center group-hover:rotate-12 transition-all duration-500`}>
                    <Icon className={`w-7 h-7 ${colorClass}`} />
                </div>
            </div>

            {change !== undefined && (
                <div className="flex items-center gap-1.5 mt-4">
                    <span className={`flex items-center justify-center w-6 h-6 rounded-full ${change >= 0 ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30' : 'bg-rose-50 text-rose-600 dark:bg-rose-900/30'}`}>
                        {change >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    </span>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        <span className={change >= 0 ? 'text-emerald-600' : 'text-rose-600'}>{Math.abs(change)}%</span>
                        <span className="ml-1 font-medium opacity-60">vs last period</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default StatCard;
