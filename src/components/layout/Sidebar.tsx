import React from 'react';
import {
  LayoutDashboard,
  Play,
  BarChart3,
  HeartPulse,
  Rocket,
  ChevronRight,
  Sun
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'workflow', label: 'Live Workflow', icon: Play },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'health', label: 'System Health', icon: HeartPulse },
  { id: 'future', label: 'Future Scope', icon: Rocket },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {

  return (
    <aside className="w-64 glass-panel border-r border-border flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center">
              <Sun className="w-7 h-7 text-background" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-secondary border-2 border-background" />
          </div>
          <div>
            <h2 className="font-orbitron font-bold text-sm tracking-wider">TEAM</h2>
            <h2 className="font-orbitron font-bold text-sm tracking-wider neon-text-primary">SOLARIX</h2>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4 px-3">
          Navigation
        </p>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 transition-all",
                    isActive && "drop-shadow-[0_0_8px_hsl(var(--primary))]"
                  )} />
                  <span className="font-rajdhani font-medium">{item.label}</span>
                  <ChevronRight className={cn(
                    "w-4 h-4 ml-auto transition-all opacity-0 -translate-x-2",
                    isActive && "opacity-100 translate-x-0"
                  )} />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Team Info */}
      <div className="px-4 py-3 border-t border-border bg-muted/5">
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2">
            <div>
              <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Institution</h3>
              <p className="text-xs text-primary font-bold font-orbitron tracking-wide">PSIT CHE</p>
            </div>

          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="p-4 border-t border-border">
        <div className="glass-panel p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground uppercase">System Load</span>
            <span className="text-xs font-orbitron text-primary">42%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              style={{ width: '42%' }}
            />
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Arduino UNO R3 • Connected
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
