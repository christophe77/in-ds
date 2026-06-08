import { Component, Prop, h, Host } from '@stencil/core';
import type { EventSeverity } from '../../molecules/event-row/event-row';

export interface EventJournalItem {
  time?: string;
  severity: EventSeverity;
  source?: string;
  message: string;
}

/**
 * Chronological event / system log built from `<ind-event-row>`s, with a
 * severity filter in the toolbar.
 */
@Component({
  tag: 'ind-event-journal',
  styleUrls: ['../_shared/panel.css', 'event-journal.css'],
  shadow: true,
})
export class IndEventJournal {
  @Prop() heading: string = 'Event journal';
  /** Events, most-recent first. */
  @Prop() events: EventJournalItem[] = [];
  /** Active severity filter — `all` shows everything. */
  @Prop({ mutable: true }) filter: 'all' | EventSeverity = 'all';

  private onFilter = (e: Event) => {
    this.filter = (e.target as HTMLSelectElement).value as 'all' | EventSeverity;
  };

  render() {
    const rows = this.filter === 'all' ? this.events : this.events.filter((e) => e.severity === this.filter);
    return (
      <Host>
        <div class="panel-head">
          <span class="panel-title" part="heading">{this.heading}</span>
          <div class="panel-actions">
            <select class="filter" part="filter" onChange={this.onFilter}>
              <option value="all">All severities</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
              <option value="success">Success</option>
              <option value="info">Info</option>
            </select>
          </div>
        </div>
        <div class="panel-list" part="list">
          {rows.length === 0 ? (
            <div class="panel-empty">No events</div>
          ) : (
            rows.map((e, i) => (
              <ind-event-row
                key={i}
                time={e.time}
                severity={e.severity}
                source={e.source}
                message={e.message}
              />
            ))
          )}
        </div>
      </Host>
    );
  }
}
