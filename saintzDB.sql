CREATE TABLE users (
id SERIAL PRIMARY KEY,
name text NOT NULL,
email text NOT NULL,
password text NOT NULL,
reset_token text,
reset_token_expires text,
is_admin boolean DEFAULT false,
created_at TIMESTAMP DEFAULT(now()),
updated_at TIMESTAMP DEFAULT(now())
);

-- SESSION

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" 
ADD CONSTRAINT "session_pkey" 
PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;