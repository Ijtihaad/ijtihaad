DO $$ BEGIN
 CREATE TYPE "userRole" AS ENUM('ADMIN', 'BASIC');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "passwords" (
	"value" varchar(100) NOT NULL,
	"userId" varchar(32) NOT NULL,
	CONSTRAINT "passwords_userId_pk" PRIMARY KEY("userId"),
	CONSTRAINT "passwords_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"firstName" varchar(64) NOT NULL,
	"lastName" varchar(64) NOT NULL,
	"role" "userRole" DEFAULT 'BASIC' NOT NULL,
	"value" varchar(64) NOT NULL,
	"name" varchar(64),
	"picture" varchar(255),
	"blocked" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_value_unique" UNIQUE("value")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "passwords" ADD CONSTRAINT "passwords_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
