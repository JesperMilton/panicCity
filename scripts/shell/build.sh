#!/bin/bash

npx google-closure-compiler \
--language_in ECMASCRIPT5_STRICT \
--language_out ECMASCRIPT5_STRICT \
--warning_level DEFAULT \
--compilation_level WHITESPACE_ONLY \
--isolation_mode IIFE \
--js "./../../lib/rune.js" \
--js "./../../src/scope/Manifest.js" \
--js "./../../src/data/resource/Requests.js" \
--js "./../../src/scene/menu/Menu.js" \
--js "./../../src/entity/Entity.js" \
--js "./../../src/entity/Projectiles/Bullet.js" \
--js "./../../src/entity/Projectiles/Projectile.js" \
--js "./../../src/entity/Particles/Blood.js" \
--js "./../../src/entity/Base/Base.js" \
--js "./../../src/entity/NPCs/Human.js" \
--js "./../../src/entity/NPCs/Zombie.js" \
--js "./../../src/entity/NPCs/ZombieBasic.js" \
--js "./../../src/entity/NPCs/ZombieHunter.js" \
--js "./../../src/entity/NPCs/ZombieRanger.js" \
--js "./../../src/entity/NPCs/ZombieBoss.js" \
--js "./../../src/managers/ZombieSpawner.js" \
--js "./../../src/managers/RescueeSpawner.js" \
--js "./../../src/managers/WaveManager.js" \
--js "./../../src/managers/CollisionManager.js" \
--js "./../../src/entity/Characters/PlayerJesper.js" \
--js "./../../src/entity/Characters/PlayerHibba.js" \
--js "./../../src/managers/ItemSpawner.js" \
--js "./../../src/entity/Items/Items.js" \
--js "./../../src/entity/Items/Food.js" \
--js "./../../src/entity/Items/Plank.js" \
--js "./../../src/entity/Items/Medkit.js" \
--js "./../../src/entity/Items/Water.js" \
--js "./../../src/scene/game/Game.js" \
--js "./../../src/scene/game/Gameover.js" \
--js "./../../src/system/Main.js" \
--js "./../../src/scope/Alias.js" \
--js_output_file "./../../dist/panicCity.js";

echo "OK";