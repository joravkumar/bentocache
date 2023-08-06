import { test } from '@japa/runner'
import { Postgres } from '../../src/drivers/sql/postgres.js'
import { registerApiTestSuite } from '../../test_helpers/driver_test_suite.js'

registerApiTestSuite({
  test,
  driver: Postgres,
  config: {
    ttl: 30 * 100,
    prefix: 'japa',
    connection: { user: 'postgres', password: 'postgres' },
  },
})