import { Component, Prop, h, Host } from '@stencil/core';

export type TimestampFormat = 'datetime' | 'date' | 'time' | 'relative' | 'iso';

@Component({
  tag: 'ind-timestamp',
  styleUrl: 'timestamp.css',
  shadow: true,
})
export class IndTimestamp {
  /** ISO string or epoch milliseconds. Defaults to now when omitted. */
  @Prop() value?: string | number;
  /** Display format. */
  @Prop({ reflect: true }) format: TimestampFormat = 'datetime';
  /** BCP-47 locale for formatting. */
  @Prop() locale?: string;
  /** Show seconds for time/datetime formats. */
  @Prop() seconds: boolean = true;

  private date(): Date {
    if (this.value === undefined) return new Date();
    return new Date(this.value);
  }

  private relative(d: Date): string {
    const diff = d.getTime() - Date.now();
    const abs = Math.abs(diff);
    const rtf = new Intl.RelativeTimeFormat(this.locale, { numeric: 'auto' });
    const units: [Intl.RelativeTimeFormatUnit, number][] = [
      ['day', 86400000],
      ['hour', 3600000],
      ['minute', 60000],
      ['second', 1000],
    ];
    for (const [unit, ms] of units) {
      if (abs >= ms || unit === 'second') {
        return rtf.format(Math.round(diff / ms), unit);
      }
    }
    return rtf.format(0, 'second');
  }

  private formatted(d: Date): string {
    if (Number.isNaN(d.getTime())) return '--';
    const sec = this.seconds ? { second: '2-digit' as const } : {};
    switch (this.format) {
      case 'iso':
        return d.toISOString();
      case 'date':
        return d.toLocaleDateString(this.locale);
      case 'time':
        return d.toLocaleTimeString(this.locale, { hour: '2-digit', minute: '2-digit', ...sec });
      case 'relative':
        return this.relative(d);
      case 'datetime':
      default:
        return d.toLocaleString(this.locale, {
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit', ...sec,
        });
    }
  }

  render() {
    const d = this.date();
    const text = this.formatted(d);
    const iso = Number.isNaN(d.getTime()) ? undefined : d.toISOString();
    return (
      <Host>
        <time class="ts" part="time" dateTime={iso}>{text}</time>
      </Host>
    );
  }
}
