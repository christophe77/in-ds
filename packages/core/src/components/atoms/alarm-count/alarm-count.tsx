import { Component, Prop, h, Host } from '@stencil/core';

export type AlarmCountSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-alarm-count',
  styleUrl: 'alarm-count.css',
  shadow: true,
})
export class IndAlarmCount {
  /** High-High (priority 1) count. */
  @Prop() highHigh: number = 0;
  /** High (priority 2) count. */
  @Prop() high: number = 0;
  /** Low (priority 3) count. */
  @Prop() low: number = 0;
  /** Low-Low (priority 4) count. */
  @Prop() lowLow: number = 0;
  /** Hide priority chips whose count is 0. */
  @Prop({ reflect: true }) hideZero: boolean = false;
  /** Size. */
  @Prop({ reflect: true }) size: AlarmCountSize = 'md';

  private chips(): { key: string; label: string; value: number }[] {
    return [
      { key: 'high-high', label: 'HH', value: this.highHigh },
      { key: 'high', label: 'H', value: this.high },
      { key: 'low', label: 'L', value: this.low },
      { key: 'low-low', label: 'LL', value: this.lowLow },
    ];
  }

  render() {
    const total = this.highHigh + this.high + this.low + this.lowLow;
    const chips = this.chips().filter((c) => !this.hideZero || c.value > 0);
    return (
      <Host role="status" aria-label={`${total} active alarms`}>
        {chips.map((c) => (
          <span class="chip" part="chip" data-priority={c.key}>
            <span class="prio" part="priority">{c.label}</span>
            <span class="num" part="count">{c.value}</span>
          </span>
        ))}
      </Host>
    );
  }
}
