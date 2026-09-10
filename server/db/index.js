const { DatabaseSync } = require('node:sqlite');
const config = require('../config');
const fs = require('fs');
const path = require('path');

// Ensure parent dir exists
const dbDir = path.dirname(config.DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new DatabaseSync(config.DB_PATH);

// Enable WAL mode for better concurrency and performance
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

function initTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE,
      password_hash TEXT,
      raw_user_meta_data TEXT DEFAULT '{}',
      raw_app_meta_data TEXT DEFAULT '{"provider":"email","providers":["email"]}',
      is_anonymous INTEGER DEFAULT 0,
      created_at TEXT,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE,
      email TEXT,
      avatar_url TEXT,
      active_color_analysis_id TEXT,
      color_labels_enabled INTEGER DEFAULT 1,
      style_preferences TEXT DEFAULT '[]',
      last_active_at TEXT,
      created_at TEXT,
      updated_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS user_roles (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      role TEXT DEFAULT 'user',
      created_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS user_selfies (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      image_url TEXT NOT NULL,
      label TEXT,
      created_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS color_analyses (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      season TEXT,
      sub_season TEXT,
      undertone TEXT,
      contrast TEXT,
      best_colors TEXT DEFAULT '[]',
      neutral_colors TEXT DEFAULT '[]',
      avoid_colors TEXT DEFAULT '[]',
      palette TEXT DEFAULT '[]',
      wardrobe_matches TEXT DEFAULT '[]',
      season_tryon_url TEXT,
      photo_urls TEXT DEFAULT '[]',
      created_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS wardrobe_items (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      name TEXT NOT NULL,
      category TEXT DEFAULT 'other',
      color TEXT,
      style TEXT,
      image_url TEXT NOT NULL,
      source_url TEXT,
      ownership_type TEXT DEFAULT 'owned',
      description TEXT,
      wear_frequency INTEGER DEFAULT 0,
      created_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS collages (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      title TEXT,
      result_image_url TEXT,
      status TEXT DEFAULT 'completed',
      style_preset TEXT DEFAULT 'editorial',
      aspect_ratio TEXT DEFAULT '3:4',
      use_selfie INTEGER DEFAULT 0,
      selfie_url TEXT,
      created_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS collage_items (
      id TEXT PRIMARY KEY,
      collage_id TEXT,
      user_id TEXT,
      image_url TEXT NOT NULL,
      label TEXT,
      item_type TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT,
      FOREIGN KEY (collage_id) REFERENCES collages(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS outfit_analyses (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      source_image_url TEXT,
      image_url TEXT,
      detected_items TEXT DEFAULT '[]',
      matched_items TEXT DEFAULT '[]',
      missing_items TEXT DEFAULT '[]',
      created_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS inspiration_images (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      image_url TEXT NOT NULL,
      title TEXT,
      board_name TEXT,
      created_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS style_profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      conversation TEXT DEFAULT '[]',
      style_brief TEXT,
      style_keywords TEXT DEFAULT '[]',
      status TEXT DEFAULT 'in_progress',
      created_at TEXT,
      updated_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS subscribers (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE,
      tier TEXT DEFAULT 'free',
      subscribed INTEGER DEFAULT 0,
      manual_override INTEGER DEFAULT 0,
      trial_ends_at TEXT,
      current_period_end TEXT,
      cancel_at_period_end INTEGER DEFAULT 0,
      created_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS plan_limits (
      tier TEXT PRIMARY KEY,
      wardrobe_items INTEGER,
      inspiration_saves INTEGER,
      analyses_per_month INTEGER,
      collages_per_month INTEGER,
      consultations_per_month INTEGER,
      consultation_messages_per_month INTEGER,
      ai_edits_per_month INTEGER,
      background_removals_per_month INTEGER,
      color_analyses_per_month INTEGER
    );

    CREATE TABLE IF NOT EXISTS user_attribution (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      last_source TEXT,
      last_medium TEXT,
      last_campaign TEXT,
      last_referrer TEXT,
      last_landing_path TEXT,
      last_seen_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS ai_usage_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      function_name TEXT,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS color_analysis_usage (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS bonus_credits (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      feature TEXT,
      amount INTEGER DEFAULT 0,
      expires_at TEXT,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS analytics_events (
      id TEXT PRIMARY KEY,
      session_id TEXT,
      action TEXT,
      payload TEXT,
      created_at TEXT
    );
  `);
}

// Run table creation on load
initTables();

module.exports = db;
