import React, { useState } from 'react';
import { WorkflowProvider } from '@/context/WorkflowContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Scene3D from '@/components/3d/Scene3D';
import WorkflowController from '@/components/ui/WorkflowController';
import AnalyticsPanel from '@/components/ui/AnalyticsPanel';
import StepDescription from '@/components/ui/StepDescription';
import { DashboardView, AnalyticsView, HealthView, FutureView } from '@/components/dashboard/ProjectContent';

import { Maximize2, Minimize2, X } from 'lucide-react';

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <WorkflowProvider>
      <div className="h-screen w-screen overflow-hidden bg-background grid-bg relative">
        <div className="h-full w-full flex">

          {/* Mobile Sidebar Overlay */}
          {!isFullScreen && isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          {/* Sidebar */}
          {!isFullScreen && (
            <div className={`
              fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:relative md:translate-x-0
              ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
              <div className="h-full relative">
                <Sidebar
                  activeTab={activeTab}
                  onTabChange={(tab) => {
                    setActiveTab(tab);
                    setIsMobileMenuOpen(false);
                  }}
                />
                {/* Mobile Close Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-4 right-[-40px] p-2 bg-background border border-border rounded-r-lg md:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0 h-full">
            {/* Header - Hidden in Full Screen */}
            {!isFullScreen && (
              <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
            )}

            {/* Main Area */}
            <main className={`flex-1 flex flex-col md:flex-row min-h-0 ${isFullScreen ? 'p-0' : 'p-2 md:p-4 gap-4'} overflow-hidden relative`}>
              {activeTab === 'workflow' ? (
                <div className={`flex flex-col md:flex-row w-full h-full ${isFullScreen ? '' : 'gap-4'} overflow-y-auto md:overflow-hidden`}>
                  {/* Left - 3D Scene */}
                  <div className={`flex-1 flex flex-col ${isFullScreen ? '' : 'gap-4'} min-h-[50vh] md:min-h-0 min-w-0`}>
                    {/* 3D Canvas */}
                    <div className={`flex-1 glass-panel ${isFullScreen ? 'rounded-none border-0' : 'rounded-xl'} overflow-hidden relative min-h-[300px]`}>
                      <Scene3D />

                      {/* Overlay Labels */}
                      {!isFullScreen && (
                        <div className="absolute top-4 left-4 glass-panel px-3 py-2 rounded-lg pointer-events-none">
                          <p className="text-[10px] md:text-xs text-muted-foreground">3D WORKFLOW</p>
                          <p className="text-xs md:text-sm font-orbitron neon-text-primary">System View</p>
                        </div>
                      )}

                      {/* Full Screen Toggle */}
                      <div className="absolute top-4 right-4 z-10">
                        <button
                          onClick={() => setIsFullScreen(!isFullScreen)}
                          className="glass-panel p-2.5 rounded-lg hover:bg-muted/20 transition-all duration-300 hover:scale-105 group"
                          title={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
                        >
                          {isFullScreen ? (
                            <Minimize2 className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover:text-primary" />
                          ) : (
                            <Maximize2 className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover:text-primary" />
                          )}
                        </button>
                      </div>

                      {/* Controls hint */}
                      {!isFullScreen && (
                        <div className="absolute bottom-4 left-4 glass-panel px-3 py-2 rounded-lg pointer-events-none hidden md:block">
                          <p className="text-xs text-muted-foreground">
                            🖱️ Drag to rotate • Scroll to zoom
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Bottom Controls */}
                    {!isFullScreen && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shrink-0">
                        <WorkflowController />
                        <StepDescription />
                      </div>
                    )}
                  </div>

                  {/* Right - Analytics Panel */}
                  {!isFullScreen && (
                    <div className="w-full md:w-80 h-auto md:h-full flex-shrink-0 overflow-y-auto custom-scrollbar pb-10 md:pb-0">
                      <AnalyticsPanel />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 glass-panel rounded-xl overflow-hidden p-1 w-full h-full">
                  {activeTab === 'dashboard' && <DashboardView />}
                  {activeTab === 'analytics' && <AnalyticsView />}
                  {activeTab === 'health' && <HealthView />}
                  {activeTab === 'future' && <FutureView />}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </WorkflowProvider>
  );
};

export default Index;
