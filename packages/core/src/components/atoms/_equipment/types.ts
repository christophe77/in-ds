/** Shared process state for equipment symbols (pump, motor, fan, …). */
export type EquipmentState = 'running' | 'stopped' | 'fault' | 'warning' | 'maintenance';

/** Shared size scale for equipment symbols. */
export type EquipmentSize = 'sm' | 'md' | 'lg';
