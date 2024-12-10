import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
// Drizzleのスキーマ定義ファイル。以下は例で、実際にはご自身でschema.tsなどを編集してください。
// import { users } from '~/utils/schema'; 

const sqlite = new Database('app.db');
const db = drizzle(sqlite);

// テーブルがなければ作成
// Google OAuthで利用できるユーザー情報を格納するためのカラムを拡張
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  google_id TEXT UNIQUE NOT NULL,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  picture TEXT
)`);

export { db };
