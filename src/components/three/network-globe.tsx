"use client";

import { useState, useEffect, useRef } from "react";

interface LogEntry {
  time: string;
  type: "INFO" | "SUCCESS" | "WARN" | "ALERT" | "BLOCK";
  message: string;
}

interface TerminalView {
  command: string;
  header: string;
  gateway: string;
  target: string;
  latencyLabel: string;
  logs: Omit<LogEntry, "time">[];
}

const TERMINAL_VIEWS: TerminalView[] = [
  {
    command: "python toolkit.py --target paruluniversity.ac.in",
    header: "operator@kvr585:~ (cyber-recon-toolkit)",
    gateway: "recon.kvr585.dev",
    target: "paruluniversity.ac.in",
    latencyLabel: "WHOIS / DNS / Ports",
    logs: [
      { type: "INFO", message: "Initializing Cyber-Recon-Toolkit v1.4..." },
      { type: "INFO", message: "Executing target domain name lookup..." },
      { type: "SUCCESS", message: "WHOIS Lookup Completed (Registrar: GoDaddy)" },
      { type: "INFO", message: "Requesting active DNS zone transfers..." },
      { type: "SUCCESS", message: "DNS Enumeration: MX, NS, and 12 A-records resolved" },
      { type: "INFO", message: "Launching multi-threaded TCP SYN port scanner..." },
      { type: "SUCCESS", message: "Port Scanner: Detected 3 open ports [22/ssh, 80/http, 443/https]" },
      { type: "INFO", message: "Extracting banner headers from port 22..." },
      { type: "SUCCESS", message: "Banner Grabber: OpenSSH 8.9p1 Ubuntu-3ubuntu0.1" },
      { type: "INFO", message: "Compiling scanning telemetry report metrics..." },
      { type: "INFO", message: "Generating PDF Report (recon_report_paruluniversity.pdf)..." },
      { type: "SUCCESS", message: "Report Saved successfully in ./reports/ output directory." }
    ]
  },
  {
    command: "python leakage-detector.py --apk ./build/app-release.apk",
    header: "operator@kvr585:~ (credential-detector)",
    gateway: "static-analyzer.local",
    target: "app-release.apk",
    latencyLabel: "Bytecode Static Scan",
    logs: [
      { type: "INFO", message: "Initializing APK static decompilation engine..." },
      { type: "SUCCESS", message: "APK Analysis: AndroidManifest.xml parsed. Target SDK: 33" },
      { type: "INFO", message: "Extracting class resources and parsing DEX bytecode..." },
      { type: "SUCCESS", message: "Static Findings: Found 24 static strings, 8 dynamic endpoints" },
      { type: "WARN", message: "Scanning decompiled files for encryption keys..." },
      { type: "ALERT", message: "Credential Detection: Hardcoded AWS Access Token exposed in source!" },
      { type: "WARN", message: "Risk Score: 8.4/10 [HIGH THREAT CATEGORY]" },
      { type: "INFO", message: "Documenting bytecode vulnerability assessments..." },
      { type: "SUCCESS", message: "Generated Assessment Report: leaks_report_app-release.json" }
    ]
  },
  {
    command: "python pingbro.py --daemon",
    header: "operator@kvr585:~ (pingbro-service)",
    gateway: "pingbro.daemon",
    target: "localhost:8080",
    latencyLabel: "Win32 Process Daemon",
    logs: [
      { type: "INFO", message: "Launching PingBro background process daemon..." },
      { type: "SUCCESS", message: "Scheduler Started. Win32 Process Mutex lock obtained." },
      { type: "INFO", message: "Configuring user health reminders..." },
      { type: "SUCCESS", message: "Hydration Reminder active: triggered every 60 minutes." },
      { type: "INFO", message: "Initiating global system foreground window hook..." },
      { type: "WARN", message: "Fullscreen Detected: Active gaming process (chrome.exe) running." },
      { type: "SUCCESS", message: "Alarm Suppressed. Notification logs muted during fullscreen." },
      { type: "INFO", message: "Monitoring system tray input messages..." },
      { type: "SUCCESS", message: "System Tray Active. Footprint optimized to 12.4MB memory." }
    ]
  },
  {
    command: "git log -n 3 --oneline",
    header: "operator@kvr585:~ (git-activity)",
    gateway: "github.com/kvr585",
    target: "kvr585/portfolio",
    latencyLabel: "Commit Stream",
    logs: [
      { type: "INFO", message: "Syncing repository commit logs from github.com/kvr585..." },
      { type: "SUCCESS", message: "Current Project: Veera Bhadhra Rao Portfolio (master)" },
      { type: "SUCCESS", message: "kvr585/Cyber-Recon-Toolkit - commit 8c4a012: feat: add banner grab" },
      { type: "SUCCESS", message: "kvr585/PingBro - commit f930b21: fix: Win32 background hooks" },
      { type: "SUCCESS", message: "kvr585/Credential-Detector - commit 3d8e90a: docs: update README" },
      { type: "INFO", message: "Fetching daily code contribution metrics..." },
      { type: "SUCCESS", message: "Contribution Map synced: 52 commits recorded this week." }
    ]
  }
];

const RECON_SCAN_VIEW: TerminalView = {
  command: "recon-toolkit --target 192.168.1.1 --ports 1-1000 --verbose",
  header: "operator@kvr585:~ (RECON_SCAN_ACTIVE)",
  gateway: "recon.kvr585.dev",
  target: "192.168.1.1",
  latencyLabel: "Vulnerability Scan",
  logs: [
    { type: "INFO", message: "Launching external recon scan against 192.168.1.1..." },
    { type: "INFO", message: "Performing ping sweep to identify target state..." },
    { type: "SUCCESS", message: "Host is UP. RTT: 14.2ms" },
    { type: "INFO", message: "Starting multi-threaded TCP SYN port scan (ports 1-1000)..." },
    { type: "WARN", message: "Port 22/tcp [OPEN] - Service: OpenSSH 8.9p1" },
    { type: "WARN", message: "Port 80/tcp [OPEN] - Service: nginx/1.21.6" },
    { type: "WARN", message: "Port 443/tcp [OPEN] - Service: Cloudflare SSL Gateway" },
    { type: "SUCCESS", message: "Port scan complete. Found 3 open services." },
    { type: "INFO", message: "Running OS fingerprinting & header inspection..." },
    { type: "ALERT", message: "Vulnerability CVE-2022-22965 (Spring4Shell) suspected!" },
    { type: "BLOCK", message: "SECURITY REPORT LOGGED. Recon sweep phase complete." }
  ]
};

const BOOT_LOG_MESSAGES: Omit<LogEntry, "time">[] = [
  { type: "INFO", message: "BOOT: OPERATOR OS v1.0.0 (Intel-VT, ACPI, APIC)..." },
  { type: "INFO", message: "BOOT: Initializing socket mutex & process allocator..." },
  { type: "INFO", message: "BOOT: Loading smali class structures and expressions..." },
  { type: "INFO", message: "BOOT: Syncing threat signature definitions from recon.dev..." },
  { type: "SUCCESS", message: "BOOT: Secure socket connection established. Tunnel: OK" },
  { type: "SUCCESS", message: "BOOT: Daemon processes initialized. System state: OPERATIONAL" }
];

export function NetworkGlobe() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [viewIndex, setViewIndex] = useState(0);
  const [typedCommand, setTypedCommand] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  
  // Boot Sequence State
  const [isBooted, setIsBooted] = useState(false);
  const [bootIndex, setBootIndex] = useState(0);

  // Typing Animation State Machine Variables
  const [phase, setPhase] = useState<"typing" | "executing" | "logs" | "waiting">("typing");
  const [charIndex, setCharIndex] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [waitTime, setWaitTime] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 1. Initial Boot Sequence Loop
  useEffect(() => {
    if (isBooted) return;
    if (isPaused) return;

    if (bootIndex < BOOT_LOG_MESSAGES.length) {
      const timer = setTimeout(() => {
        const now = new Date();
        setLogs((prev) => [
          ...prev,
          {
            time: now.toTimeString().split(" ")[0],
            ...BOOT_LOG_MESSAGES[bootIndex]
          }
        ]);
        setBootIndex((prev) => prev + 1);
      }, bootIndex === 0 ? 100 : 380);
      return () => clearTimeout(timer);
    } else {
      // Wait 1.2s on complete boot screen, then transition
      const timer = setTimeout(() => {
        setIsBooted(true);
        setLogs([]);
        setPhase("typing");
        setCharIndex(0);
        setLogIndex(0);
        setTypedCommand("");
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [bootIndex, isBooted, isPaused]);

  // 2. Periodic updates: CLI command slideshow typing, delay execution, and logs printing
  useEffect(() => {
    if (!isBooted) return;
    if (isPaused) return;

    const activeView = isScanning ? RECON_SCAN_VIEW : TERMINAL_VIEWS[viewIndex];

    const timer = setTimeout(() => {
      if (phase === "typing") {
        if (charIndex < activeView.command.length) {
          setTypedCommand(activeView.command.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Command typed, transition to executing phase (delay process spin up)
          setPhase("executing");
          setWaitTime(0);
        }
      } else if (phase === "executing") {
        // Wait 500ms (simulate shell command load/initialization)
        if (waitTime < 1) {
          setWaitTime(waitTime + 1);
        } else {
          setPhase("logs");
          setLogIndex(0);
        }
      } else if (phase === "logs") {
        if (logIndex < activeView.logs.length) {
          const now = new Date();
          const nextLog = {
            time: now.toTimeString().split(" ")[0],
            ...activeView.logs[logIndex],
          };
          setLogs((prev) => [...prev, nextLog]);
          setLogIndex(logIndex + 1);
        } else {
          // Finished logs, decide loop path
          if (isScanning) {
            // End command scan sweep and return to normal loop
            setIsScanning(false);
            setPhase("typing");
            setCharIndex(0);
            setLogIndex(0);
            setTypedCommand("");
            setLogs([]);
          } else {
            // Wait 16 seconds on the finished log view (20 * 800ms)
            setPhase("waiting");
            setWaitTime(0);
          }
        }
      } else if (phase === "waiting") {
        if (waitTime < 20) {
          setWaitTime(waitTime + 1);
        } else {
          // Transition to next view in rotation
          setPhase("typing");
          setCharIndex(0);
          setLogIndex(0);
          setTypedCommand("");
          setLogs([]);
          setViewIndex((prev) => (prev + 1) % TERMINAL_VIEWS.length);
        }
      }
    }, phase === "typing" ? 25 : phase === "executing" ? 500 : phase === "logs" ? 300 : 800);

    return () => clearTimeout(timer);
  }, [viewIndex, phase, charIndex, logIndex, waitTime, isPaused, isScanning, isBooted]);

  // Listen for the custom command palette trigger event
  useEffect(() => {
    const handleScanTrigger = () => {
      if (!isBooted) setIsBooted(true); // Bypass boot if command executed
      setIsScanning(true);
      setPhase("typing");
      setCharIndex(0);
      setLogIndex(0);
      setTypedCommand("");
      setLogs([]);
    };
    window.addEventListener("trigger-terminal-scan", handleScanTrigger);
    return () => window.removeEventListener("trigger-terminal-scan", handleScanTrigger);
  }, [isBooted]);

  // Auto-scroll logs to bottom container element directly (prevents browser page jumping)
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const activeView = isScanning ? RECON_SCAN_VIEW : TERMINAL_VIEWS[viewIndex];

  const getTypeStyle = (type: LogEntry["type"]) => {
    if (type === "SUCCESS") return "text-emerald-400";
    if (type === "WARN") return "text-amber-500 font-semibold";
    if (type === "ALERT") return "text-orange-500 font-bold animate-pulse";
    if (type === "BLOCK") return "text-rose-500 font-bold";
    return "text-blue-400";
  };

  return (
    <div className="relative h-[320px] w-full md:h-[480px] lg:h-[560px] flex items-center justify-center p-2 select-none">
      
      {/* 1. Terminal Window Container */}
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="w-full h-full max-w-[560px] rounded-lg border border-zinc-800 bg-zinc-950/75 shadow-2xl backdrop-blur-md flex flex-col font-mono text-[11px] overflow-hidden leading-relaxed cursor-text"
      >
        
        {/* Terminal Header */}
        <div className="h-9 border-b border-zinc-800 bg-zinc-900/60 px-4 flex justify-between items-center shrink-0">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/20 border border-rose-500/40" />
            <span className="h-3 w-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
          </div>
          <span className="text-zinc-500 text-[10px] tracking-wide select-none">
            {!isBooted
              ? "operator@kvr585:~ (BOOT_SEQUENCE)"
              : isScanning
              ? "operator@kvr585:~ (RECON_SCAN_ACTIVE)"
              : isPaused
              ? `${activeView.header.split(" ")[0]} (PAUSED)`
              : activeView.header}
          </span>
          <span 
            className={`h-1.5 w-1.5 rounded-full ${
              !isBooted ? "bg-amber-400 animate-pulse" : isScanning ? "bg-rose-500 animate-ping" : isPaused ? "bg-amber-400" : "bg-emerald-400 animate-ping"
            }`} 
          />
        </div>

        {/* 2. Live Telemetry Summary Panel */}
        <div className="grid grid-cols-3 gap-1 border-b border-zinc-800 bg-zinc-950/40 p-3 text-[10px] text-zinc-400 shrink-0 select-none">
          <div className="border-r border-zinc-800/60 pr-2">
            <div>GATEWAY TUNNEL</div>
            <div className="font-semibold text-zinc-200 mt-0.5 truncate">
              {!isBooted ? "booting.kernel" : activeView.gateway}
            </div>
          </div>
          <div className="border-r border-zinc-800/60 px-2">
            <div>DIAGNOSTIC TARGET</div>
            <div className="font-semibold text-blue-400 mt-0.5 truncate">
              {!isBooted ? "127.0.0.1" : activeView.target}
            </div>
          </div>
          <div className="pl-2">
            <div>TELEMETRY LAYER</div>
            <div className="font-semibold text-emerald-400 mt-0.5 truncate">
              {!isBooted ? "System Booting..." : isScanning ? "Scan sweeps..." : activeView.latencyLabel}
            </div>
          </div>
        </div>

        {/* 3. Scrolling Logs Panel (Uses ref to set scrollTop directly) */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-1 text-zinc-300"
        >
          <div className="text-zinc-600 mb-2 border-b border-zinc-900 pb-1 select-none flex justify-between items-center text-[10px]">
            <span>
              {!isBooted
                ? "[!] INITIALIZING BOOT LOADERS..."
                : isScanning 
                ? "[!] RUNNING EXTERNAL THREAT AUDIT SIMULATION..." 
                : `[+] Active Telemetry Monitor: ${activeView.latencyLabel}`}
            </span>
            {isScanning ? (
              <span className="text-rose-400 text-[9px] animate-pulse">SCANNING PORT INTERFACES</span>
            ) : !isBooted ? (
              <span className="text-amber-500/70 text-[9px] animate-pulse">BOOT ACTIVE</span>
            ) : (
              isPaused && <span className="text-amber-500/70 text-[9px] animate-pulse">STREAM PAUSED</span>
            )}
          </div>
          
          {logs.map((log, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-zinc-600 shrink-0 select-none">[{log.time}]</span>
              <span className={`shrink-0 select-none ${getTypeStyle(log.type)}`}>
                [{log.type}]
              </span>
              <span className="text-zinc-200 break-all select-text">{log.message}</span>
            </div>
          ))}
        </div>

        {/* 4. Terminal Command Line Footer */}
        <div className="h-9 border-t border-zinc-900 bg-zinc-950/80 px-4 flex items-center gap-1.5 text-zinc-400 shrink-0 select-none">
          <span className="text-emerald-500 font-bold">$</span>
          <span className="text-zinc-300 truncate">
            {!isBooted ? "systemctl boot operator-daemon.service" : typedCommand}
          </span>
          <span className={`h-3.5 w-1.5 bg-emerald-400 ${isPaused && !isScanning ? "" : "animate-pulse"}`} />
        </div>
        
      </div>
      
      {/* Decorative Matrix Background Overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(18,24,38,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.1)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />
    </div>
  );
}
