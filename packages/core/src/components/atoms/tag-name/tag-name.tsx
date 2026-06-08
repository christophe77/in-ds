import { Component, Prop, h, Host } from '@stencil/core';

export type TagNameSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-tag-name',
  styleUrl: 'tag-name.css',
  shadow: true,
})
export class IndTagName {
  /** Equipment / instrument tag, e.g. "PT-101". Falls back to the slot. */
  @Prop() tag?: string;
  /** Size. */
  @Prop({ reflect: true }) size: TagNameSize = 'md';
  /** Render in a boxed style (outlined chip). */
  @Prop({ reflect: true }) boxed: boolean = false;

  render() {
    return (
      <Host>
        <span class="tag" part="tag">
          {this.tag ?? <slot />}
        </span>
      </Host>
    );
  }
}
