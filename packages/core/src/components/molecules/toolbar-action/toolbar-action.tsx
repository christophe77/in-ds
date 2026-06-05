import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'ind-toolbar-action',
  styleUrl: 'toolbar-action.css',
  shadow: true,
})
export class IndToolbarAction {
  /** Counter rendered before the actions (e.g. "1 248 messages"). */
  @Prop() counter?: string | number;

  render() {
    const hasCounter = this.counter !== undefined && this.counter !== '' && this.counter !== null;
    return (
      <Host>
        <span class="filter" part="filter"><slot name="filter" /></span>
        <span class="flags" part="flags"><slot name="flags" /></span>
        <span class="spacer" />
        {hasCounter && <span class="counter" part="counter">{this.counter}</span>}
        <span class="actions" part="actions"><slot name="actions" /></span>
      </Host>
    );
  }
}
