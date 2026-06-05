import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Atoms/Dialog',
  component: 'ind-dialog',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Modal dialog backed by the native `<dialog>` element with `showModal()`. ' +
          'Closes on ESC, on backdrop click (unless `close-on-backdrop="false"`), and on `.close()`. ' +
          'Slot `footer` for action buttons.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Confirm: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <ind-button
      variant="default"
      @indActivate=${() => {
        document.getElementById('demo-confirm')?.setAttribute('open', '');
      }}
    >Open confirm</ind-button>

    <ind-dialog id="demo-confirm" heading="Confirm reset" size="sm">
      <p style="margin: 0;">
        This will send a reset command to the dispense robot. Active orders will be interrupted.
        Confirm only if no operator is currently using the machine.
      </p>
      <div slot="footer">
        <ind-button
          variant="ghost"
          @indActivate=${() => document.getElementById('demo-confirm')?.removeAttribute('open')}
        >Cancel</ind-button>
        <ind-button
          variant="danger"
          @indActivate=${() => document.getElementById('demo-confirm')?.removeAttribute('open')}
        >Reset</ind-button>
      </div>
    </ind-dialog>
  `,
};

export const HoldToConfirmAction: Story = {
  name: 'Confirm with hold-to-confirm action',
  parameters: { controls: { disable: true } },
  render: () => html`
    <ind-button
      variant="default"
      @indActivate=${() => document.getElementById('demo-trip')?.setAttribute('open', '')}
    >Open trip dialog</ind-button>

    <ind-dialog id="demo-trip" heading="Emergency trip" size="sm">
      <p style="margin: 0;">
        Tripping the SCARA will cut power to all axes and require a maintenance acknowledgement
        before restarting. Hold the button below 1.5 s to confirm.
      </p>
      <div slot="footer">
        <ind-button
          variant="ghost"
          @indActivate=${() => document.getElementById('demo-trip')?.removeAttribute('open')}
        >Cancel</ind-button>
        <ind-button
          variant="danger"
          .holdToConfirmMs=${1500}
          @indActivate=${() => document.getElementById('demo-trip')?.removeAttribute('open')}
        >Trip — hold 1.5 s</ind-button>
      </div>
    </ind-dialog>
  `,
};

export const FormDialog: Story = {
  name: 'Form — Adjust tank level',
  parameters: { controls: { disable: true } },
  render: () => html`
    <ind-button
      variant="primary"
      @indActivate=${() => document.getElementById('demo-tank')?.setAttribute('open', '')}
    >Adjust Tank A</ind-button>

    <ind-dialog id="demo-tank" heading="Adjust tank level — Tank A" size="md">
      <div class="ind-stack ind-stack--md">
        <ind-input type="number" label="Current level" .value=${'24'}>
          <span slot="suffix">%</span>
        </ind-input>
        <ind-input type="number" label="New level" .value=${'100'}>
          <span slot="suffix">%</span>
        </ind-input>
        <ind-textarea label="Note" placeholder="Reason for manual adjustment"></ind-textarea>
      </div>
      <div slot="footer">
        <ind-button
          variant="ghost"
          @indActivate=${() => document.getElementById('demo-tank')?.removeAttribute('open')}
        >Cancel</ind-button>
        <ind-button
          variant="primary"
          @indActivate=${() => document.getElementById('demo-tank')?.removeAttribute('open')}
        >Apply</ind-button>
      </div>
    </ind-dialog>
  `,
};
