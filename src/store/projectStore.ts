"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SECTION_CONFIGS, type Project, type MasterStyle, type Section } from "@/types";

interface ProjectStore {
  projects: Project[];
  currentProjectId: string | null;
  currentSectionIndex: number;
  createProject: (data: Omit<Project, "masterStyle" | "sections" | "createdAt">) => string;
  updateMasterStyle: (id: string, style: MasterStyle) => void;
  updateSection: (projectId: string, sectionId: string, data: Partial<Section>) => void;
  reorderSections: (projectId: string, from: number, to: number) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (id: string) => void;
  setCurrentSectionIndex: (idx: number) => void;
  getProject: (id: string) => Project | undefined;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],
      currentProjectId: null,
      currentSectionIndex: 0,

      createProject(data) {
        const sections: Section[] = SECTION_CONFIGS.map((c) => ({
          id: `${c.type}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          type: c.type,
          status: "idle",
          userInputs: {},
          uploadedImages: [],
        }));
        const project: Project = {
          ...data,
          masterStyle: {
            designStyle: "premium-minimal",
            mainColor: "#2D3748",
            backgroundStyle: "white",
            fontMood: "clean-gothic",
            tone: "trust",
          },
          sections,
          createdAt: Date.now(),
        };
        set((s) => ({ projects: [project, ...s.projects], currentProjectId: project.id, currentSectionIndex: 0 }));
        return project.id;
      },

      updateMasterStyle(id, style) {
        set((s) => ({
          projects: s.projects.map((p) => (p.id === id ? { ...p, masterStyle: style } : p)),
        }));
      },

      updateSection(projectId, sectionId, data) {
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === projectId
              ? { ...p, sections: p.sections.map((sec) => (sec.id === sectionId ? { ...sec, ...data } : sec)) }
              : p
          ),
        }));
      },

      reorderSections(projectId, from, to) {
        set((s) => ({
          projects: s.projects.map((p) => {
            if (p.id !== projectId) return p;
            const sections = [...p.sections];
            const [moved] = sections.splice(from, 1);
            sections.splice(to, 0, moved);
            return { ...p, sections };
          }),
        }));
      },

      deleteProject(id) {
        set((s) => ({ projects: s.projects.filter((p) => p.id !== id) }));
      },

      setCurrentProject(id) {
        set({ currentProjectId: id, currentSectionIndex: 0 });
      },

      setCurrentSectionIndex(idx) {
        set({ currentSectionIndex: idx });
      },

      getProject(id) {
        return get().projects.find((p) => p.id === id);
      },
    }),
    {
      name: "jayoung-projects",
      partialize: (state) => ({
        ...state,
        projects: state.projects.map((p) => ({
          ...p,
          sections: p.sections.map((s) => ({
            ...s,
            generatedImageUrl: undefined,
          })),
        })),
      }),
    }
  )
);
