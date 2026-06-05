import {
  Component,
  Prop,
  Event,
  EventEmitter,
  Element,
  Watch,
  h,
  Host,
} from '@stencil/core';

@Component({
  tag: 'ind-mqtt-monitor',
  styleUrl: 'mqtt-monitor.css',
  shadow: true,
})
export class IndMqttMonitor {
  @Element() host!: HTMLElement;

  /** Full log content. Newline-separated lines. */
  @Prop() log: string = '';
  /** Active filter — substring match on each line, case-insensitive. */
  @Prop({ mutable: true }) filterValue: string = '';
  /** When true, the log doesn't auto-scroll on new content. */
  @Prop({ mutable: true }) paused: boolean = false;
  /** Visible rows of the log textarea. */
  @Prop() rows: number = 18;

  @Event() indFilterChange!: EventEmitter<string>;
  @Event() indPauseChange!: EventEmitter<boolean>;
  @Event() indClear!: EventEmitter<void>;

  componentDidLoad() {
    this.scrollToBottom();
  }

  @Watch('log')
  onLogChange() {
    if (!this.paused) this.scrollToBottom();
  }

  private scrollToBottom() {
    requestAnimationFrame(() => {
      const ta = this.host.shadowRoot?.querySelector<HTMLTextAreaElement>('.log');
      if (ta) ta.scrollTop = ta.scrollHeight;
    });
  }

  private filteredLines(): string[] {
    const lines = this.log.split('\n');
    if (!this.filterValue) return lines;
    const f = this.filterValue.toLowerCase();
    return lines.filter((l) => l.toLowerCase().includes(f));
  }

  private onFilter = (e: Event) => {
    const v = (e.target as HTMLInputElement).value;
    this.filterValue = v;
    this.indFilterChange.emit(v);
  };

  private onPause = (e: Event) => {
    const v = (e.target as HTMLInputElement).checked;
    this.paused = v;
    this.indPauseChange.emit(v);
  };

  render() {
    const filtered = this.filteredLines();
    const total = this.log ? this.log.split('\n').filter((l) => l.length > 0).length : 0;
    const visible = filtered.filter((l) => l.length > 0).length;
    const countLabel = this.filterValue ? `${visible} / ${total} msg` : `${total} msg`;
    return (
      <Host>
        <div class="toolbar" part="toolbar">
          <input
            class="filter"
            part="filter"
            type="search"
            placeholder="Filter topic / payload..."
            value={this.filterValue}
            onInput={this.onFilter}
          />
          <label class="check">
            <input type="checkbox" checked={this.paused} onChange={this.onPause} />
            <span>Pause</span>
          </label>
          <span class="spacer" />
          <span class="counter" part="counter">{countLabel}</span>
          <button
            type="button"
            class="clear"
            part="clear"
            onClick={() => this.indClear.emit()}
          >Clear</button>
        </div>
        <textarea
          class="log"
          part="log"
          readonly
          rows={this.rows}
        >{filtered.join('\n')}</textarea>
      </Host>
    );
  }
}
