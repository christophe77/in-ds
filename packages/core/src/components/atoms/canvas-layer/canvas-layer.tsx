import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'ind-canvas-layer',
  styleUrl: 'canvas-layer.css',
  shadow: true,
})
export class IndCanvasLayer {
  /** Horizontal position as a percentage of the parent (0–100). */
  @Prop() x: number = 0;
  /** Vertical position as a percentage of the parent (0–100). */
  @Prop() y: number = 0;
  /** Rotation in degrees. */
  @Prop() rotation: number = 0;
  /** Uniform scale factor. */
  @Prop() scale: number = 1;
  /** Stacking order. */
  @Prop() z: number = 0;
  /** Anchor the placed content by its center (default) or top-left. */
  @Prop({ reflect: true }) anchor: 'center' | 'top-left' = 'center';

  render() {
    const translate = this.anchor === 'center' ? 'translate(-50%, -50%)' : 'translate(0, 0)';
    return (
      <Host
        style={{
          left: `${this.x}%`,
          top: `${this.y}%`,
          zIndex: String(this.z),
          transform: `${translate} rotate(${this.rotation}deg) scale(${this.scale})`,
        }}
      >
        <slot />
      </Host>
    );
  }
}
