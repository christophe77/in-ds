import { Component, Prop, h, Host } from '@stencil/core';

export type LedState = 'running' | 'stopped' | 'fault' | 'warning' | 'maintenance';
export type LedSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-led',
  styleUrl: 'led.css',
  shadow: true,
})
export class IndLed {
  /** Process state driving the LED color and ARIA live politeness. */
  @Prop({ reflect: true }) state: LedState = 'stopped';

  /** Visual size. */
  @Prop({ reflect: true }) size: LedSize = 'md';

  /** Blink. For SCADA, fast blink = unacknowledged condition. Stops respecting prefers-reduced-motion. */
  @Prop({ reflect: true }) blinking: boolean = false;

  /** Optional visible label rendered next to the LED. Always becomes the accessible name. */
  @Prop() label?: string;

  render() {
    const accessibleName = this.label ?? `${this.state} indicator`;
    return (
      <Host
        role="status"
        aria-label={accessibleName}
        aria-live={this.state === 'fault' ? 'assertive' : 'polite'}
      >
        <span class="led" part="led" aria-hidden="true" />
        {this.label && <span class="label" part="label">{this.label}</span>}
      </Host>
    );
  }
}
