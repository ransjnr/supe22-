"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Loader2, Play, RotateCcw, Terminal, X } from "lucide-react";

/* ── Pre-built examples ─────────────────────────────────────────────────────── */

const EXAMPLES: Record<string, string> = {
  "Quantum State Simulator": `# 2-qubit quantum state vector simulator
# Demonstrates superposition and entanglement (Bell state)

import numpy as np

# Single-qubit gates
I  = np.eye(2)
H  = np.array([[1,1],[1,-1]]) / np.sqrt(2)   # Hadamard
X  = np.array([[0,1],[1,0]])                  # Pauli-X (NOT)
Z  = np.array([[1,0],[0,-1]])                 # Pauli-Z

# 2-qubit CNOT gate
CNOT = np.array([[1,0,0,0],
                 [0,1,0,0],
                 [0,0,0,1],
                 [0,0,1,0]])

def apply_single(gate, qubit, n_qubits, state):
    ops = [I] * n_qubits
    ops[qubit] = gate
    full = ops[0]
    for op in ops[1:]:
        full = np.kron(full, op)
    return full @ state

labels = ['|00⟩','|01⟩','|10⟩','|11⟩']

def print_state(state, title=""):
    if title:
        print(f"\\n{title}")
    for lbl, amp in zip(labels, state):
        prob = abs(amp)**2
        bar  = '█' * int(prob * 24)
        print(f"  {lbl}  amp={amp:+.4f}  P={prob:.3f}  {bar}")

# Start |00⟩
state = np.array([1,0,0,0], dtype=complex)
print_state(state, "Initial state |00⟩:")

# Hadamard on qubit 0 → superposition
state = apply_single(H, 0, 2, state)
print_state(state, "After H on qubit 0 (superposition):")

# CNOT → Bell state |Φ+⟩
state = CNOT @ state
print_state(state, "Bell state |Φ+⟩ (after CNOT — entangled!):")

# Simulate measurement
probs = np.abs(state)**2
outcome = np.random.choice(labels, p=probs)
print(f"\\nSimulated measurement: {outcome}")
print("(Run again for a different outcome!)")
`,

  "Physics-Informed NN": `# Physics-Informed Neural Network (PINN) demo
# Solves the ODE: du/dt = -λu, u(0) = 1  (exponential decay)
# Pure NumPy — no PyTorch or TensorFlow needed!

import numpy as np

np.random.seed(42)
lam = 2.0   # decay constant

# Tiny network: 1 → 16 → 16 → 1
def sigmoid(x):  return 1 / (1 + np.exp(-x))
def sigmoid_(x): s = sigmoid(x); return s*(1-s)

class PINN:
    def __init__(self):
        self.W1 = np.random.randn(1,16)*0.3;  self.b1 = np.zeros(16)
        self.W2 = np.random.randn(16,16)*0.3; self.b2 = np.zeros(16)
        self.W3 = np.random.randn(16,1)*0.3;  self.b3 = np.zeros(1)

    def forward(self, t):
        self.t  = t
        self.z1 = t @ self.W1 + self.b1;  self.a1 = sigmoid(self.z1)
        self.z2 = self.a1 @ self.W2 + self.b2; self.a2 = sigmoid(self.z2)
        return self.a2 @ self.W3 + self.b3

    def grad_t(self, t):
        # du/dt via chain rule
        h = 1e-5
        return (self.forward(t+h) - self.forward(t-h)) / (2*h)

net = PINN()
lr  = 3e-3

t_ic   = np.array([[0.0]])           # IC point
t_phys = np.linspace(0,3,80).reshape(-1,1)  # physics collocation

print(f"Training PINN to satisfy: du/dt = -{lam}·u, u(0)=1")
print(f"{'Epoch':>6}  {'IC loss':>10}  {'Phys loss':>12}  {'Total':>10}")
print("-"*44)

for epoch in range(1200):
    # IC loss: u(0)=1
    u0   = net.forward(t_ic)
    L_ic = float(np.mean((u0 - 1.0)**2))

    # Physics loss: du/dt + λu = 0
    u    = net.forward(t_phys)
    dudt = net.grad_t(t_phys)
    res  = dudt + lam * u
    L_ph = float(np.mean(res**2))

    total = L_ic + L_ph

    # Finite-difference gradient update (simplified)
    for attr in ['W1','b1','W2','b2','W3','b3']:
        p = getattr(net, attr)
        g = np.zeros_like(p)
        for idx in np.ndindex(p.shape):
            orig = p[idx]
            p[idx] = orig + 1e-4
            u0p = net.forward(t_ic); up = net.forward(t_phys); dp = net.grad_t(t_phys)
            lp  = float(np.mean((u0p-1)**2)) + float(np.mean((dp+lam*up)**2))
            p[idx] = orig - 1e-4
            u0m = net.forward(t_ic); um = net.forward(t_phys); dm = net.grad_t(t_phys)
            lm  = float(np.mean((u0m-1)**2)) + float(np.mean((dm+lam*um)**2))
            p[idx] = orig
            g[idx] = (lp - lm) / 2e-4
        p -= lr * g

    if epoch % 200 == 0 or epoch == 1199:
        print(f"{epoch:>6}  {L_ic:>10.6f}  {L_ph:>12.6f}  {total:>10.6f}")

# Final comparison
print("\\nPrediction vs exact (u = e^{-λt}):")
print(f"{'t':>5}  {'PINN':>10}  {'Exact':>10}  {'Error':>9}")
for t_val in [0, 0.5, 1.0, 1.5, 2.0, 3.0]:
    pred  = float(net.forward(np.array([[t_val]])))
    exact = np.exp(-lam * t_val)
    print(f"{t_val:>5.1f}  {pred:>10.6f}  {exact:>10.6f}  {abs(pred-exact):>9.6f}")
`,

  "VQE Algorithm": `# Variational Quantum Eigensolver (VQE)
# Finds ground-state energy of a 2-qubit Heisenberg Hamiltonian

import numpy as np

# 2-qubit Heisenberg model: H = J(XX + YY + ZZ) + h·ZI
# Pauli matrices
I  = np.eye(2, dtype=complex)
X  = np.array([[0,1],[1,0]], dtype=complex)
Y  = np.array([[0,-1j],[1j,0]], dtype=complex)
Z  = np.array([[1,0],[0,-1]], dtype=complex)

def kron(A, B): return np.kron(A, B)

J, h = 1.0, 0.5
H = J*(kron(X,X) + kron(Y,Y) + kron(Z,Z)) + h*kron(Z,I)

exact = np.linalg.eigvalsh(H)
print(f"Exact eigenvalues: {exact.round(4)}")
print(f"Ground state energy: {exact[0]:.6f}\\n")

# Parameterised ansatz: Ry(θ₀)⊗Ry(θ₁) → CNOT
def ansatz(params):
    th0, th1 = params
    c0,s0 = np.cos(th0/2), np.sin(th0/2)
    c1,s1 = np.cos(th1/2), np.sin(th1/2)
    # |ψ⟩ = Ry(θ₀)|0⟩ ⊗ Ry(θ₁)|0⟩
    state = np.kron([c0, s0], [c1, s1])
    # CNOT
    CNOT = np.array([[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]])
    return CNOT @ state

def energy(params):
    psi = ansatz(params)
    return float(np.real(psi.conj() @ H @ psi))

# Gradient via parameter-shift rule
def grad(params):
    g = np.zeros_like(params)
    for i in range(len(params)):
        p_plus  = params.copy(); p_plus[i]  += np.pi/2
        p_minus = params.copy(); p_minus[i] -= np.pi/2
        g[i] = (energy(p_plus) - energy(p_minus)) / 2
    return g

params = np.random.uniform(0, 2*np.pi, 2)
lr     = 0.15

print(f"{'Iter':>5}  {'θ₀':>8}  {'θ₁':>8}  {'Energy':>12}")
print("-"*40)

for it in range(80):
    g      = grad(params)
    params -= lr * g
    E      = energy(params)
    if it % 10 == 0 or it == 79:
        print(f"{it:>5}  {params[0]:>8.4f}  {params[1]:>8.4f}  {E:>12.6f}")

print(f"\\nVQE result : {energy(params):.6f}")
print(f"Exact GS   : {exact[0]:.6f}")
print(f"Error      : {abs(energy(params)-exact[0]):.2e}")
`,

  "Schrödinger Equation": `# Schrödinger equation: particle in a harmonic trap
# Numerically solves: [-ℏ²/2m ∂²/∂x² + V(x)] ψ = E ψ
# (units ℏ=m=1, x ∈ [-6, 6])

import numpy as np

N  = 300
x  = np.linspace(-6, 6, N)
dx = x[1] - x[0]

# Potential: harmonic oscillator V = ½x²
V  = 0.5 * x**2

# Kinetic energy (finite differences, 2nd order)
diag    = 1.0/dx**2 + V
off     = -0.5/dx**2 * np.ones(N-1)
H_mat   = np.diag(diag) + np.diag(off, 1) + np.diag(off, -1)

# Diagonalise
E, psi = np.linalg.eigh(H_mat)

# Exact harmonic oscillator: E_n = n + 0.5
exact_E = [n + 0.5 for n in range(6)]

print("Quantum Harmonic Oscillator — first 6 energy levels")
print(f"{'n':>3}  {'Numerical':>12}  {'Exact':>10}  {'Error':>10}")
print("-"*42)
for n in range(6):
    print(f"{n:>3}  {E[n]:>12.6f}  {exact_E[n]:>10.4f}  {abs(E[n]-exact_E[n]):>10.2e}")

# ASCII visualisation of ψ₀, ψ₁, ψ₂
print("\\nWave functions ψ₀, ψ₁, ψ₂  (|●| shows probability density):")
W = 52
for n in range(3):
    w = psi[:, n]
    w /= np.sqrt(np.trapz(w**2, x))   # normalise
    peak_x = x[np.argmax(w**2)]
    print(f"\\n  ψ_{n}(x)   peak at x≈{peak_x:.2f}   E_{n}={E[n]:.4f}")
    # Sample 16 x-points
    step = N // 16
    for i in range(0, N, step):
        val  = w[i]
        mag  = abs(val)
        half = W // 2
        pos  = int(mag * half)
        if val >= 0:
            bar = " " * half + "●" * max(1,pos)
        else:
            bar = " " * max(0, half-pos) + "●" * max(1,pos)
        print(f"  x={x[i]:+.1f} |{bar}")

print("\\nDone! Eigenvalues match the exact E_n = n + 0.5 formula.")
`,
};

/* ── Component ──────────────────────────────────────────────────────────────── */

declare global {
  interface Window {
    loadPyodide: (opts: {
      indexURL: string;
      stdout: (t: string) => void;
      stderr: (t: string) => void;
    }) => Promise<{
      loadPackage: (pkg: string) => Promise<void>;
      runPythonAsync: (code: string) => Promise<void>;
    }>;
  }
}

export default function SandboxPanel({ onClose }: { onClose: () => void }) {
  const [example, setExample] = useState("Quantum State Simulator");
  const [code, setCode] = useState(EXAMPLES["Quantum State Simulator"]);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [pyReady, setPyReady] = useState(false);
  const [pyLoading, setPyLoading] = useState(true);
  const pyRef = useRef<Awaited<ReturnType<Window["loadPyodide"]>> | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  /* Load Pyodide once */
  useEffect(() => {
    let mounted = true;
    setOutput("⏳  Loading Python runtime (Pyodide + NumPy)…\n    This may take ~15 s on first load.\n");

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
    script.onload = async () => {
      if (!mounted) return;
      try {
        const py = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
          stdout: (t) => setOutput((p) => p + t + "\n"),
          stderr: (t) => setOutput((p) => p + "⚠  " + t + "\n"),
        });
        await py.loadPackage("numpy");
        pyRef.current = py;
        if (mounted) {
          setPyReady(true);
          setPyLoading(false);
          setOutput("✅  Python 3.11 + NumPy ready.\n    Select an example and press ▶ Run.\n");
        }
      } catch {
        if (mounted) {
          setPyLoading(false);
          setOutput("❌  Failed to load runtime. Check your internet connection.\n");
        }
      }
    };
    document.head.appendChild(script);
    return () => {
      mounted = false;
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  const runCode = async () => {
    if (!pyRef.current || running) return;
    setRunning(true);
    setOutput("");
    try {
      await pyRef.current.runPythonAsync(code);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setOutput((p) => p + `\n❌ ${msg}\n`);
    } finally {
      setRunning(false);
      setTimeout(() => {
        outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" });
      }, 50);
    }
  };

  const selectExample = (name: string) => {
    setExample(name);
    setCode(EXAMPLES[name]);
    setOutput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 bg-[#0d1117] flex flex-col"
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#161b22]">
        <div className="flex items-center gap-3">
          <Terminal size={15} className="text-emerald-400" />
          <span className="text-sm font-semibold text-white">Physics-ML Playground</span>
          <span className="hidden sm:inline text-xs text-white/35 border border-white/10 rounded px-2 py-0.5">
            Pyodide · Python 3.11 · NumPy
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors"
        >
          <X size={17} />
        </button>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/10 bg-[#161b22] flex-wrap">
        {/* Example selector */}
        <div className="relative">
          <select
            value={example}
            onChange={(e) => selectExample(e.target.value)}
            className="appearance-none bg-[#21262d] text-white text-xs pl-3 pr-7 py-1.5 rounded border border-white/10 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            {Object.keys(EXAMPLES).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <ChevronDown
            size={11}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
          />
        </div>

        {/* Run */}
        <button
          onClick={runCode}
          disabled={!pyReady || running}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-semibold transition-colors"
        >
          {running ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Play size={12} />
          )}
          {running ? "Running…" : "Run"}
        </button>

        {/* Clear output */}
        <button
          onClick={() => setOutput("")}
          title="Clear output"
          className="p-1.5 rounded hover:bg-white/10 text-white/45 hover:text-white transition-colors"
        >
          <RotateCcw size={12} />
        </button>

        {/* Status indicator */}
        {pyLoading && (
          <span className="flex items-center gap-1.5 text-xs text-yellow-400">
            <Loader2 size={11} className="animate-spin" />
            Loading runtime…
          </span>
        )}
        {pyReady && (
          <span className="text-xs text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            Ready
          </span>
        )}
      </div>

      {/* ── Editor + Output ── */}
      <div className="flex-1 flex min-h-0 flex-col md:flex-row">
        {/* Editor */}
        <div
          className="flex flex-col min-h-0 border-b border-white/10 md:border-b-0 md:border-r"
          style={{ flex: "1 1 55%" }}
        >
          <div className="px-4 py-1.5 text-[11px] text-white/30 border-b border-white/5 bg-[#0d1117] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <span className="ml-2">main.py</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 p-4 bg-[#0d1117] text-[#e6edf3] text-[13px] font-mono resize-none focus:outline-none leading-relaxed caret-emerald-400"
            style={{ fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace", minHeight: "40%" }}
          />
        </div>

        {/* Output */}
        <div className="flex flex-col min-h-0" style={{ flex: "1 1 45%" }}>
          <div className="px-4 py-1.5 text-[11px] text-white/30 border-b border-white/5 bg-[#161b22] flex items-center gap-2">
            <Terminal size={10} className="text-emerald-400" />
            <span>output</span>
            {running && <Loader2 size={9} className="animate-spin text-emerald-400 ml-1" />}
          </div>
          <div
            ref={outputRef}
            className="flex-1 p-4 bg-[#0a0e14] text-emerald-300 text-[12px] font-mono overflow-y-auto whitespace-pre-wrap leading-relaxed"
            style={{ fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace" }}
          >
            {output || (pyReady ? "// Output will appear here after you run the code." : "")}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
