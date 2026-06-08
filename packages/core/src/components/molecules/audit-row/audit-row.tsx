import { Component, Prop, h, Host } from '@stencil/core';

/**
 * One line in an audit trail (21 CFR Part 11 style): timestamp, user, action
 * and an optional before/after detail. Read-only.
 */
@Component({
  tag: 'ind-audit-row',
  styleUrls: ['../_shared/row.css', 'audit-row.css'],
  shadow: true,
})
export class IndAuditRow {
  /** Pre-formatted timestamp. */
  @Prop() time?: string;
  /** Operator / account that performed the action. */
  @Prop() user!: string;
  /** Action performed (e.g. "Setpoint change"). */
  @Prop() action!: string;
  /** Detail / before→after (e.g. "PIC-101: 3.2 → 4.0 bar"). */
  @Prop() detail?: string;

  render() {
    return (
      <Host role="row" aria-label={`${this.user} ${this.action}`}>
        {this.time && <span class="time" part="time">{this.time}</span>}
        <span class="user" part="user">{this.user}</span>
        <span class="action" part="action">{this.action}</span>
        {this.detail && <span class="msg detail" part="detail">{this.detail}</span>}
      </Host>
    );
  }
}
