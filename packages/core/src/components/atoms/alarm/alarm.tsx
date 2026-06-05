import { Component, Prop, h, Host } from '@stencil/core';

export type AlarmPriority = 'high-high' | 'high' | 'low' | 'low-low';

const PRIORITY_LABEL: Record<AlarmPriority, string> = {
  'high-high': 'HH',
  'high': 'H',
  'low': 'L',
  'low-low': 'LL',
};

@Component({
  tag: 'ind-alarm',
  styleUrl: 'alarm.css',
  shadow: true,
})
export class IndAlarm {
  /** ISA-18.2 alarm priority. */
  @Prop({ reflect: true }) priority: AlarmPriority = 'high';

  /** When false, the chip blinks (per ISA-18.2 unack convention). */
  @Prop({ reflect: true }) acknowledged: boolean = false;

  /** Required human description of the alarm. */
  @Prop() label!: string;

  /** Optional ISO-8601 timestamp. Rendered with `<time>`. */
  @Prop() timestamp?: string;

  render() {
    const prio = PRIORITY_LABEL[this.priority];
    return (
      <Host
        role="alert"
        aria-live={
          this.priority === 'high-high' && !this.acknowledged ? 'assertive' : 'polite'
        }
        aria-atomic="true"
      >
        <span class="badge" part="badge" aria-label={`priority ${prio}`}>{prio}</span>
        <span class="label" part="label">{this.label}</span>
        {this.timestamp && (
          <time class="timestamp" part="timestamp" dateTime={this.timestamp}>
            {this.timestamp}
          </time>
        )}
      </Host>
    );
  }
}
