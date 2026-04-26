'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const DEFAULT_PROJECTS = [
  { id: 'image', name: 'Image Studio', description: 'Generate images from text or edit existing images', icon: '🖼️', path: '/studio/image', color: 'from-pink-500 to-rose-500' },
  { id: 'video', name: 'Video Studio', description: 'Create videos from text prompts or animate images', icon: '🎬', path: '/studio/video', color: 'from-purple-500 to-indigo-500' },
  { id: 'lipsync', name: 'Lip Sync Studio', description: 'Animate portraits or sync lips to audio', icon: '👄', path: '/studio/lipsync', color: 'from-orange-500 to-amber-500' },
  { id: 'cinema', name: 'Cinema Studio', description: 'Photorealistic cinematic shots with pro camera controls', icon: '🎥', path: '/studio/cinema', color: 'from-blue-500 to-cyan-500' },
  { id: 'marketing', name: 'Marketing Studio', description: 'Create marketing materials and ads', icon: '📢', path: '/studio/marketing', color: 'from-green-500 to-emerald-500' },
  { id: 'workflows', name: 'Workflows', description: 'Build and run multi-step AI pipelines', icon: '⚡', path: '/studio/workflows', color: 'from-yellow-400 to-orange-500' },
  { id: 'agents', name: 'Agents', description: 'AI agents for automated tasks', icon: '🤖', path: '/studio/agents', color: 'from-red-500 to-pink-500' },
];

const STORAGE_KEY = 'muapi_projects';

export default function ProjectsDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Load projects from localStorage
  useEffect(() => {
    setHasMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Merge with defaults to ensure all projects are available
        const defaultIds = DEFAULT_PROJECTS.map(p => p.id);
        const merged = [...DEFAULT_PROJECTS];
        
        // Add any custom ordering or favorites from stored data
        parsed.forEach(customProj => {
          const idx = merged.findIndex(p => p.id === customProj.id);
          if (idx !== -1 && customProj.favorite) {
            merged[idx].favorite = true;
          }
        });
        
        setProjects(merged);
      } catch (e) {
        setProjects(DEFAULT_PROJECTS);
      }
    } else {
      setProjects(DEFAULT_PROJECTS);
    }
  }, []);

  const handleProjectClick = useCallback((path) => {
    router.push(path);
  }, [router]);

  const toggleFavorite = useCallback((projectId) => {
    setProjects(prev => {
      const updated = prev.map(p => 
        p.id === projectId ? { ...p, favorite: !p.favorite } : p
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetToDefaults = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProjects(DEFAULT_PROJECTS);
  }, []);

  if (!hasMounted) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="animate-spin text-[#d9ff00] text-3xl">◌</div>
    </div>
  );

  const favoriteProjects = projects.filter(p => p.favorite);
  const otherProjects = projects.filter(p => !p.favorite);

  return (
    <div className="min-h-screen bg-[#030303] text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#d9ff00] to-green-400 bg-clip-text text-transparent mb-2">
              Projects Dashboard
            </h1>
            <p className="text-white/50 text-lg">
              Quick access to your AI studios and workflows
            </p>
          </div>
          <button
            onClick={resetToDefaults}
            className="px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
          >
            Reset Layout
          </button>
        </div>
      </div>

      {/* Favorites Section */}
      {favoriteProjects.length > 0 && (
        <div className="max-w-7xl mx-auto mb-12">
          <h2 className="text-xl font-bold text-white/80 mb-6 flex items-center gap-2">
            <span className="text-yellow-400">⭐</span> Favorites
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleProjectClick(project.path)}
                onToggleFavorite={() => toggleFavorite(project.id)}
                isFavorite={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Projects Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-white/80 mb-6 flex items-center gap-2">
          <span className="text-blue-400">📁</span> All Studios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {otherProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project.path)}
              onToggleFavorite={() => toggleFavorite(project.id)}
              isFavorite={false}
            />
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="max-w-7xl mx-auto mt-12">
        <div className="bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white/90 mb-3">💡 Quick Tips</h3>
          <ul className="space-y-2 text-white/60 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-[#d9ff00]">•</span>
              Click the star icon on any project to add it to your favorites
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d9ff00]">•</span>
              Favorite projects appear at the top for quick access
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d9ff00]">•</span>
              Your layout preferences are saved automatically
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick, onToggleFavorite, isFavorite }) {
  return (
    <div 
      className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      {/* Favorite button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
      >
        <span className={`text-lg ${isFavorite ? 'scale-110' : 'grayscale opacity-30'} transition-all`}>
          ⭐
        </span>
      </button>

      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
        {project.icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#d9ff00] transition-colors">
        {project.name}
      </h3>
      <p className="text-white/50 text-sm leading-relaxed">
        {project.description}
      </p>

      {/* Arrow indicator */}
      <div className="mt-4 flex items-center gap-2 text-[#d9ff00]/60 group-hover:text-[#d9ff00] transition-colors text-sm font-medium">
        <span>Open Studio</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
  );
}
