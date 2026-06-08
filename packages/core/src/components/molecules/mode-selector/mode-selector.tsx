import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import type { SelectorPosition } from '../../atoms/selector-switch/selector-switch';

const DEFAULT_POSITIONS: SelectorPosition[] = [
  { value: 'off', label: 'Off' },
  { value: 'manual', label: 'Manual' },
  { value: 'auto', label: 'Auto' },
];

/**
 * Operating-mode selector (Off / Manual / Auto by default). A labelled wrapper
 * around `<ind-selector-switch>` that re-emits the chosen mode.
 */
@Component({
  tag: 'ind-mode-selector',
  styleUrls: ['../_shared/card.css', 'mode-selector.css'],
  shadow: true,
})
export class IndModeSelector {
  /** Control label. */
  @Prop() label: string = 'Mode';
  /** Selectable positions. */
  @Prop() positions: SelectorPosition[] = DEFAULT_POSITIONS;
  /** Current mode value (two-way). */
  @Prop({ mutable: true }) value?: string;
  @Prop() disabled: boolean = false;

  /** Fires with the selected mode value. */
  @Event() indChange!: EventEmitter<string>;

  private onChange = (e: CustomEvent<string>) => {
    e.stopPropagation();
    this.value = e.detail;
    this.indChange.emit(e.detail);
  };

  render() {
    return (
      <Host>
        <span class="card-title" part="label">{this.label}</span>
        <ind-selector-switch
          part="switch"
          positions={this.positions}
          value={this.value}
          disabled={this.disabled}
          label={this.label}
          onIndChange={this.onChange}
        />
      </Host>
    );
  }
}
