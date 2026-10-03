CREATE TABLE `exam_results` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`module_id` text NOT NULL,
	`correct` integer NOT NULL,
	`total` integer NOT NULL,
	`passed` integer NOT NULL,
	`taken_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `exam_results_module` ON `exam_results` (`module_id`);--> statement-breakpoint
ALTER TABLE `answers` ADD `grade` text;