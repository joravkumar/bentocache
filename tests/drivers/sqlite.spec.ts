/*
 * @blizzle/bentocache
 *
 * (c) Blizzle
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { registerApiTestSuite } from '../../test_helpers/driver_test_suite.js'
import { Sqlite } from '../../src/drivers/sql/sqlite.js'

registerApiTestSuite({
  test,
  driver: Sqlite,
  supportsMilliseconds: true,
  config: {
    prefix: 'japa',
    connection: {
      filename: 'cache.sqlite3',
    },
  },
})
