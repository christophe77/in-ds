/**
 * Client runtime that registers the ind-ds custom elements used in the site's
 * live demos.
 *
 * We import each component's standalone `defineCustomElement` from
 * `@ind-ds/core/dist/components/*` and call it explicitly. We deliberately do NOT
 * use the lazy `defineCustomElements()` loader: it resolves each component's
 * chunk through a runtime dynamic import that Vite cannot statically analyse, so
 * those chunks 404 in a static build (GitHub Pages). Explicit per-component
 * registration is bundled by Vite and works offline.
 *
 * Only the components actually rendered on the site are listed here — not all
 * 115 — to keep the JavaScript payload small. The components overview page lists
 * the full catalog as metadata (see src/data/components.ts).
 */
import { defineCustomElement as ind_pump } from '@ind-ds/core/dist/components/ind-pump.js';
import { defineCustomElement as ind_valve } from '@ind-ds/core/dist/components/ind-valve.js';
import { defineCustomElement as ind_motor } from '@ind-ds/core/dist/components/ind-motor.js';
import { defineCustomElement as ind_fan } from '@ind-ds/core/dist/components/ind-fan.js';
import { defineCustomElement as ind_tank } from '@ind-ds/core/dist/components/ind-tank.js';
import { defineCustomElement as ind_silo } from '@ind-ds/core/dist/components/ind-silo.js';
import { defineCustomElement as ind_pipe } from '@ind-ds/core/dist/components/ind-pipe.js';
import { defineCustomElement as ind_conveyor } from '@ind-ds/core/dist/components/ind-conveyor.js';

import { defineCustomElement as ind_led } from '@ind-ds/core/dist/components/ind-led.js';
import { defineCustomElement as ind_status_dot } from '@ind-ds/core/dist/components/ind-status-dot.js';
import { defineCustomElement as ind_badge } from '@ind-ds/core/dist/components/ind-badge.js';
import { defineCustomElement as ind_signal_quality } from '@ind-ds/core/dist/components/ind-signal-quality.js';
import { defineCustomElement as ind_heartbeat } from '@ind-ds/core/dist/components/ind-heartbeat.js';
import { defineCustomElement as ind_connection_indicator } from '@ind-ds/core/dist/components/ind-connection-indicator.js';

import { defineCustomElement as ind_alarm } from '@ind-ds/core/dist/components/ind-alarm.js';
import { defineCustomElement as ind_alarm_count } from '@ind-ds/core/dist/components/ind-alarm-count.js';
import { defineCustomElement as ind_alarm_row } from '@ind-ds/core/dist/components/ind-alarm-row.js';
import { defineCustomElement as ind_alarm_panel } from '@ind-ds/core/dist/components/ind-alarm-panel.js';

import { defineCustomElement as ind_value } from '@ind-ds/core/dist/components/ind-value.js';
import { defineCustomElement as ind_gauge } from '@ind-ds/core/dist/components/ind-gauge.js';
import { defineCustomElement as ind_linear_gauge } from '@ind-ds/core/dist/components/ind-linear-gauge.js';
import { defineCustomElement as ind_setpoint } from '@ind-ds/core/dist/components/ind-setpoint.js';
import { defineCustomElement as ind_progress_ring } from '@ind-ds/core/dist/components/ind-progress-ring.js';

import { defineCustomElement as ind_sparkline } from '@ind-ds/core/dist/components/ind-sparkline.js';
import { defineCustomElement as ind_kpi_card } from '@ind-ds/core/dist/components/ind-kpi-card.js';
import { defineCustomElement as ind_trend_widget } from '@ind-ds/core/dist/components/ind-trend-widget.js';

import { defineCustomElement as ind_button } from '@ind-ds/core/dist/components/ind-button.js';
import { defineCustomElement as ind_mode_selector } from '@ind-ds/core/dist/components/ind-mode-selector.js';
import { defineCustomElement as ind_start_stop_control } from '@ind-ds/core/dist/components/ind-start-stop-control.js';
import { defineCustomElement as ind_estop } from '@ind-ds/core/dist/components/ind-estop.js';
import { defineCustomElement as ind_knob } from '@ind-ds/core/dist/components/ind-knob.js';
import { defineCustomElement as ind_slider } from '@ind-ds/core/dist/components/ind-slider.js';
import { defineCustomElement as ind_toggle } from '@ind-ds/core/dist/components/ind-toggle.js';
import { defineCustomElement as ind_input } from '@ind-ds/core/dist/components/ind-input.js';

import { defineCustomElement as ind_pump_card } from '@ind-ds/core/dist/components/ind-pump-card.js';
import { defineCustomElement as ind_tank_level_card } from '@ind-ds/core/dist/components/ind-tank-level-card.js';
import { defineCustomElement as ind_valve_card } from '@ind-ds/core/dist/components/ind-valve-card.js';
import { defineCustomElement as ind_motor_card } from '@ind-ds/core/dist/components/ind-motor-card.js';
import { defineCustomElement as ind_equipment_status_card } from '@ind-ds/core/dist/components/ind-equipment-status-card.js';

import { defineCustomElement as ind_app_header } from '@ind-ds/core/dist/components/ind-app-header.js';
import { defineCustomElement as ind_status_bar } from '@ind-ds/core/dist/components/ind-status-bar.js';
import { defineCustomElement as ind_tag_name } from '@ind-ds/core/dist/components/ind-tag-name.js';
import { defineCustomElement as ind_tab } from '@ind-ds/core/dist/components/ind-tab.js';
import { defineCustomElement as ind_nav_item } from '@ind-ds/core/dist/components/ind-nav-item.js';

const registrations = [
  ind_pump, ind_valve, ind_motor, ind_fan, ind_tank, ind_silo, ind_pipe, ind_conveyor,
  ind_led, ind_status_dot, ind_badge, ind_signal_quality, ind_heartbeat, ind_connection_indicator,
  ind_alarm, ind_alarm_count, ind_alarm_row, ind_alarm_panel,
  ind_value, ind_gauge, ind_linear_gauge, ind_setpoint, ind_progress_ring,
  ind_sparkline, ind_kpi_card, ind_trend_widget,
  ind_button, ind_mode_selector, ind_start_stop_control, ind_estop, ind_knob, ind_slider, ind_toggle, ind_input,
  ind_pump_card, ind_tank_level_card, ind_valve_card, ind_motor_card, ind_equipment_status_card,
  ind_app_header, ind_status_bar, ind_tag_name, ind_tab, ind_nav_item,
];

for (const define of registrations) {
  try {
    define();
  } catch {
    // Already defined (e.g. across HMR reloads) — safe to ignore.
  }
}
