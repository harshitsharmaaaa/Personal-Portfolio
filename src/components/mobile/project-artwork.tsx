"use client";

/**
 * Designed, project-specific diagrams. These are illustrations of the systems
 * described in the repository data — not screenshots of an application.
 */
export default function ProjectArtwork({
  projectId,
  color,
  title,
}: {
  projectId: string;
  color: string;
  title: string;
}) {
  return (
    <svg
      className="rail-art"
      viewBox="0 0 640 360"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Designed system illustration for ${title}`}
    >
      <defs>
        <linearGradient id="art-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b1530" />
          <stop offset="55%" stopColor="#0a1226" />
          <stop offset="100%" stopColor="#131d38" />
        </linearGradient>
        <radialGradient id="art-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={color} stopOpacity="0.26" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <pattern id="art-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1" />
        </pattern>
        <linearGradient id="art-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b2b4c" />
          <stop offset="100%" stopColor="#0d172c" />
        </linearGradient>
      </defs>

      <rect width="640" height="360" fill="url(#art-bg)" />
      <rect width="640" height="360" fill="url(#art-grid)" />
      <rect width="640" height="360" fill="url(#art-glow)" />
      <circle cx="320" cy="170" r="150" fill="none" stroke={color} strokeOpacity="0.16" strokeWidth="1" />
      <circle cx="320" cy="170" r="108" fill="none" stroke={color} strokeOpacity="0.1" strokeWidth="1" />
      <text x="24" y="338" fill="#7f92b5" fontSize="11" fontFamily="ui-monospace, monospace" letterSpacing="2">
        DESIGNED SYSTEM VISUAL
      </text>
      <text x="616" y="338" textAnchor="end" fill={color} fontSize="11" fontFamily="ui-monospace, monospace" letterSpacing="2">
        {projectId.toUpperCase()}
      </text>

      {projectId === "blackbox" && <BlackBoxArt color={color} />}
      {projectId === "keymesh" && <KeyMeshArt color={color} />}
      {projectId === "ai-work-flow" && <WorkflowArt color={color} />}
      {projectId === "crypt" && <CryptArt color={color} />}
      {projectId === "rate-limiter" && <RateLimiterArt color={color} />}
      {projectId === "solana-notes" && <NotesArt color={color} />}
    </svg>
  );
}

function NodeBox({
  x,
  y,
  w,
  h,
  color,
  label,
  sub,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  label: string;
  sub?: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx="10" fill="url(#art-panel)" stroke={color} strokeOpacity="0.6" />
      <rect width={w} height="4" rx="2" fill={color} />
      <text x="14" y="28" fill="#eaf1ff" fontSize="14" fontFamily="ui-monospace, monospace" fontWeight="700">
        {label}
      </text>
      {sub && (
        <text x="14" y="48" fill="#8fa5c9" fontSize="10" fontFamily="ui-monospace, monospace">
          {sub}
        </text>
      )}
    </g>
  );
}

function Flow({ d, color }: { d: string; color: string }) {
  return (
    <g fill="none" stroke={color} strokeWidth="2">
      <path d={d} strokeOpacity="0.25" />
      <path className="art-flow" d={d} strokeDasharray="7 9" />
    </g>
  );
}

function BlackBoxArt({ color }: { color: string }) {
  return (
    <g>
      <NodeBox x={30} y={78} w={170} h={104} color={color} label="REQUEST" sub="POST /execute" />
      <g fill="#7f97bd" fontSize="10" fontFamily="ui-monospace, monospace">
        <text x="44" y="132">01  validate payload</text>
        <text x="44" y="150">02  persist state</text>
        <text x="44" y="168">03  enqueue job</text>
      </g>
      <Flow d="M200 130 C 240 130, 240 178, 276 178" color={color} />
      <NodeBox x={276} y={126} w={120} h={104} color="#f4c04f" label="BULLMQ" sub="Redis queue" />
      <Flow d="M396 178 C 430 178, 430 130, 466 130" color={color} />
      <NodeBox x={466} y={78} w={144} h={104} color="#f05257" label="SANDBOX" sub="ephemeral Docker" />
      <g transform="translate(478 196)">
        {["PY", "JS", "C++", "JV"].map((lang, i) => (
          <g key={lang} transform={`translate(${i * 34} 0)`}>
            <rect width="28" height="24" rx="5" fill="#16223e" stroke="#f05257" strokeOpacity="0.5" />
            <text x="14" y="16" textAnchor="middle" fill="#ffc9c9" fontSize="9" fontFamily="ui-monospace, monospace">{lang}</text>
          </g>
        ))}
      </g>
      <g transform="translate(276 244)">
        <rect width="334" height="62" rx="10" fill="#0c1428" stroke={color} strokeOpacity="0.35" />
        <text x="16" y="24" fill="#a8bfe4" fontSize="11" fontFamily="ui-monospace, monospace">POSTGRESQL  ·  execution status &amp; logs</text>
        <text x="16" y="44" fill="#6f86ad" fontSize="10" fontFamily="ui-monospace, monospace">QUEUED → RUNNING → COMPLETED / TIMEOUT / MEMORY_LIMIT</text>
      </g>
      <g transform="translate(52 216)" stroke="#ffd06e" fill="none" strokeWidth="1.6">
        <path d="M0 12 V5 A11 11 0 0 1 22 5 V12" />
        <rect x="-5" y="12" width="32" height="24" rx="5" fill="#1a2340" />
        <circle cx="11" cy="23" r="2.5" fill="#ffd06e" />
      </g>
    </g>
  );
}

function KeyMeshArt({ color }: { color: string }) {
  return (
    <g>
      {[
        { x: 118, label: "A" },
        { x: 320, label: "B" },
        { x: 522, label: "C" },
      ].map((node) => (
        <g key={node.label}>
          <Flow d={`M${node.x} 138 C ${node.x} 178, 320 160, 320 196`} color={color} />
          <circle cx={node.x} cy="116" r="30" fill="#13203c" stroke={color} strokeWidth="2" />
          <text x={node.x} y="123" textAnchor="middle" fill="#ddfff0" fontSize="18" fontFamily="ui-monospace, monospace" fontWeight="700">{node.label}</text>
          <text x={node.x} y="164" textAnchor="middle" fill="#8fa5c9" fontSize="10" fontFamily="ui-monospace, monospace">DEVICE</text>
        </g>
      ))}
      <g transform="translate(252 196)">
        <rect width="136" height="72" rx="14" fill="#10223a" stroke={color} strokeWidth="2" />
        <text x="68" y="32" textAnchor="middle" fill="#eafff5" fontSize="20" fontFamily="ui-monospace, monospace" fontWeight="700">2 / 3</text>
        <text x="68" y="54" textAnchor="middle" fill="#8fd9b6" fontSize="10" fontFamily="ui-monospace, monospace">THRESHOLD ECDSA</text>
      </g>
      <Flow d="M320 268 C 320 290, 320 292, 320 300" color={color} />
      <g transform="translate(216 300)">
        <rect width="208" height="40" rx="8" fill="#0c1428" stroke={color} strokeOpacity="0.5" />
        <text x="104" y="25" textAnchor="middle" fill="#cfe9dd" fontSize="11" fontFamily="ui-monospace, monospace">ECDSA (r, s, v)  ·  ecrecover</text>
      </g>
      <g transform="translate(34 214)" fill="#86a0c6" fontSize="10" fontFamily="ui-monospace, monospace">
        <text y="0">POLICY ENGINE</text>
        <text y="16">selector · destination</text>
        <text y="32">value · version</text>
      </g>
      <g transform="translate(520 214)" fill="#86a0c6" fontSize="10" fontFamily="ui-monospace, monospace">
        <text y="0">RECOVERY</text>
        <text y="16">guardian quorum</text>
        <text y="32">timelock · rotation</text>
      </g>
    </g>
  );
}

function WorkflowArt({ color }: { color: string }) {
  const nodes = [
    { x: 44, y: 88, label: "TRIGGER", sub: "manual / cron" },
    { x: 236, y: 88, label: "VALIDATE", sub: "graph check" },
    { x: 428, y: 88, label: "BROWSER", sub: "Stagehand" },
    { x: 236, y: 224, label: "EXECUTE", sub: "topological" },
    { x: 428, y: 224, label: "OUTPUT", sub: "structured data" },
  ];
  return (
    <g>
      <Flow d="M182 116 C 208 116, 212 116, 236 116" color={color} />
      <Flow d="M374 116 C 400 116, 404 116, 428 116" color={color} />
      <Flow d="M306 160 C 306 194, 306 202, 306 224" color="#f4c04f" />
      <Flow d="M374 252 C 400 252, 404 252, 428 252" color={color} />
      {nodes.map((node) => (
        <NodeBox key={node.label} {...node} w={138} h={56} color={node.label === "EXECUTE" ? "#f4c04f" : color} />
      ))}
      <g transform="translate(500 180)">
        <circle cx="34" cy="34" r="34" fill="#13203c" stroke={color} strokeOpacity="0.6" />
        <path d="M26 20 L50 34 L26 48 Z" fill={color} />
      </g>
      <g transform="translate(44 224)" fill="#86a0c6" fontSize="10" fontFamily="ui-monospace, monospace">
        <text y="0">Liveblocks · realtime</text>
        <text y="18">Trigger.dev · jobs</text>
        <text y="36">Neon · persistence</text>
      </g>
    </g>
  );
}

function CryptArt({ color }: { color: string }) {
  return (
    <g>
      <g transform="translate(64 74)">
        <rect width="234" height="150" rx="14" fill="url(#art-panel)" stroke={color} strokeOpacity="0.6" />
        <text x="20" y="34" fill="#dce8ff" fontSize="15" fontFamily="ui-monospace, monospace" fontWeight="700">ETHEREUM</text>
        <text x="20" y="56" fill="#8fa5c9" fontSize="10" fontFamily="ui-monospace, monospace">BIP39 / BIP44 · ECDSA</text>
        <g fill={color} opacity="0.9">
          <rect x="20" y="76" width="150" height="8" rx="4" />
          <rect x="20" y="94" width="122" height="8" rx="4" opacity="0.7" />
          <rect x="20" y="112" width="168" height="8" rx="4" opacity="0.5" />
        </g>
        <circle cx="196" cy="112" r="22" fill="none" stroke={color} strokeWidth="1.5" />
        <text x="196" y="118" textAnchor="middle" fill={color} fontSize="16" fontFamily="ui-monospace, monospace">Ξ</text>
      </g>
      <g transform="translate(342 74)">
        <rect width="234" height="150" rx="14" fill="url(#art-panel)" stroke={color} strokeOpacity="0.6" />
        <text x="20" y="34" fill="#dce8ff" fontSize="15" fontFamily="ui-monospace, monospace" fontWeight="700">SOLANA</text>
        <text x="20" y="56" fill="#8fa5c9" fontSize="10" fontFamily="ui-monospace, monospace">BIP39 / BIP44 · Ed25519</text>
        <g fill={color} opacity="0.9">
          <rect x="20" y="76" width="162" height="8" rx="4" />
          <rect x="20" y="94" width="110" height="8" rx="4" opacity="0.7" />
          <rect x="20" y="112" width="140" height="8" rx="4" opacity="0.5" />
        </g>
        <g transform="translate(196 110)" stroke={color} strokeWidth="2" fill="none">
          <path d="M-12 -6 H8 A6 6 0 0 1 8 6 H-12 Z" />
          <path d="M-8 -6 V-12 A6 6 0 0 1 4 -12 V-6" opacity="0.6" />
        </g>
      </g>
      <g transform="translate(242 246)">
        <rect width="156" height="44" rx="22" fill="#0d1a2f" stroke={color} strokeOpacity="0.5" />
        <text x="78" y="27" textAnchor="middle" fill="#cdf3df" fontSize="11" fontFamily="ui-monospace, monospace">KEYS NEVER LEAVE</text>
      </g>
    </g>
  );
}

function RateLimiterArt({ color }: { color: string }) {
  const bars = [
    { x: 84, h: 58, label: "FIXED" },
    { x: 204, h: 92, label: "SLIDE" },
    { x: 324, h: 122, label: "TOKEN" },
    { x: 444, h: 76, label: "LEAKY" },
  ];
  return (
    <g>
      <path d="M64 250 H568" stroke="#435777" strokeWidth="2" />
      {bars.map((bar, i) => (
        <g key={bar.label} transform={`translate(${bar.x} 0)`}>
          <rect x="0" y={250 - bar.h} width="64" height={bar.h} rx="6" fill="url(#art-panel)" stroke={color} strokeOpacity="0.5" />
          <rect x="0" y={250 - bar.h} width="64" height="6" rx="3" fill={color} opacity={0.5 + i * 0.12} />
          {Array.from({ length: Math.max(2, Math.round(bar.h / 20)) }).map((_, dot) => (
            <circle key={dot} cx="32" cy={242 - dot * 20} r="3.4" fill={color} opacity="0.75" />
          ))}
          <text x="32" y="272" textAnchor="middle" fill="#9db3d6" fontSize="10" fontFamily="ui-monospace, monospace">{bar.label}</text>
        </g>
      ))}
      <g transform="translate(64 78)">
        <rect width="512" height="42" rx="10" fill="#0c1428" stroke={color} strokeOpacity="0.35" />
        <text x="18" y="26" fill="#a9c1e4" fontSize="11" fontFamily="ui-monospace, monospace">JWT auth  ·  SHA-256 keys  ·  Redis atomic counters  ·  analytics</text>
      </g>
      <g transform="translate(500 288)" fill="none" stroke={color}>
        <circle cx="0" cy="0" r="20" strokeOpacity="0.4" />
        <path d="M0 0 L12 -14" strokeWidth="2" />
      </g>
    </g>
  );
}

function NotesArt({ color }: { color: string }) {
  return (
    <g>
      {[
        { x: 118, y: 70, rotate: -5, title: "NOTE 001" },
        { x: 222, y: 82, rotate: 2, title: "NOTE 002" },
        { x: 326, y: 70, rotate: 6, title: "NOTE 003" },
      ].map((note) => (
        <g key={note.title} transform={`translate(${note.x} ${note.y}) rotate(${note.rotate})`}>
          <rect width="190" height="146" rx="12" fill="url(#art-panel)" stroke={color} strokeOpacity="0.65" />
          <rect x="14" y="16" width="162" height="4" rx="2" fill={color} opacity="0.75" />
          <text x="16" y="44" fill="#e4eeff" fontSize="12" fontFamily="ui-monospace, monospace" fontWeight="700">{note.title}</text>
          <rect x="16" y="58" width="150" height="7" rx="3.5" fill="#7f96bb" opacity="0.5" />
          <rect x="16" y="74" width="126" height="7" rx="3.5" fill="#7f96bb" opacity="0.35" />
          <rect x="16" y="90" width="142" height="7" rx="3.5" fill="#7f96bb" opacity="0.28" />
          <circle cx="166" cy="122" r="11" fill="none" stroke={color} strokeOpacity="0.8" />
          <path d="M161 122 l4 4 l7 -8" fill="none" stroke={color} strokeWidth="2" />
        </g>
      ))}
      <Flow d="M158 236 C 250 260, 380 260, 470 230" color={color} />
      <g transform="translate(228 286)">
        <rect width="196" height="40" rx="20" fill="#0c1428" stroke={color} strokeOpacity="0.5" />
        <text x="98" y="25" textAnchor="middle" fill="#c7f0dd" fontSize="11" fontFamily="ui-monospace, monospace">PDA · ON-CHAIN CRUD</text>
      </g>
    </g>
  );
}
