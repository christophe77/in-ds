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

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaVariant = 'default' | 'mono';

@Component({
  tag: 'ind-textarea',
  styleUrl: 'textarea.css',
  shadow: true,
})
export class IndTextarea {
  @Element() host!: HTMLElement;

  @Prop({ mutable: true }) value: string = '';
  @Prop() placeholder?: string;
  @Prop() label?: string;
  @Prop() name?: string;
  @Prop() rows: number = 4;
  @Prop({ reflect: true }) size: TextareaSize = 'md';
  /** `mono` swaps to JetBrains Mono and small font — for logs and MQTT streams. */
  @Prop({ reflect: true }) variant: TextareaVariant = 'default';
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true }) readonly: boolean = false;
  @Prop({ reflect: true }) invalid: boolean = false;
  /** When true, auto-scrolls to bottom whenever `value` changes. Pair with `readonly` for log streams. */
  @Prop() autoScroll: boolean = false;

  @Event() indInput!: EventEmitter<string>;
  @Event() indChange!: EventEmitter<string>;

  componentDidLoad() {
    if (this.autoScroll) this.scrollToBottom();
  }

  @Watch('value')
  onValueChange() {
    if (this.autoScroll) this.scrollToBottom();
  }

  private scrollToBottom() {
    requestAnimationFrame(() => {
      const ta = this.host.shadowRoot?.querySelector('textarea');
      if (ta) ta.scrollTop = ta.scrollHeight;
    });
  }

  private onInput = (e: Event) => {
    const v = (e.target as HTMLTextAreaElement).value;
    this.value = v;
    this.indInput.emit(v);
  };

  private onChange = (e: Event) => {
    this.indChange.emit((e.target as HTMLTextAreaElement).value);
  };

  render() {
    return (
      <Host>
        <label class="wrap" part="wrap">
          {this.label && <span class="label" part="label">{this.label}</span>}
          <textarea
            part="textarea"
            class="textarea"
            placeholder={this.placeholder}
            rows={this.rows}
            disabled={this.disabled}
            readonly={this.readonly}
            name={this.name}
            aria-invalid={this.invalid ? 'true' : 'false'}
            onInput={this.onInput}
            onChange={this.onChange}
          >{this.value}</textarea>
        </label>
      </Host>
    );
  }
}
