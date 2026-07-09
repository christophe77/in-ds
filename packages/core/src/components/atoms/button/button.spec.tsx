import { newSpecPage } from '@stencil/core/testing';
import { IndButton } from './button';

async function mountButton(props = '') {
  const page = await newSpecPage({
    components: [IndButton],
    html: `<ind-button ${props}>Stop</ind-button>`,
  });
  const btn = page.root!.shadowRoot!.querySelector('button')!;
  const activated: number[] = [];
  page.root!.addEventListener('indActivate', () => activated.push(1));
  return { page, btn, activated };
}

function keydown(el: Element, key: string, repeat = false) {
  const ev = new KeyboardEvent('keydown', { key });
  Object.defineProperty(ev, 'repeat', { value: repeat });
  el.dispatchEvent(ev);
}

describe('ind-button', () => {
  it('emits indActivate immediately on pointer down when holdToConfirmMs is 0', async () => {
    const { btn, activated } = await mountButton();
    btn.dispatchEvent(new Event('pointerdown'));
    expect(activated).toHaveLength(1);
  });

  it('emits on Enter/Space keydown', async () => {
    const { btn, activated } = await mountButton();
    keydown(btn, 'Enter');
    keydown(btn, ' ');
    expect(activated).toHaveLength(2);
  });

  it('ignores OS auto-repeat keydown (event.repeat === true)', async () => {
    const { btn, activated } = await mountButton();
    keydown(btn, 'Enter', true);
    expect(activated).toHaveLength(0);
  });

  it('does not emit when disabled', async () => {
    const { btn, activated } = await mountButton('disabled');
    btn.dispatchEvent(new Event('pointerdown'));
    keydown(btn, 'Enter');
    expect(activated).toHaveLength(0);
  });

  it('does not emit synchronously on pointer down when holdToConfirmMs > 0', async () => {
    const { btn, activated } = await mountButton('hold-to-confirm-ms="800"');
    btn.dispatchEvent(new Event('pointerdown'));
    expect(activated).toHaveLength(0);
  });
});
