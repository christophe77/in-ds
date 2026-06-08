import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import type { AlarmRowPriority } from '../../molecules/alarm-row/alarm-row';

export interface AlarmPanelItem {
  id: string;
  priority: AlarmRowPriority;
  tag?: string;
  message: string;
  time?: string;
  acknowledged?: boolean;
}

const PRIORITY_RANK: Record<AlarmRowPriority, number> = {
  'high-high': 0,
  high: 1,
  low: 2,
  'low-low': 3,
};

/**
 * Active alarm list with a toolbar: shows unacknowledged-first, ISA-18.2
 * sorted `<ind-alarm-row>`s and an "ACK all" command. Emits `indAck` (per
 * alarm) and `indAckAll`.
 */
@Component({
  tag: 'ind-alarm-panel',
  styleUrls: ['../_shared/panel.css', 'alarm-panel.css'],
  shadow: true,
})
export class IndAlarmPanel {
  /** Panel heading. */
  @Prop() heading: string = 'Alarms';
  /** Alarm rows. */
  @Prop() alarms: AlarmPanelItem[] = [];
  /** Hide already-acknowledged alarms. */
  @Prop() hideAcknowledged: boolean = false;

  /** Fires with the alarm id when a single alarm is acknowledged. */
  @Event() indAck!: EventEmitter<string>;
  /** Fires when the operator acknowledges all visible alarms. */
  @Event() indAckAll!: EventEmitter<void>;

  private sorted(): AlarmPanelItem[] {
    const list = this.hideAcknowledged ? this.alarms.filter((a) => !a.acknowledged) : this.alarms;
    return [...list].sort((a, b) => {
      const ack = Number(a.acknowledged ?? false) - Number(b.acknowledged ?? false);
      if (ack !== 0) return ack;
      return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
    });
  }

  render() {
    const rows = this.sorted();
    const unacked = this.alarms.filter((a) => !a.acknowledged).length;
    return (
      <Host>
        <div class="panel-head">
          <div class="panel-titles">
            <span class="panel-title" part="heading">{this.heading}</span>
            <span class="panel-subtitle">{unacked} unacknowledged · {this.alarms.length} total</span>
          </div>
          <div class="panel-actions">
            <ind-button
              variant="default"
              size="sm"
              label="ACK all"
              disabled={unacked === 0}
              onIndActivate={() => this.indAckAll.emit()}
            />
          </div>
        </div>
        <div class="panel-list" part="list">
          {rows.length === 0 ? (
            <div class="panel-empty">No active alarms</div>
          ) : (
            rows.map((a) => (
              <ind-alarm-row
                key={a.id}
                priority={a.priority}
                tag={a.tag}
                message={a.message}
                time={a.time}
                acknowledged={a.acknowledged}
                onIndAck={() => this.indAck.emit(a.id)}
              />
            ))
          )}
        </div>
      </Host>
    );
  }
}
