import { Component, Prop, h, Host } from '@stencil/core';

export type SparklineVariant = 'default' | 'running' | 'warning' | 'fault';

@Component({
  tag: 'ind-sparkline',
  styleUrl: 'sparkline.css',
  shadow: true,
})
export class IndSparkline {
  /** Series of numeric samples, oldest → newest. Pass as a property. */
  @Prop() points: number[] = [];

  /** Lower bound. Defaults to the min of `points`. */
  @Prop() min?: number;

  /** Upper bound. Defaults to the max of `points`. */
  @Prop() max?: number;

  /** Color intent. */
  @Prop({ reflect: true }) variant: SparklineVariant = 'default';

  /** Fill the area under the line. */
  @Prop({ reflect: true }) area: boolean = false;

  /** Highlight the most recent sample with a dot. */
  @Prop({ reflect: true }) marker: boolean = true;

  /** Accessible label. */
  @Prop() label?: string;

  /** SVG coordinate width. CSS controls the rendered size. */
  private readonly w = 100;
  private readonly hh = 28;

  private path(): { line: string; area: string; last?: { x: number; y: number } } {
    const pts = this.points ?? [];
    if (pts.length === 0) return { line: '', area: '' };
    const lo = this.min ?? Math.min(...pts);
    const hi = this.max ?? Math.max(...pts);
    const span = hi - lo || 1;
    const stepX = pts.length > 1 ? this.w / (pts.length - 1) : 0;
    const pad = 2;
    const usable = this.hh - pad * 2;
    const coords = pts.map((v, i) => {
      const x = i * stepX;
      const y = pad + usable - ((v - lo) / span) * usable;
      return { x, y };
    });
    const line = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
    const area = `${line} L${this.w},${this.hh} L0,${this.hh} Z`;
    return { line, area, last: coords[coords.length - 1] };
  }

  render() {
    const { line, area, last } = this.path();
    const name = this.label ?? 'trend';
    return (
      <Host role="img" aria-label={name}>
        <svg class="chart" part="chart" viewBox={`0 0 ${this.w} ${this.hh}`} preserveAspectRatio="none" aria-hidden="true">
          {this.area && area && <path class="fill" part="fill" d={area} />}
          {line && <path class="line" part="line" d={line} />}
          {this.marker && last && <circle class="dot" part="dot" cx={last.x} cy={last.y} r="2" />}
        </svg>
      </Host>
    );
  }
}
