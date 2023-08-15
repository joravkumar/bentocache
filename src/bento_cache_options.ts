/*
 * @blizzle/bentocache
 *
 * (c) Blizzle
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import EventEmitter from 'node:events'
import { noopLogger } from 'typescript-log'
import lodash from '@poppinss/utils/lodash'

import type {
  Duration,
  Emitter,
  FactoryTimeoutOptions,
  GracePeriodOptions as GracePeriodOptions,
  Logger,
  RawBentoCacheOptions,
} from './types/main.js'

/**
 * The default options to use throughout the library
 *
 * Some of them can be override on a per-cache basis
 * or on a per-operation basis
 */
export class BentoCacheOptions {
  #options: RawBentoCacheOptions

  /**
   * The default TTL for all caches
   *
   * @default 30m
   */
  ttl: Duration = '30m'

  /**
   * Default prefix for all caches
   */
  prefix: string = 'bentocache'

  /**
   * The grace period options
   */
  gracePeriod: GracePeriodOptions = {
    enabled: false,
    duration: '6h',
    fallbackDuration: '10s',
  }

  /**
   * Default early expiration percentage
   */
  earlyExpiration: number = 0

  /**
   * Whether to suppress remote cache errors
   */
  suppressRemoteCacheErrors: boolean = true

  /**
   * The soft and hard timeouts for the factories
   */
  timeouts?: FactoryTimeoutOptions = {
    soft: null,
    hard: null,
  }

  /**
   * The logger used throughout the library
   */
  logger: Logger = noopLogger()

  /**
   * The emitter used throughout the library
   */
  emitter: Emitter = new EventEmitter()

  /**
   * Max time to wait for the lock to be acquired
   */
  lockTimeout?: Duration = null

  constructor(options: RawBentoCacheOptions) {
    this.#options = lodash.merge({}, this, options)

    this.prefix = this.#options.prefix!
    this.ttl = this.#options.ttl!
    this.timeouts = this.#options.timeouts
    this.earlyExpiration = this.#options.earlyExpiration!
    this.suppressRemoteCacheErrors = this.#options.suppressRemoteCacheErrors!
    this.lockTimeout = this.#options.lockTimeout
    this.gracePeriod = this.#options.gracePeriod!

    this.emitter = this.#options.emitter!
    this.logger = this.#options.logger!.child({ pkg: 'bentocache' })
  }

  cloneWith(options: RawBentoCacheOptions) {
    const newOptions = lodash.merge({}, this.#options, options)
    return new BentoCacheOptions(newOptions)
  }
}
