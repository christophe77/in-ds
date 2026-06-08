import { Component, Prop, h, Host } from '@stencil/core';

export type LabelTone = 'primary' | 'secondary' | 'muted';
export type LabelSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-label',
  styleUrl: 'label.css',
  shadow: true,
})
export class IndLabel {
  /** Text emphasis. */
  @Prop({ reflect: true }) tone: LabelTone = 'secondary';
  /** Size. */
  @Prop({ reflect: true }) size: LabelSize = 'md';
  /** Uppercase caption styling (tracking + smaller). */
  @Prop({ reflect: true }) uppercase: boolean = false;
  /** Associates the label with a form control id (rendered as <label for>). */
  @Prop() htmlFor?: string;
  /** Optional required marker. */
  @Prop({ reflect: true }) required: boolean = false;

  render() {
    const Tag: any = this.htmlFor ? 'label' : 'span';
    return (
      <Host>
        <Tag class="text" part="text" htmlFor={this.htmlFor}>
          <slot />
          {this.required && <span class="req" part="required" aria-hidden="true">*</span>}
        </Tag>
      </Host>
    );
  }
}
