import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

@Component({
  tag: 'ind-tree-node',
  styleUrl: 'tree-node.css',
  shadow: true,
})
export class IndTreeNode {
  /** Nesting depth (0 = root) — drives the indent. */
  @Prop() level: number = 0;
  /** Expanded state (ignored for leaf nodes). */
  @Prop({ mutable: true, reflect: true }) expanded: boolean = false;
  /** Leaf node — no twisty, not expandable. */
  @Prop({ reflect: true }) leaf: boolean = false;
  /** Selected state. */
  @Prop({ reflect: true }) selected: boolean = false;
  /** Visible text. Use the default slot for richer content. */
  @Prop() label?: string;

  /** Fires when the row is selected. */
  @Event() indSelect!: EventEmitter<void>;
  /** Fires when the twisty toggles expansion. */
  @Event() indToggle!: EventEmitter<boolean>;

  private toggle = (e: MouseEvent) => {
    e.stopPropagation();
    if (this.leaf) return;
    this.expanded = !this.expanded;
    this.indToggle.emit(this.expanded);
  };

  private select = () => {
    this.indSelect.emit();
  };

  private onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.select(); }
    else if (e.key === 'ArrowRight' && !this.leaf && !this.expanded) { this.expanded = true; this.indToggle.emit(true); }
    else if (e.key === 'ArrowLeft' && !this.leaf && this.expanded) { this.expanded = false; this.indToggle.emit(false); }
  };

  render() {
    return (
      <Host>
        <div
          class="row"
          part="row"
          role="treeitem"
          aria-expanded={this.leaf ? undefined : this.expanded ? 'true' : 'false'}
          aria-selected={this.selected ? 'true' : 'false'}
          tabindex="0"
          style={{ '--_indent': `${this.level * 16}px` }}
          onClick={this.select}
          onKeyDown={this.onKey}
        >
          <span class="indent" aria-hidden="true" />
          {this.leaf ? (
            <span class="twisty is-leaf" part="twisty" aria-hidden="true" />
          ) : (
            <button type="button" class="twisty" part="twisty" aria-label={this.expanded ? 'Collapse' : 'Expand'} onClick={this.toggle}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
          <span class="icon" part="icon"><slot name="icon" /></span>
          <span class="label" part="label">{this.label}<slot /></span>
        </div>
        {!this.leaf && this.expanded && (
          <div class="children" part="children" role="group">
            <slot name="children" />
          </div>
        )}
      </Host>
    );
  }
}
