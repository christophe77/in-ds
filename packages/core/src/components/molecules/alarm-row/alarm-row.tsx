import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

export type AlarmRowPriority = 'high-high' | 'high' | 'low' | 'low-low';

const PRIORITY_LABEL: Record<AlarmRowPriority, string> = {
  'high-high': 'HH',
  high: 'H',
  low: 'L',
  'low-low': 'LL',
};

/**
 * One line in an alarm summary / list. Shows the ISA-18.2 priority, the tag,
 * the message, a timestamp and an acknowledge button. Emits `indAck`.
 */
@Component({
  tag: 'ind-alarm-row',
  styleUrls: ['../_shared/row.css', 'alarm-row.css'],
  shadow: true,
})
export class IndAlarmRow {
  /** Alarm priority. */
  @Prop({ reflect: true }) priority: AlarmRowPriority = 'high';
  /** Source tag (e.g. "PT-101"). */
  @Prop() tag?: string;
  /** Alarm message. */
  @Prop() message!: string;
  /** Pre-formatted timestamp string. */
  @Prop() time?: string;
  /** Acknowledged state — dims the row and hides the ack button. */
  @Prop({ reflect: true }) acknowledged: boolean = false;

  /** Fires when the operator acknowledges this alarm. */
  @Event() indAck!: EventEmitter<void>;

  render() {
    return (
      <Host
        role="row"
        aria-label={`${PRIORITY_LABEL[this.priority]} alarm ${this.tag ?? ''} ${this.message}`}
        aria-live={this.priority === 'high-high' && !this.acknowledged ? 'assertive' : 'polite'}
      >
        <span class={`prio prio-${this.priority}`} part="priority">{PRIORITY_LABEL[this.priority]}</span>
        {this.tag && <span class="tag" part="tag">{this.tag}</span>}
        <span class="msg" part="message">{this.message}</span>
        {this.time && <span class="time" part="time">{this.time}</span>}
        {!this.acknowledged ? (
          <ind-button
            class="ack"
            part="ack"
            variant="ghost"
            size="sm"
            label="ACK"
            onIndActivate={() => this.indAck.emit()}
          />
        ) : (
          <span class="acked" part="acked">ACK ✓</span>
        )}
      </Host>
    );
  }
}
