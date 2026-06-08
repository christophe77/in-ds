import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import type { SelectOption } from '../../atoms/select/select';

/**
 * Recipe / program picker: an `<ind-select>` plus a Load command. Emits
 * `indChange` as the selection changes and `indLoad` when the operator
 * commits the recipe to the controller.
 */
@Component({
  tag: 'ind-recipe-selector',
  styleUrls: ['../_shared/card.css', 'recipe-selector.css'],
  shadow: true,
})
export class IndRecipeSelector {
  /** Control label. */
  @Prop() label: string = 'Recipe';
  /** Available recipes. */
  @Prop() options: SelectOption[] = [];
  /** Selected recipe value (two-way). */
  @Prop({ mutable: true }) value?: string;
  @Prop() placeholder: string = 'Select recipe…';
  @Prop() disabled: boolean = false;
  @Prop() loadLabel: string = 'Load';

  /** Fires when the selection changes. */
  @Event() indChange!: EventEmitter<string>;
  /** Fires when the operator loads the selected recipe. */
  @Event() indLoad!: EventEmitter<string>;

  private onChange = (e: CustomEvent<string>) => {
    e.stopPropagation();
    this.value = e.detail;
    this.indChange.emit(e.detail);
  };

  private onLoad = () => {
    if (this.value) this.indLoad.emit(this.value);
  };

  render() {
    return (
      <Host>
        <span class="card-title" part="label">{this.label}</span>
        <div class="row" part="row">
          <ind-select
            class="select"
            part="select"
            options={this.options}
            value={this.value}
            placeholder={this.placeholder}
            disabled={this.disabled}
            label={this.label}
            size="md"
            onIndChange={this.onChange}
          />
          <ind-button
            variant="primary"
            size="md"
            label={this.loadLabel}
            disabled={this.disabled || !this.value}
            onIndActivate={this.onLoad}
          />
        </div>
      </Host>
    );
  }
}
