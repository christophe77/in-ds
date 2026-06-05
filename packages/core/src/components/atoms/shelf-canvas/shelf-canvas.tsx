import { Component, Prop, h, Host } from '@stencil/core';

export type ShelfSlotState = 'full' | 'partial' | 'empty' | 'missing';

export interface ShelfSlot {
  /** Stable identifier for keying / cell click events. */
  id: string;
  /** Short label shown under the container. */
  label: string;
  /** 0–100 fill level. `undefined` ⇒ container considered missing. */
  level?: number;
  /** Explicit state — overrides the level-based default. */
  state?: ShelfSlotState;
}

/**
 * Grid of bottle/container slots showing their fill level. Generic — represents
 * any rack of resupplyable containers (bottles, cartridges, kegs, etc.).
 *
 *   <ind-shelf-canvas
 *     .slots=${[{id:'a', label:'A', level:78}, {id:'b', label:'B', level:12}]}
 *     cols="2"></ind-shelf-canvas>
 */
@Component({
  tag: 'ind-shelf-canvas',
  styleUrl: 'shelf-canvas.css',
  shadow: true,
})
export class IndShelfCanvas {
  @Prop() slots: ShelfSlot[] | string = [];
  @Prop() rows: number = 1;
  @Prop() cols: number = 4;
  @Prop() heading?: string;

  private parseSlots(): ShelfSlot[] {
    if (Array.isArray(this.slots)) return this.slots;
    if (typeof this.slots === 'string' && this.slots.trim()) {
      try {
        const p = JSON.parse(this.slots);
        return Array.isArray(p) ? p : [];
      } catch {
        return [];
      }
    }
    return [];
  }

  private resolveState(s: ShelfSlot): ShelfSlotState {
    if (s.state) return s.state;
    if (s.level === undefined) return 'missing';
    if (s.level >= 60) return 'full';
    if (s.level >= 20) return 'partial';
    return 'empty';
  }

  render() {
    const slots = this.parseSlots();
    const W = 480;
    const H = 340;
    const padX = 24;
    const padTop = this.heading ? 40 : 24;
    const padBottom = 28;
    const gridW = W - padX * 2;
    const gridH = H - padTop - padBottom;
    const cellW = gridW / this.cols;
    const cellH = gridH / this.rows;

    return (
      <Host role="img" aria-label={this.heading ?? 'Shelf inventory'}>
        <svg viewBox={`0 0 ${W} ${H}`} part="svg">
          {this.heading && (
            <text x={W / 2} y="22" class="heading" text-anchor="middle">
              {this.heading}
            </text>
          )}

          {slots.slice(0, this.rows * this.cols).map((s) => {
            const i = slots.indexOf(s);
            const col = i % this.cols;
            const row = Math.floor(i / this.cols);
            const cx = padX + col * cellW + cellW / 2;
            const cy = padTop + row * cellH + cellH / 2;

            const w = Math.min(cellW - 30, 80);
            const bodyH = Math.max(40, cellH - 60);
            const x = cx - w / 2;
            const y = cy - bodyH / 2;
            const neckTopX1 = x + w * 0.32;
            const neckTopX2 = x + w * 0.68;
            const shoulderY = y + 14;

            const state = this.resolveState(s);
            const level = s.level ?? 0;
            const innerPad = 5;
            const innerH = bodyH - 20 - innerPad * 2;
            const fillH = Math.max(0, innerH * (level / 100));

            return (
              <g class={`slot slot--${state}`}>
                {/* container outline — bottle silhouette */}
                <path
                  class="outline"
                  d={`
                    M ${neckTopX1} ${y}
                    L ${neckTopX2} ${y}
                    L ${neckTopX2} ${y + 8}
                    L ${x + w} ${shoulderY}
                    L ${x + w} ${y + bodyH}
                    L ${x} ${y + bodyH}
                    L ${x} ${shoulderY}
                    L ${neckTopX1} ${y + 8}
                    Z
                  `}
                />

                {/* fill */}
                {state !== 'missing' && level > 0 && (
                  <rect
                    class="fill"
                    x={x + innerPad}
                    y={y + bodyH - innerPad - fillH}
                    width={w - innerPad * 2}
                    height={fillH}
                    rx="2"
                  />
                )}

                {/* level text inside the body */}
                {state !== 'missing' && (
                  <text x={cx} y={cy + 4} class="level" text-anchor="middle">
                    {Math.round(level)}%
                  </text>
                )}

                {/* label under the container */}
                <text x={cx} y={y + bodyH + 16} class="label" text-anchor="middle">
                  {s.label}
                </text>
              </g>
            );
          })}
        </svg>
      </Host>
    );
  }
}
