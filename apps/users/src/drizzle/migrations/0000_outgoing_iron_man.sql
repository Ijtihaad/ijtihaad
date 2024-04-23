DO $$ BEGIN
 CREATE TYPE "userRole" AS ENUM('ADMIN', 'BASIC');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "email" (
	"value" varchar(64) NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"userId" varchar(32) NOT NULL,
	CONSTRAINT "email_userId_pk" PRIMARY KEY("userId"),
	CONSTRAINT "email_value_unique" UNIQUE("value"),
	CONSTRAINT "email_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "password" (
	"value" varchar(100) NOT NULL,
	"userId" varchar(32) NOT NULL,
	CONSTRAINT "password_userId_pk" PRIMARY KEY("userId"),
	CONSTRAINT "password_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"firstName" varchar(64) NOT NULL,
	"lastName" varchar(64) NOT NULL,
	"role" "userRole" DEFAULT 'BASIC' NOT NULL,
	"name" varchar(64),
	"picture" varchar(255),
	"blocked" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "email" ADD CONSTRAINT "email_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "password" ADD CONSTRAINT "password_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
