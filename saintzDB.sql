DROP DATABASE IF EXISTS saintzDB;
CREATE DATABASE saintzDB;

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int,
  "user_id" int,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "old_price" int,
  "price" int NOT NULL,
  "quantity" int DEFAULT 0,
  "status" int DEFAULT 1,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "product_id" int
);


ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");


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

ALTER TABLE products ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

/* Triggers And Procedures */

-- PROCEDURES AND TRIGGERS
CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- auto updated_at products
CREATE TRIGGER trigger_set_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


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


-- DELETE ON CASCADE FOR PRODUCTS AND USERS
ALTER TABLE "products"
DROP CONSTRAINT products_user_id_fkey,
ADD CONSTRAINT  products_user_id_fkey
FOREIGN KEY ("user_id")
REFERENCES "users" ("id")
ON DELETE CASCADE;

ALTER TABLE "product_files"
DROP CONSTRAINT product_files_product_id_fkey,
ADD CONSTRAINT  product_files_product_id_fkey
FOREIGN KEY ("product_id")
REFERENCES "products" ("id")
ON DELETE CASCADE;
