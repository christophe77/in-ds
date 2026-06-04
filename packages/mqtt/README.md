# @ind-ds/mqtt

Live MQTT → DOM binding for ind-ds. One broker connection, declarative topic → attribute mappings, no per-component plumbing.

## Usage

```ts
import { IndMqttClient, bindLed, bindBlink } from '@ind-ds/mqtt';

const client = new IndMqttClient({
  url: 'wss://broker.example:8083',
  options: { username: 'hmi', password: '...', clientId: `hmi-${crypto.randomUUID()}` },
});

await client.connect();

const pump = document.querySelector<HTMLElement>('#pump-101')!;

// Map raw broker values to the ind-led vocabulary.
bindLed(client, 'plant/area1/pump-101/state', pump, (p) => {
  switch (p) {
    case 'RUN':   return 'running';
    case 'STOP':  return 'stopped';
    case 'FAULT': return 'fault';
    default:      return 'stopped';
  }
});

// Blink while the alarm is unacknowledged.
bindBlink(client, 'plant/area1/pump-101/alarm/unack', pump);
```

For arbitrary payloads, use `client.bind({ topic, element, attribute, transform })` directly.

To push numeric values onto a component that consumes them as a JS property (gauges, trends), pass `asProperty: true`:

```ts
client.bind({
  topic: 'plant/area1/tank-204/level',
  element: tankGauge,
  attribute: 'value',
  asProperty: true,
  transform: (p) => Number.parseFloat(p),
});
```

## Why not WebSocket / SSE adapters?

MQTT is what plant SCADA brokers actually speak. WS/SSE adapters can live alongside as separate packages — same shape, same `bind()` contract.
