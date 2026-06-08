import { Component, Prop, h, Host } from '@stencil/core';

export type PipeOrientation = 'horizontal' | 'vertical';
export type PipeFlow = 'none' | 'forward' | 'reverse';
export type PipeTone = 'neutral' | 'running' | 'fault' | 'warning';

@Component({
  tag: 'ind-pipe',
  styleUrl: 'pipe.css',
  shadow: true,
})
export class IndPipe {
  /** Run direction of the segment. */
  @Prop({ reflect: true }) orientation: PipeOrientation = 'horizontal';
  /** Flow animation. `none` = static. */
  @Prop({ reflect: true }) flow: PipeFlow = 'none';
  /** Color tone of the fluid. */
  @Prop({ reflect: true }) tone: PipeTone = 'neutral';
  /** Pipe thickness in px. */
  @Prop() thickness: number = 8;
  /** Length in px (along the orientation). Defaults to filling the host. */
  @Prop() length?: number;
  /** Accessible label (decorative by default). */
  @Prop() label?: string;

  render() {
    const horizontal = this.orientation === 'horizontal';
    const style: Record<string, string> = { '--_thickness': `${this.thickness}px` };
    if (this.length !== undefined) {
      style[horizontal ? 'width' : 'height'] = `${this.length}px`;
    }
    return (
      <Host
        role={this.label ? 'img' : 'presentation'}
        aria-label={this.label}
        aria-hidden={this.label ? undefined : 'true'}
        style={style}
      >
        <span class="pipe" part="pipe">
          <span class="flow" part="flow" />
        </span>
      </Host>
    );
  }
}
