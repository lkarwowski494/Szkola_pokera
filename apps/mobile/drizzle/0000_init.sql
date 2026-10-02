CREATE TABLE `answers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`drill_id` text NOT NULL,
	`family` text NOT NULL,
	`lesson_id` text,
	`mode` text NOT NULL,
	`correct` integer NOT NULL,
	`elapsed_ms` integer NOT NULL,
	`answered_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `answers_family` ON `answers` (`family`);--> statement-breakpoint
CREATE INDEX `answers_answered_at` ON `answers` (`answered_at`);--> statement-breakpoint
CREATE TABLE `lesson_progress` (
	`lesson_id` text PRIMARY KEY NOT NULL,
	`best_correct` integer DEFAULT 0 NOT NULL,
	`total` integer DEFAULT 0 NOT NULL,
	`theory_seen` integer DEFAULT false NOT NULL,
	`completed_at` integer,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `review_cards` (
	`family_id` text PRIMARY KEY NOT NULL,
	`due` integer NOT NULL,
	`stability` real NOT NULL,
	`difficulty` real NOT NULL,
	`scheduled_days` real NOT NULL,
	`learning_steps` integer NOT NULL,
	`reps` integer NOT NULL,
	`lapses` integer NOT NULL,
	`state` integer NOT NULL,
	`last_review` integer
);
--> statement-breakpoint
CREATE TABLE `review_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`family_id` text NOT NULL,
	`rating` integer NOT NULL,
	`reviewed_at` integer NOT NULL,
	`elapsed_ms` integer NOT NULL,
	`correct` integer NOT NULL,
	`state_before` integer NOT NULL,
	`due_before` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
