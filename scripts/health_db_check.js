import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

async function main() {
	try {
		const result = await pool.query('SELECT NOW()');
		console.log('✅ Connected!', result.rows);
	} catch (e) {
		console.error('❌ Failed to connect:', e);
	}
}

main();
