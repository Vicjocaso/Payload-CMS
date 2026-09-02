import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_templates_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_templates_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_page_templates_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_templates_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_page_templates_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_page_templates_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_templates_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_page_templates_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_page_templates_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum_page_templates_category" AS ENUM('landing', 'about', 'contact', 'custom');
  CREATE TYPE "public"."enum_page_templates_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TABLE "page_templates_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_page_templates_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_page_templates_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "page_templates_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_page_templates_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_page_templates_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "page_templates_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_page_templates_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_page_templates_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_page_templates_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "page_templates_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_page_templates_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_page_templates_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"thumbnail_id" integer,
  	"category" "enum_page_templates_category" DEFAULT 'custom',
  	"hero_type" "enum_page_templates_hero_type" DEFAULT 'lowImpact' NOT NULL,
  	"hero_rich_text" jsonb,
  	"hero_media_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "page_templates_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer
  );
  
  ALTER TABLE "pages" ADD COLUMN "source_template_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_source_template_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "page_templates_id" integer;
  ALTER TABLE "page_templates_hero_links" ADD CONSTRAINT "page_templates_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_cta_links" ADD CONSTRAINT "page_templates_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_cta" ADD CONSTRAINT "page_templates_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_content_columns" ADD CONSTRAINT "page_templates_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_content" ADD CONSTRAINT "page_templates_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_media_block" ADD CONSTRAINT "page_templates_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_media_block" ADD CONSTRAINT "page_templates_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_archive" ADD CONSTRAINT "page_templates_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_form_block" ADD CONSTRAINT "page_templates_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_form_block" ADD CONSTRAINT "page_templates_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates" ADD CONSTRAINT "page_templates_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates" ADD CONSTRAINT "page_templates_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_rels" ADD CONSTRAINT "page_templates_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_rels" ADD CONSTRAINT "page_templates_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_rels" ADD CONSTRAINT "page_templates_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_rels" ADD CONSTRAINT "page_templates_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_templates_hero_links_order_idx" ON "page_templates_hero_links" USING btree ("_order");
  CREATE INDEX "page_templates_hero_links_parent_id_idx" ON "page_templates_hero_links" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_cta_links_order_idx" ON "page_templates_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_cta_links_parent_id_idx" ON "page_templates_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_cta_order_idx" ON "page_templates_blocks_cta" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_cta_parent_id_idx" ON "page_templates_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_cta_path_idx" ON "page_templates_blocks_cta" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_content_columns_order_idx" ON "page_templates_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_content_columns_parent_id_idx" ON "page_templates_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_content_order_idx" ON "page_templates_blocks_content" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_content_parent_id_idx" ON "page_templates_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_content_path_idx" ON "page_templates_blocks_content" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_media_block_order_idx" ON "page_templates_blocks_media_block" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_media_block_parent_id_idx" ON "page_templates_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_media_block_path_idx" ON "page_templates_blocks_media_block" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_media_block_media_idx" ON "page_templates_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "page_templates_blocks_archive_order_idx" ON "page_templates_blocks_archive" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_archive_parent_id_idx" ON "page_templates_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_archive_path_idx" ON "page_templates_blocks_archive" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_form_block_order_idx" ON "page_templates_blocks_form_block" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_form_block_parent_id_idx" ON "page_templates_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_form_block_path_idx" ON "page_templates_blocks_form_block" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_form_block_form_idx" ON "page_templates_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "page_templates_thumbnail_idx" ON "page_templates" USING btree ("thumbnail_id");
  CREATE INDEX "page_templates_hero_hero_media_idx" ON "page_templates" USING btree ("hero_media_id");
  CREATE INDEX "page_templates_updated_at_idx" ON "page_templates" USING btree ("updated_at");
  CREATE INDEX "page_templates_created_at_idx" ON "page_templates" USING btree ("created_at");
  CREATE INDEX "page_templates_rels_order_idx" ON "page_templates_rels" USING btree ("order");
  CREATE INDEX "page_templates_rels_parent_idx" ON "page_templates_rels" USING btree ("parent_id");
  CREATE INDEX "page_templates_rels_path_idx" ON "page_templates_rels" USING btree ("path");
  CREATE INDEX "page_templates_rels_pages_id_idx" ON "page_templates_rels" USING btree ("pages_id");
  CREATE INDEX "page_templates_rels_posts_id_idx" ON "page_templates_rels" USING btree ("posts_id");
  CREATE INDEX "page_templates_rels_categories_id_idx" ON "page_templates_rels" USING btree ("categories_id");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_source_template_id_page_templates_id_fk" FOREIGN KEY ("source_template_id") REFERENCES "public"."page_templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_source_template_id_page_templates_id_fk" FOREIGN KEY ("version_source_template_id") REFERENCES "public"."page_templates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_page_templates_fk" FOREIGN KEY ("page_templates_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_source_template_idx" ON "pages" USING btree ("source_template_id");
  CREATE INDEX "_pages_v_version_version_source_template_idx" ON "_pages_v" USING btree ("version_source_template_id");
  CREATE INDEX "payload_locked_documents_rels_page_templates_id_idx" ON "payload_locked_documents_rels" USING btree ("page_templates_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_templates_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "page_templates_hero_links" CASCADE;
  DROP TABLE "page_templates_blocks_cta_links" CASCADE;
  DROP TABLE "page_templates_blocks_cta" CASCADE;
  DROP TABLE "page_templates_blocks_content_columns" CASCADE;
  DROP TABLE "page_templates_blocks_content" CASCADE;
  DROP TABLE "page_templates_blocks_media_block" CASCADE;
  DROP TABLE "page_templates_blocks_archive" CASCADE;
  DROP TABLE "page_templates_blocks_form_block" CASCADE;
  DROP TABLE "page_templates" CASCADE;
  DROP TABLE "page_templates_rels" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_source_template_id_page_templates_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_source_template_id_page_templates_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_page_templates_fk";
  
  DROP INDEX "pages_source_template_idx";
  DROP INDEX "_pages_v_version_version_source_template_idx";
  DROP INDEX "payload_locked_documents_rels_page_templates_id_idx";
  ALTER TABLE "pages" DROP COLUMN "source_template_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_source_template_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "page_templates_id";
  DROP TYPE "public"."enum_page_templates_hero_links_link_type";
  DROP TYPE "public"."enum_page_templates_hero_links_link_appearance";
  DROP TYPE "public"."enum_page_templates_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_page_templates_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_page_templates_blocks_content_columns_size";
  DROP TYPE "public"."enum_page_templates_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_page_templates_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_page_templates_blocks_archive_populate_by";
  DROP TYPE "public"."enum_page_templates_blocks_archive_relation_to";
  DROP TYPE "public"."enum_page_templates_category";
  DROP TYPE "public"."enum_page_templates_hero_type";`)
}
