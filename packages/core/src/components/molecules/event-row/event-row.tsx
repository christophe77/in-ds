import { Component, Prop, h, Host } from '@stencil/core';

export type EventSeverity = 'info' | 'success' | 'warning' | 'error';

/**
 * One line in an event / system log: timestamp, severity dot, source and
 * message. Read-only.
 */
@Component({
  tag: 'ind-event-row',
  styleUrls: ['../_shared/row.css', 'event-row.css'],
  shadow: true,
})
export class IndEventRow {
  /** Pre-formatted timestamp. */
  @Prop() time?: string;
  /** Severity — drives the status dot color. */
  @Prop({ reflect: true }) severity: EventSeverity = 'info';
  /** Event source (subsystem, device, tag). */
  @Prop() source?: string;
  /** Event message. */
  @Prop() message!: string;

  render() {
    return (
      <Host role="row" aria-label={`${this.severity} event ${this.message}`}>
        {this.time && <span class="time" part="time">{this.time}</span>}
        <ind-status-dot state={this.severity} size="sm" />
        {this.source && <span class="tag" part="source">{this.source}</span>}
        <span class="msg" part="message">{this.message}</span>
      </Host>
    );
  }
}
