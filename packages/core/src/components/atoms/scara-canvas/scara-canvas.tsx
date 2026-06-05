import { Component, Prop, h, Host } from '@stencil/core';

export type ScaraState = 'idle' | 'moving' | 'fault';

/**
 * 2D top-down SCARA arm view. Pure presentational — pass joint angles and
 * link lengths, the component computes forward kinematics in SVG space.
 *
 *   <ind-scara-canvas .joints=${[30, 45, 0]} state="moving"></ind-scara-canvas>
 *
 * - `joints[0]` (J1) — shoulder rotation in degrees, 0 = +X axis
 * - `joints[1]` (J2) — elbow rotation in degrees, relative to link 1
 * - `joints[2]` (J3) — wrist (end effector) rotation, drives the small indicator
 *
 * Z translation isn't represented — it would require a separate side view.
 */
@Component({
  tag: 'ind-scara-canvas',
  styleUrl: 'scara-canvas.css',
  shadow: true,
})
export class IndScaraCanvas {
  @Prop() joints: number[] | string = [0, 0, 0];
  @Prop() linkLengths: number[] | string = [110, 90];
  @Prop({ reflect: true }) state: ScaraState = 'idle';

  private parseArr(v: number[] | string): number[] {
    if (Array.isArray(v)) return v;
    if (typeof v === 'string' && v.trim()) {
      try {
        const p = JSON.parse(v);
        return Array.isArray(p) ? p : [];
      } catch {
        return [];
      }
    }
    return [];
  }

  render() {
    const j = this.parseArr(this.joints);
    const l = this.parseArr(this.linkLengths);
    const [j1 = 0, j2 = 0, j3 = 0] = j;
    const [l1 = 110, l2 = 90] = l;

    const cx = 160;
    const cy = 105;

    const j1r = (j1 * Math.PI) / 180;
    const j2r = (j2 * Math.PI) / 180;
    const j3r = (j3 * Math.PI) / 180;

    // Forward kinematics
    const ex = cx + l1 * Math.cos(j1r);
    const ey = cy + l1 * Math.sin(j1r);
    const eex = ex + l2 * Math.cos(j1r + j2r);
    const eey = ey + l2 * Math.sin(j1r + j2r);

    // Wrist indicator (J3)
    const wlen = 14;
    const wx = eex + wlen * Math.cos(j1r + j2r + j3r);
    const wy = eey + wlen * Math.sin(j1r + j2r + j3r);

    const fmt = (n: number) => n.toFixed(1);
    const fmt0 = (n: number) => n.toFixed(0);

    return (
      <Host
        role="img"
        aria-label={`SCARA arm: J1 ${fmt(j1)}°, J2 ${fmt(j2)}°, J3 ${fmt(j3)}°`}
      >
        <svg viewBox="0 0 320 220" part="svg">
          {/* Working envelope */}
          <circle cx={cx} cy={cy} r={l1 + l2} class="envelope envelope-outer" />
          <circle cx={cx} cy={cy} r={Math.max(0, l1 - l2)} class="envelope envelope-inner" />

          {/* Reference axes */}
          <line x1="10" y1={cy} x2="22" y2={cy} class="axis" />
          <line x1={cx} y1="6" x2={cx} y2="18" class="axis" />
          <text x="24" y={cy + 3} class="axis-label">X</text>
          <text x={cx + 4} y="14" class="axis-label">Y</text>

          {/* Links */}
          <line x1={cx} y1={cy} x2={ex} y2={ey} class="link link-1" />
          <line x1={ex} y1={ey} x2={eex} y2={eey} class="link link-2" />
          <line x1={eex} y1={eey} x2={wx} y2={wy} class="wrist" />

          {/* Joints */}
          <circle cx={cx} cy={cy} r="8" class="joint base" />
          <circle cx={ex} cy={ey} r="6" class="joint elbow" />
          <circle cx={eex} cy={eey} r="7" class="joint effector" />

          {/* Readout */}
          <g class="readout">
            <text x="10" y="198">J1 <tspan>{fmt(j1)}°</tspan></text>
            <text x="74" y="198">J2 <tspan>{fmt(j2)}°</tspan></text>
            <text x="138" y="198">J3 <tspan>{fmt(j3)}°</tspan></text>
            <text x="202" y="198">X <tspan>{fmt0(eex - cx)}</tspan></text>
            <text x="254" y="198">Y <tspan>{fmt0(eey - cy)}</tspan></text>
          </g>
        </svg>
      </Host>
    );
  }
}
