"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowUpRight,
  Copy,
  Download,
  FolderGit2,
  Mail,
  Search,
  Terminal,
  User,
} from "lucide-react";
import { projects } from "@/lib/constants/projects";
import { siteConfig } from "@/lib/constants/site";
import { skills } from "@/lib/constants/skills";
import { achievements } from "@/lib/constants/achievements";
import { useCommandPalette } from "@/components/providers/app-providers";
import { useLenis } from "@/components/providers/lenis-provider";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const { stop, start } = useLenis();
  const [toast, setToast] = useState<string | null>(null);
  const [reconRunning, setReconRunning] = useState(false);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const scrollTo = useCallback(
    (id: string) => {
      setOpen(false);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    },
    [setOpen]
  );

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(siteConfig.links.email);
    showToast(`Copied ${siteConfig.links.email}`);
    setOpen(false);
  }, [showToast, setOpen]);

  const runRecon = useCallback(() => {
    setReconRunning(true);
    // Dispatch event to start scan trace inside the hero terminal
    window.dispatchEvent(new CustomEvent("trigger-terminal-scan"));
    setTimeout(() => {
      setReconRunning(false);
      setOpen(false);
      // Smooth scroll to the top hero section to watch the scan execute
      document.getElementById("operator-profile")?.scrollIntoView({ behavior: "smooth" });
    }, 1200);
  }, [setOpen]);



  useEffect(() => {
    const seen = localStorage.getItem("operator-cmd-hint");
    if (!seen) {
      const timer = setTimeout(() => {
        showToast("Tip: Press ⌘K to navigate");
        localStorage.setItem("operator-cmd-hint", "1");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search commands, projects, skills..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {reconRunning && (
            <div className="px-4 py-3 font-mono text-xs text-accent-amber">
              <p>Running recon scan...</p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-border-subtle">
                <div className="h-full w-full animate-pulse bg-accent-amber" />
              </div>
            </div>
          )}

          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => scrollTo("operator-profile")}>
              <User className="h-4 w-4 text-text-tertiary" />
              <span>about</span>
              <span className="ml-auto text-xs text-text-muted">Operator profile</span>
            </CommandItem>
            <CommandItem onSelect={() => scrollTo("deployments")}>
              <FolderGit2 className="h-4 w-4 text-text-tertiary" />
              <span>deployments</span>
              <span className="ml-auto text-xs text-text-muted">All projects</span>
            </CommandItem>
            <CommandItem onSelect={() => scrollTo("capabilities")}>
              <Terminal className="h-4 w-4 text-text-tertiary" />
              <span>stack</span>
              <span className="ml-auto text-xs text-text-muted">Capabilities</span>
            </CommandItem>
            <CommandItem onSelect={() => scrollTo("establish-connection")}>
              <Mail className="h-4 w-4 text-text-tertiary" />
              <span>contact</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Deployments">
            {projects.map((project) => (
              <CommandItem
                key={project.id}
                onSelect={() => scrollTo(`project-${project.slug}`)}
              >
                <span className="font-mono text-xs text-text-muted">{project.number}</span>
                <span>{project.name}</span>
                <span className="ml-auto truncate text-xs text-text-muted max-w-[140px]">
                  {project.tagline.slice(0, 40)}...
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={runRecon}>
              <Search className="h-4 w-4 text-accent-amber" />
              <span>recon</span>
              <span className="ml-auto text-xs text-text-muted">Run scan demo</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.open(siteConfig.links.github, "_blank"); setOpen(false); }}>
              <ArrowUpRight className="h-4 w-4" />
              <span>connect github</span>
            </CommandItem>
            <CommandItem onSelect={copyEmail}>
              <Copy className="h-4 w-4" />
              <span>copy email</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.open("/resume.pdf", "_blank"); setOpen(false); }}>
              <Download className="h-4 w-4" />
              <span>resume</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Skills">
            {skills.slice(0, 6).map((skill) => (
              <CommandItem key={skill.id} onSelect={() => scrollTo("capabilities")}>
                <span>{skill.name}</span>
                <span className="ml-auto text-xs text-text-muted">{skill.context[0]}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Compete">
            {achievements.filter((a) => a.type === "event").map((a) => (
              <CommandItem key={a.id} onSelect={() => scrollTo("verified-events")}>
                <span>{a.title}</span>
                <span className="ml-auto text-xs text-text-muted">{a.subtitle}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl glass px-4 py-2.5 font-mono text-xs text-text-primary shadow-xl">
          {toast}
        </div>
      )}
    </>
  );
}
