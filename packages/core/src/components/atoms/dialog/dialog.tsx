import {
  Component,
  Prop,
  Method,
  Event,
  EventEmitter,
  Element,
  State,
  Watch,
  h,
  Host,
} from '@stencil/core';

export type DialogSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ind-dialog',
  styleUrl: 'dialog.css',
  shadow: true,
})
export class IndDialog {
  @Element() host!: HTMLElement;

  /** Open state. Two-way reflectable. */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;
  /** Heading rendered in the header bar. Becomes the accessible name. */
  @Prop() heading?: string;
  /** Size of the dialog content. */
  @Prop({ reflect: true }) size: DialogSize = 'md';
  /** Close when the operator clicks outside the dialog content. */
  @Prop() closeOnBackdrop: boolean = true;

  @State() private hasFooter: boolean = false;

  @Event() indOpen!: EventEmitter<void>;
  /** Fires when the dialog closes — for any reason (ESC, backdrop, close button, .close()). */
  @Event() indClose!: EventEmitter<void>;

  componentDidLoad() {
    this.syncOpen();
    this.watchFooter();
  }

  @Watch('open')
  onOpenChange() {
    this.syncOpen();
  }

  private syncOpen() {
    const dlg = this.host.shadowRoot?.querySelector('dialog');
    if (!dlg) return;
    if (this.open && !dlg.open) {
      dlg.showModal();
      this.indOpen.emit();
    } else if (!this.open && dlg.open) {
      dlg.close();
    }
  }

  private watchFooter() {
    const slot = this.host.shadowRoot?.querySelector('slot[name="footer"]') as HTMLSlotElement | null;
    if (!slot) return;
    const update = () => {
      this.hasFooter = slot.assignedNodes({ flatten: true }).some((n) => {
        if (n.nodeType === Node.ELEMENT_NODE) return true;
        return n.nodeType === Node.TEXT_NODE && (n.textContent ?? '').trim().length > 0;
      });
    };
    update();
    slot.addEventListener('slotchange', update);
  }

  /** Programmatically open. */
  @Method()
  async show(): Promise<void> {
    this.open = true;
  }

  /** Programmatically close. */
  @Method()
  async close(): Promise<void> {
    this.open = false;
  }

  private onNativeClose = () => {
    if (this.open) {
      this.open = false;
      this.indClose.emit();
    }
  };

  private onClick = (e: MouseEvent) => {
    if (!this.closeOnBackdrop) return;
    // The native <dialog> covers the whole viewport when open via showModal(),
    // but its bounding box is the content. Clicks outside that box are on the backdrop.
    const dlg = e.currentTarget as HTMLDialogElement;
    if (e.target !== dlg) return; // ignore clicks bubbling from inside .content
    const r = dlg.getBoundingClientRect();
    const inside =
      e.clientX >= r.left && e.clientX <= r.right &&
      e.clientY >= r.top  && e.clientY <= r.bottom;
    if (!inside) this.close();
  };

  render() {
    return (
      <Host>
        <dialog
          class="dialog"
          part="dialog"
          aria-label={this.heading}
          onClose={this.onNativeClose}
          onClick={this.onClick}
        >
          <div class="content" part="content">
            {this.heading && (
              <header class="header" part="header">
                <h2 class="heading" part="heading">{this.heading}</h2>
                <button
                  type="button"
                  class="close"
                  part="close"
                  aria-label="Close"
                  onClick={() => this.close()}
                >×</button>
              </header>
            )}
            <div class="body" part="body">
              <slot />
            </div>
            <footer class={{ footer: true, 'is-empty': !this.hasFooter }} part="footer">
              <slot name="footer" />
            </footer>
          </div>
        </dialog>
      </Host>
    );
  }
}
