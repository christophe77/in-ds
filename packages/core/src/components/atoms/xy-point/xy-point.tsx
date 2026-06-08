import { Component, Prop, h, Host } from '@stencil/core';

export type XyVariant = 'default' | 'running' | 'warning' | 'fault';

@Component({
  tag: 'ind-xy-point',
  styleUrl: 'xy-point.css',
  shadow: true,
})
export class IndXyPoint {
  /** X value of the operating point. */
  @Prop() x: number = 0;
  /** Y value of the operating point. */
  @Prop() y: number = 0;
  /** X axis bounds. */
  @Prop() xMin: number = 0;
  @Prop() xMax: number = 100;
  /** Y axis bounds. */
  @Prop() yMin: number = 0;
  @Prop() yMax: number = 100;
  /** Optional trail of past points, oldest → newest, as [x, y] pairs. Pass as a property. */
  @Prop() trail: [number, number][] = [];
  /** Color intent of the point. */
  @Prop({ reflect: true }) variant: XyVariant = 'default';
  /** Accessible label. */
  @Prop() label?: string;

  private readonly w = 100;
  private readonly hh = 100;

  private mapX(v: number): number {
    const span = this.xMax - this.xMin || 1;
    return ((v - this.xMin) / span) * this.w;
  }
  private mapY(v: number): number {
    const span = this.yMax - this.yMin || 1;
    return this.hh - ((v - this.yMin) / span) * this.hh;
  }

  render() {
    const px = this.mapX(this.x);
    const py = this.mapY(this.y);
    const trailPath = (this.trail ?? [])
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${this.mapX(p[0]).toFixed(1)},${this.mapY(p[1]).toFixed(1)}`)
      .join(' ');
    return (
      <Host role="img" aria-label={this.label ?? `operating point x ${this.x}, y ${this.y}`}>
        <svg class="plot" part="plot" viewBox="0 0 100 100" aria-hidden="true">
          <rect class="field" x="0" y="0" width="100" height="100" />
          <line class="axis" x1="0" y1="50" x2="100" y2="50" />
          <line class="axis" x1="50" y1="0" x2="50" y2="100" />
          {trailPath && <path class="trail" part="trail" d={trailPath} />}
          <circle class="point" part="point" cx={px} cy={py} r="3.5" />
        </svg>
      </Host>
    );
  }
}
