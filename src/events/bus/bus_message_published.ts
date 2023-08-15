/*
 * @blizzle/bentocache
 *
 * (c) Blizzle
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { CacheBusMessage, CacheEvent } from '../../types/main.js'

/**
 * Event when the bus publishes a message
 */
export class BusMessagePublished implements CacheEvent {
  name = 'bus:message:published' as const

  constructor(readonly message: CacheBusMessage) {}

  toJSON() {
    return {
      busId: this.message.busId,
      keys: this.message.keys,
      type: this.message.type,
    }
  }
}
