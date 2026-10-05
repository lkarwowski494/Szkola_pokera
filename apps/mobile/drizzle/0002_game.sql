CREATE TABLE `advancement_history` (
	`day` text NOT NULL,
	`area` text NOT NULL,
	`knowledge` real,
	`game` real,
	`combined` real,
	`game_decisions` integer DEFAULT 0 NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`day`, `area`)
);
--> statement-breakpoint
CREATE TABLE `game_cards` (
	`card_id` text PRIMARY KEY NOT NULL,
	`dedupe_key` text NOT NULL,
	`situation` text NOT NULL,
	`rule_id` text,
	`family` text,
	`finding_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`introduced_at` integer,
	`retired_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `game_cards_dedupe_key_unique` ON `game_cards` (`dedupe_key`);--> statement-breakpoint
CREATE INDEX `game_cards_introduced` ON `game_cards` (`introduced_at`);--> statement-breakpoint
CREATE TABLE `game_findings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` integer NOT NULL,
	`hand_id` integer NOT NULL,
	`action_index` integer NOT NULL,
	`street` text NOT NULL,
	`position` text NOT NULL,
	`verdict` text NOT NULL,
	`rule_id` text,
	`level` text,
	`module` text,
	`family` text,
	`dedupe_key` text NOT NULL,
	`detail` text,
	`config_key` text NOT NULL,
	`content_hash` text NOT NULL,
	`decided_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `game_findings_session` ON `game_findings` (`session_id`);--> statement-breakpoint
CREATE INDEX `game_findings_module` ON `game_findings` (`module`,`config_key`,`decided_at`);--> statement-breakpoint
CREATE TABLE `game_hands` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` integer NOT NULL,
	`hand_no` integer NOT NULL,
	`seed` integer NOT NULL,
	`config` text NOT NULL,
	`preset` text,
	`actions` text NOT NULL,
	`hero_seat` integer NOT NULL,
	`timeouts` text DEFAULT '[]' NOT NULL,
	`result_bb` real NOT NULL,
	`played_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `game_hands_session` ON `game_hands` (`session_id`);--> statement-breakpoint
CREATE TABLE `game_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`mode` text NOT NULL,
	`area_module` text,
	`hands_planned` integer NOT NULL,
	`hands_played` integer DEFAULT 0 NOT NULL,
	`table_preset` text NOT NULL,
	`seat_styles` text NOT NULL,
	`players` integer NOT NULL,
	`stack_bb` real NOT NULL,
	`time_limit_s` integer,
	`bot_version` integer NOT NULL,
	`content_hash` text NOT NULL,
	`seed` integer NOT NULL,
	`started_at` integer NOT NULL,
	`ended_at` integer,
	`result_bb` real
);
--> statement-breakpoint
CREATE INDEX `game_sessions_started` ON `game_sessions` (`started_at`);--> statement-breakpoint
ALTER TABLE `review_logs` ADD `source` text;