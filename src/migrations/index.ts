import * as migration_20260901_171920_initial from './20260901_171920_initial';

export const migrations = [
  {
    up: migration_20260901_171920_initial.up,
    down: migration_20260901_171920_initial.down,
    name: '20260901_171920_initial'
  },
];
