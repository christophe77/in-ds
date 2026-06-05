import { Component, Prop, h, Host } from '@stencil/core';

export type FillRowVariant = 'default' | 'success' | 'warning' | 'error';

@Component({
  tag: 'ind-fill-row',
  styleUrl: 'fill-row.css',
  shadow: true,
})
export class IndFillRow {
  /** Short ID rendered in mono (e.g. "F1", "TK-101"). */
  @Prop() tag?: string;
  /** Human description. */
  @Prop() label!: string;
  /** Current level. */
  @Prop() value: number = 0;
  /** Max value. Default 100. */
  @Prop() max: number = 100;
  /** Unit suffix on the numeric value (default `%`). */
  @Prop() unit: string = '%';
  /** Drives the progress color and the severity glyph. */
  @Prop({ reflect: true }) variant: FillRowVariant = 'default';
  /** Render the severity glyph between the value and the actions. */
  @Prop() severity: boolean = false;

  render() {
    return (
      <Host>
        {this.tag && <span class="tag" part="tag">{this.tag}</span>}
        <span class="label" part="label">{this.label}</span>
        <ind-progress
          class="progress"
          part="progress"
          value={this.value}
          max={this.max}
          variant={this.variant as 'default' | 'success' | 'warning' | 'error'}
          size="sm"
        />
        <span class="value" part="value">
          {Math.round(this.value)}{this.unit ? ' ' + this.unit : ''}
        </span>
        {this.severity && (
          <span class="severity" part="severity" aria-hidden="true">⚠</span>
        )}
        <span class="actions" part="actions">
          <slot />
        </span>
      </Host>
    );
  }
}
