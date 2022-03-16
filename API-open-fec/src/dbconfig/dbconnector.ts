import { Pool } from 'pg';

export default new Pool({
    max: 20,
    connectionString: 'postgres://alexanderurbini:Cannes92$!@localhost:5432/candidates',
    idleTimeoutMillis: 30000
})