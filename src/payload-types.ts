/* tslint:disable */
/* eslint-disable */
/**
 * Barrel for generated Payload types (split across payload-types-a/b/c for upload size).
 */
export * from './payload-types-a'
export * from './payload-types-b'
export * from './payload-types-c'
import type { Config } from './payload-types-a'

declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
