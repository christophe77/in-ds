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

export type CheckboxSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-checkbox',
  styleUrl: 'checkbox.css',
  shadow: true,
})
export class IndCheckbox {
  @Element() host!: HTMLElement;

  @Prop({ mutable: true, reflect: true }) checked: boolean = false;
  @Prop({ reflect: true }) indeterminate: boolean = false;
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true }) size: CheckboxSize = 'md';
  @Prop() label?: string;
  @Prop() name?: string;
  @Prop() value?: string;

  @Event() indChange!: EventEmitter<boolean>;

  componentDidLoad() {
    this.syncIndeterminate();
  }

  @Watch('indeterminate')
  syncIndeterminate() {
    const input = this.host.shadowRoot?.querySelector('input');
    if (input) input.indeterminate = this.indeterminate;
  }

  private onChange = (e: Event) => {
    const next = (e.target as HTMLInputElement).checked;
    this.checked = next;
    this.indChange.emit(next);
  };

  render() {
    const ariaChecked = this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false';
    return (
      <Host>
        <label class="wrap" part="wrap">
          <span class="box" part="box">
            <input
              type="checkbox"
              class="native"
              part="native"
              checked={this.checked}
              disabled={this.disabled}
              name={this.name}
              value={this.value}
              aria-checked={ariaChecked}
              onChange={this.onChange}
            />
            <span class="mark" part="mark" aria-hidden="true" />
          </span>
          {this.label && <span class="label" part="label">{this.label}</span>}
        </label>
      </Host>
    );
  }
}
