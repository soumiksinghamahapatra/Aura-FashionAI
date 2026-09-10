const db = require('./index');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

function seedDatabase() {
  console.log('[Seed] Starting database seed...');

  // 1. Seed Plan Limits
  const insertLimit = db.prepare(`
    INSERT OR REPLACE INTO plan_limits (
      tier, wardrobe_items, inspiration_saves, analyses_per_month,
      collages_per_month, consultations_per_month, consultation_messages_per_month,
      ai_edits_per_month, background_removals_per_month, color_analyses_per_month
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertLimit.run('free', 20, 10, 5, 3, 2, 20, 2, 5, 1);
  insertLimit.run('studio', 200, -1, 30, 10, 5, 150, 15, 100, 2);
  insertLimit.run('pro', 500, -1, 100, 30, 20, 1000, 50, 300, 8);

  // 2. Create Default Demo / Pro User
  const demoEmail = 'demo@aura.com';
  const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(demoEmail);

  let userId;
  const now = new Date().toISOString();

  if (!existingUser) {
    userId = crypto.randomUUID();
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync('Password123!', salt);

    db.prepare(`
      INSERT INTO users (id, email, password_hash, raw_user_meta_data, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      userId,
      demoEmail,
      passwordHash,
      JSON.stringify({ name: 'Demo Fashionista' }),
      now,
      now
    );

    // Profile
    db.prepare(`
      INSERT INTO profiles (id, user_id, email, color_labels_enabled, style_preferences, created_at, updated_at)
      VALUES (?, ?, ?, 1, '["Minimalist","Chic","Warm Neutral"]', ?, ?)
    `).run(crypto.randomUUID(), userId, demoEmail, now, now);

    // User role
    db.prepare(`
      INSERT INTO user_roles (id, user_id, role, created_at)
      VALUES (?, ?, 'admin', ?)
    `).run(crypto.randomUUID(), userId, now);

    // Pro subscription for demo
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 5);
    db.prepare(`
      INSERT INTO subscribers (id, user_id, tier, subscribed, manual_override, trial_ends_at, current_period_end, created_at)
      VALUES (?, ?, 'pro', 1, 1, ?, ?, ?)
    `).run(crypto.randomUUID(), userId, futureDate.toISOString(), futureDate.toISOString(), now);

    // Sample Color Analysis
    const analysisId = crypto.randomUUID();
    const bestColors = [
      { name: "Terracotta", hex: "#C85A32" },
      { name: "Olive Green", hex: "#556B2F" },
      { name: "Warm Mustard", hex: "#E1AD01" },
      { name: "Camel", hex: "#C19A6B" },
      { name: "Deep Teal", hex: "#00565B" }
    ];
    const neutralColors = [
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Espresso Brown", hex: "#3B2F2F" },
      { name: "Warm Grey", hex: "#8B8682" }
    ];

    db.prepare(`
      INSERT INTO color_analyses (
        id, user_id, season, sub_season, undertone, contrast,
        best_colors, neutral_colors, palette, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      analysisId,
      userId,
      'Autumn',
      'True Autumn',
      'warm',
      'medium',
      JSON.stringify(bestColors),
      JSON.stringify(neutralColors),
      JSON.stringify([...bestColors, ...neutralColors]),
      now
    );

    // Link active color analysis to profile
    db.prepare('UPDATE profiles SET active_color_analysis_id = ? WHERE user_id = ?').run(analysisId, userId);

    // Sample Wardrobe Items
    const sampleItems = [
      { name: "Tailored Camel Blazer", category: "outerwear", color: "Camel", style: "Classic / Tailored", img: "/assets/city-look-CO6tnpbW.webp" },
      { name: "Silk Ivory Blouse", category: "tops", color: "Ivory", style: "Elegant", img: "/assets/brunch-top-DyVfbOn4.webp" },
      { name: "Wide-Leg Terracotta Trousers", category: "bottoms", color: "Terracotta", style: "Chic", img: "/assets/brunch-bottom-CZ0x9j6O.webp" },
      { name: "Leather Loafers", category: "shoes", color: "Espresso", style: "Casual Smart", img: "/assets/brunch-shoes-Cu3OZLQ_.webp" },
      { name: "Vintage Trench Coat", category: "outerwear", color: "Beige", style: "Minimalist", img: "/assets/travel-look-BIiKStke.webp" }
    ];

    const insertWardrobe = db.prepare(`
      INSERT INTO wardrobe_items (id, user_id, name, category, color, style, image_url, ownership_type, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'owned', ?)
    `);

    for (const item of sampleItems) {
      insertWardrobe.run(crypto.randomUUID(), userId, item.name, item.category, item.color, item.style, item.img, now);
    }

    console.log(`[Seed] Demo account created: ${demoEmail} (Password: Password123!)`);
  } else {
    console.log('[Seed] Default demo user already exists.');
  }

  console.log('[Seed] Database seed completed successfully.');
}

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
