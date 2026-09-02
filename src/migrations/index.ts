import * as migration_20260901_171920_initial from './20260901_171920_initial';
import * as migration_20260902_001541_page_templates from './20260902_001541_page_templates';
import * as migration_20260902_141321_site_settings from './20260902_141321_site_settings';

export const migrations = [
  {
    up: migration_20260901_171920_initial.up,
    down: migration_20260901_171920_initial.down,
    name: '20260901_171920_initial',
  },
  {
    up: migration_20260902_001541_page_templates.up,
    down: migration_20260902_001541_page_templates.down,
    name: '20260902_001541_page_templates',
  },
  {
    up: migration_20260902_141321_site_settings.up,
    down: migration_20260902_141321_site_settings.down,
    name: '20260902_141321_site_settings'
  },
];
