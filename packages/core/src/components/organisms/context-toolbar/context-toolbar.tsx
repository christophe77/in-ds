import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Contextual toolbar that sits below the app header: current view title (with
 * optional breadcrumb slot) on the left and contextual command buttons on the
 * right via the `actions` slot.
 */
@Component({
  tag: 'ind-context-toolbar',
  styleUrl: 'context-toolbar.css',
  shadow: true,
})
export class IndContextToolbar {
  /** Current view title. */
  @Prop() heading?: string;
  /** Secondary context line. */
  @Prop() subtitle?: string;

  render() {
    return (
      <Host role="toolbar">
        <span class="breadcrumb" part="breadcrumb"><slot name="breadcrumb" /></span>
        {(this.heading || this.subtitle) && (
          <div class="titles" part="titles">
            {this.heading && <span class="title">{this.heading}</span>}
            {this.subtitle && <span class="subtitle">{this.subtitle}</span>}
          </div>
        )}
        <span class="spacer" />
        <div class="actions" part="actions"><slot name="actions" /></div>
        <slot />
      </Host>
    );
  }
}
