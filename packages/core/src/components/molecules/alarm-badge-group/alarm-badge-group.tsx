import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Row of ISA-18.2 priority counters (HH / H / L / LL). Gives an at-a-glance
 * alarm summary for a unit or the whole plant, colored by priority.
 */
@Component({
  tag: 'ind-alarm-badge-group',
  styleUrl: 'alarm-badge-group.css',
  shadow: true,
})
export class IndAlarmBadgeGroup {
  /** High-high count. */
  @Prop() highHigh: number = 0;
  /** High count. */
  @Prop() high: number = 0;
  /** Low count. */
  @Prop() low: number = 0;
  /** Low-low count. */
  @Prop() lowLow: number = 0;
  /** Hide priorities whose count is zero. */
  @Prop() hideZero: boolean = false;
  /** Append a total pill. */
  @Prop() showTotal: boolean = false;

  private get total(): number {
    return this.highHigh + this.high + this.low + this.lowLow;
  }

  render() {
    const items = [
      { key: 'high-high', label: 'HH', count: this.highHigh },
      { key: 'high', label: 'H', count: this.high },
      { key: 'low', label: 'L', count: this.low },
      { key: 'low-low', label: 'LL', count: this.lowLow },
    ].filter((i) => !this.hideZero || i.count > 0);

    return (
      <Host role="group" aria-label={`${this.total} active alarms`}>
        {items.map((i) => (
          <span class={`pill pill-${i.key}`} part="pill" key={i.key}>
            <span class="pill-label" part="pill-label">{i.label}</span>
            <span class="pill-count" part="pill-count">{i.count}</span>
          </span>
        ))}
        {this.showTotal && (
          <span class="pill pill-total" part="total">
            <span class="pill-label">Σ</span>
            <span class="pill-count">{this.total}</span>
          </span>
        )}
      </Host>
    );
  }
}
