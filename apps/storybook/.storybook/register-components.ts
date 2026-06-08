// Eagerly register every ind-ds custom element for Storybook.
//
// We import the standalone custom-element modules from `dist/components/*`
// rather than calling the lazy `defineCustomElements()` loader. The lazy loader
// resolves each component's `.entry.js` through a runtime dynamic import that a
// bundler (Vite) cannot statically analyze — so those chunks 404 in a static
// Storybook build (e.g. GitHub Pages) and components never render. Each module
// below self-defines on import, inlines its styles, and is bundled by Vite.
//
// Keep this list in sync with packages/core component tags.
import '@ind-ds/core/dist/components/ind-led.js';
import '@ind-ds/core/dist/components/ind-value.js';
import '@ind-ds/core/dist/components/ind-alarm.js';
import '@ind-ds/core/dist/components/ind-valve.js';
import '@ind-ds/core/dist/components/ind-status-dot.js';
import '@ind-ds/core/dist/components/ind-button.js';
import '@ind-ds/core/dist/components/ind-input.js';
import '@ind-ds/core/dist/components/ind-checkbox.js';
import '@ind-ds/core/dist/components/ind-select.js';
import '@ind-ds/core/dist/components/ind-textarea.js';
import '@ind-ds/core/dist/components/ind-dialog.js';
import '@ind-ds/core/dist/components/ind-divider.js';
import '@ind-ds/core/dist/components/ind-progress.js';
import '@ind-ds/core/dist/components/ind-scara-canvas.js';
import '@ind-ds/core/dist/components/ind-shelf-canvas.js';

// Indicators
import '@ind-ds/core/dist/components/ind-badge.js';
import '@ind-ds/core/dist/components/ind-counter.js';
import '@ind-ds/core/dist/components/ind-signal-quality.js';
import '@ind-ds/core/dist/components/ind-connection-indicator.js';
import '@ind-ds/core/dist/components/ind-heartbeat.js';
import '@ind-ds/core/dist/components/ind-sparkline.js';
import '@ind-ds/core/dist/components/ind-progress-ring.js';

// Process equipment
import '@ind-ds/core/dist/components/ind-pump.js';
import '@ind-ds/core/dist/components/ind-motor.js';
import '@ind-ds/core/dist/components/ind-fan.js';
import '@ind-ds/core/dist/components/ind-compressor.js';
import '@ind-ds/core/dist/components/ind-conveyor.js';
import '@ind-ds/core/dist/components/ind-heater.js';
import '@ind-ds/core/dist/components/ind-cooler.js';
import '@ind-ds/core/dist/components/ind-tank.js';
import '@ind-ds/core/dist/components/ind-silo.js';
import '@ind-ds/core/dist/components/ind-pipe.js';

// Inputs
import '@ind-ds/core/dist/components/ind-toggle.js';
import '@ind-ds/core/dist/components/ind-selector-switch.js';
import '@ind-ds/core/dist/components/ind-estop.js';
import '@ind-ds/core/dist/components/ind-setpoint.js';
import '@ind-ds/core/dist/components/ind-slider.js';
import '@ind-ds/core/dist/components/ind-knob.js';
import '@ind-ds/core/dist/components/ind-datetime-picker.js';

// Navigation
import '@ind-ds/core/dist/components/ind-icon.js';
import '@ind-ds/core/dist/components/ind-breadcrumb-item.js';
import '@ind-ds/core/dist/components/ind-tab.js';
import '@ind-ds/core/dist/components/ind-tree-node.js';
import '@ind-ds/core/dist/components/ind-nav-item.js';

// Data display
import '@ind-ds/core/dist/components/ind-label.js';
import '@ind-ds/core/dist/components/ind-unit-label.js';
import '@ind-ds/core/dist/components/ind-timestamp.js';
import '@ind-ds/core/dist/components/ind-tag-name.js';
import '@ind-ds/core/dist/components/ind-alarm-count.js';

// Charts & visualization
import '@ind-ds/core/dist/components/ind-gauge.js';
import '@ind-ds/core/dist/components/ind-linear-gauge.js';
import '@ind-ds/core/dist/components/ind-xy-point.js';
import '@ind-ds/core/dist/components/ind-process-symbol.js';
import '@ind-ds/core/dist/components/ind-canvas-layer.js';

// Molecules
import '@ind-ds/core/dist/components/ind-health-card.js';
import '@ind-ds/core/dist/components/ind-fill-row.js';
import '@ind-ds/core/dist/components/ind-toolbar-action.js';

// Organisms
import '@ind-ds/core/dist/components/ind-app-header.js';
import '@ind-ds/core/dist/components/ind-sidebar-nav.js';
import '@ind-ds/core/dist/components/ind-status-bar.js';
import '@ind-ds/core/dist/components/ind-mqtt-monitor.js';
