import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Templates/T1 — Connection screen',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full-screen connection layout: branding column (left, dark) + form column (right). ' +
          'Used before the operator is authenticated against a machine. ' +
          'Once connected, switch to **T2 — Connected app**.',
      },
    },
    controls: { disable: true },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="display: flex; min-height: 100vh; font-family: var(--ind-font-family-sans);">

      <!-- Brand column -->
      <aside style="
        width: 360px;
        background: var(--ind-color-palette-neutral-50);
        color: var(--ind-color-palette-neutral-1000);
        padding: 48px 32px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        box-sizing: border-box;
      ">
        <header style="display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 36px; color: var(--ind-button-primary-bg); line-height: 1;">⬢</span>
          <div style="display: flex; flex-direction: column;">
            <span style="font-size: 20px; font-weight: 700; letter-spacing: 0.06em;">INDUSTRIAL</span>
            <span style="font-size: 11px; letter-spacing: 0.1em; color: var(--ind-color-palette-neutral-600);">
              MAINTENANCE CONSOLE
            </span>
          </div>
        </header>

        <p style="margin: 24px 0 0; font-size: 12px; color: var(--ind-color-palette-neutral-700); line-height: 1.5;">
          Connect this workstation to a machine to run diagnostics, reset PLC flags,
          adjust dispense parameters and stream MQTT telemetry.
        </p>

        <div style="flex: 1;"></div>

        <footer style="font-size: 11px; color: var(--ind-color-palette-neutral-600);">
          <p style="margin: 0;">v1.4.2</p>
          <p style="margin: 4px 0 0;">
            <a class="ind-text-link" href="#">Documentation</a>
            <span style="margin: 0 6px; color: var(--ind-color-palette-neutral-500);">·</span>
            <a class="ind-text-link" href="#">Support</a>
          </p>
        </footer>
      </aside>

      <ind-divider orientation="vertical"></ind-divider>

      <!-- Form column -->
      <section style="
        flex: 1;
        background: var(--ind-surface-background);
        padding: 80px 64px;
        display: flex;
        flex-direction: column;
        gap: 32px;
        max-width: 560px;
        box-sizing: border-box;
      ">
        <h1 style="font-size: 15px; font-weight: 700; margin: 0; letter-spacing: 0.02em;">
          Connect to machine
        </h1>

        <div class="ind-stack ind-stack--md">
          <ind-input label="Machine IP" placeholder="192.168.1.10"></ind-input>
          <ind-input type="number" label="Port" .value=${'1883'}></ind-input>
          <ind-input label="Machine ID" placeholder="MAC-001"></ind-input>
        </div>

        <ind-button variant="primary" size="lg">Connect</ind-button>

        <div>
          <h4 class="ind-section-label" style="margin-bottom: 12px;">Recent connections</h4>
          <div class="ind-stack ind-stack--xs">
            <button class="ind-row" style="
              background: transparent;
              border: 1px solid var(--ind-surface-border-default);
              border-radius: var(--ind-radius-md);
              padding: 8px 12px;
              text-align: left;
              cursor: pointer;
              color: inherit;
              font: inherit;
            ">
              <span class="ind-text-mono">192.168.1.10:1883</span>
              <span class="ind-spacer"></span>
              <span class="ind-text-muted ind-text-mono" style="font-size: 11px;">MAC-204 · 2 h ago</span>
            </button>
            <button class="ind-row" style="
              background: transparent;
              border: 1px solid var(--ind-surface-border-default);
              border-radius: var(--ind-radius-md);
              padding: 8px 12px;
              text-align: left;
              cursor: pointer;
              color: inherit;
              font: inherit;
            ">
              <span class="ind-text-mono">10.0.0.5:1883</span>
              <span class="ind-spacer"></span>
              <span class="ind-text-muted ind-text-mono" style="font-size: 11px;">MAC-102 · yesterday</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  `,
};

export const InvalidConnection: Story = {
  name: 'With validation error',
  render: () => html`
    <div style="display: flex; min-height: 100vh; font-family: var(--ind-font-family-sans);">
      <aside style="
        width: 360px;
        background: var(--ind-color-palette-neutral-50);
        color: var(--ind-color-palette-neutral-1000);
        padding: 48px 32px;
        box-sizing: border-box;
      ">
        <header style="display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 36px; color: var(--ind-button-primary-bg); line-height: 1;">⬢</span>
          <span style="font-size: 20px; font-weight: 700; letter-spacing: 0.06em;">INDUSTRIAL</span>
        </header>
      </aside>

      <ind-divider orientation="vertical"></ind-divider>

      <section style="flex: 1; background: var(--ind-surface-background); padding: 80px 64px; max-width: 560px; box-sizing: border-box;">
        <h1 style="font-size: 15px; font-weight: 700; margin: 0 0 24px;">Connect to machine</h1>

        <p class="ind-warn-note" style="margin-bottom: 24px;">
          Could not reach <span class="ind-text-mono">192.168.1.99:1883</span> — connection timed out after 5 s.
          Verify the machine is powered on and on the same network.
        </p>

        <div class="ind-stack ind-stack--md">
          <ind-input label="Machine IP" .value=${'192.168.1.99'} invalid></ind-input>
          <ind-input type="number" label="Port" .value=${'1883'}></ind-input>
          <ind-input label="Machine ID" placeholder="MAC-001"></ind-input>
        </div>

        <div class="ind-row" style="margin-top: 32px;">
          <ind-button variant="ghost">Reset</ind-button>
          <span class="ind-spacer"></span>
          <ind-button variant="primary" size="lg">Retry</ind-button>
        </div>
      </section>
    </div>
  `,
};
