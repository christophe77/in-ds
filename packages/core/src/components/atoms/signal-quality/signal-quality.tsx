import { Component, Prop, h, Host } from '@stencil/core';

export type SignalQualitySize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-signal-quality',
  styleUrl: 'signal-quality.css',
  shadow: true,
})
export class IndSignalQuality {
  /** Number of filled bars. */
  @Prop() level: number = 0;

  /** Total bars. */
  @Prop() bars: number = 4;

  /** Size. */
  @Prop({ reflect: true }) size: SignalQualitySize = 'md';

  /** Optional label rendered next to the bars. */
  @Prop() label?: string;

  private quality(): 'none' | 'poor' | 'fair' | 'good' {
    if (this.level <= 0) return 'none';
    const ratio = this.level / this.bars;
    if (ratio <= 0.34) return 'poor';
    if (ratio <= 0.67) return 'fair';
    return 'good';
  }

  render() {
    const total = Math.max(1, this.bars);
    const filled = Math.max(0, Math.min(total, this.level));
    const quality = this.quality();
    return (
      <Host
        role="meter"
        aria-valuenow={filled}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={this.label ?? `Signal quality ${quality}`}
        data-quality={quality}
      >
        <span class="bars" part="bars" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => (
            <span class={{ bar: true, 'is-on': i < filled }} style={{ height: `${30 + (i / total) * 70}%` }} />
          ))}
        </span>
        {this.label && <span class="label" part="label">{this.label}</span>}
      </Host>
    );
  }
}
