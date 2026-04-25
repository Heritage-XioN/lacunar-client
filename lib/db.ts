import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

/**
 * Database connection management for Next.js
 * Uses a global variable to prevent multiple connections during HMR
 */

const globalForDb = global as unknown as {
	pool: Pool | undefined;
};

const pool =
	globalForDb.pool ??
	new Pool({
		connectionString: process.env.DATABASE_URL,
	});

if (process.env.NODE_ENV !== 'production') {
	globalForDb.pool = pool;
}

export const db = drizzle(pool, { schema });
