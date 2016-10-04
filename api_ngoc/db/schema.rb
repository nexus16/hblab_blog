# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160902145426) do

  create_table "comments", force: :cascade do |t|
    t.integer  "user_id",    limit: 4
    t.integer  "post_id",    limit: 4
    t.text     "content",    limit: 65535
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  add_index "comments", ["post_id"], name: "index_comments_on_post_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "notifications", force: :cascade do |t|
    t.string   "to_user",    limit: 255
    t.string   "from_user",  limit: 255
    t.integer  "post_id",    limit: 4
    t.text     "content",    limit: 65535
    t.boolean  "is_read",                  default: false
    t.boolean  "status",                   default: true
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
  end

  create_table "post_stocks", force: :cascade do |t|
    t.integer  "post_id",    limit: 4
    t.integer  "user_id",    limit: 4
    t.boolean  "status"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "post_tags", force: :cascade do |t|
    t.integer  "post_id",    limit: 4,             null: false
    t.integer  "tag_id",     limit: 4,             null: false
    t.integer  "position",   limit: 4, default: 1
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string   "title_id",      limit: 255,                  null: false
    t.string   "random_uuid",   limit: 255
    t.string   "title",         limit: 255,                  null: false
    t.text     "content",       limit: 65535,                null: false
    t.integer  "subject_id",    limit: 4
    t.string   "short_content", limit: 255
    t.boolean  "status",                      default: true
    t.integer  "position",      limit: 4,     default: 10
    t.integer  "created_by",    limit: 4,                    null: false
    t.integer  "updated_by",    limit: 4
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
  end

  create_table "project_members", force: :cascade do |t|
    t.integer  "user_id",    limit: 4,                 null: false
    t.integer  "project_id", limit: 4,                 null: false
    t.boolean  "status",               default: true
    t.boolean  "leader",               default: false
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string   "name",        limit: 255,                  null: false
    t.string   "title_id",    limit: 255,                  null: false
    t.text     "description", limit: 65535
    t.boolean  "status",                    default: true
    t.string   "logo",        limit: 255
    t.datetime "start_at"
    t.datetime "end_at"
    t.integer  "created_by",  limit: 4,                    null: false
    t.integer  "updated_by",  limit: 4
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
  end

  create_table "subjects", force: :cascade do |t|
    t.string   "title",      limit: 255, null: false
    t.string   "title_id",   limit: 255, null: false
    t.integer  "position",   limit: 4
    t.integer  "subject_id", limit: 4
    t.integer  "project_id", limit: 4
    t.integer  "created_by", limit: 4
    t.integer  "updated_by", limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string   "name",       limit: 255, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",             limit: 255
    t.string   "first_name",           limit: 255
    t.string   "last_name",            limit: 255
    t.string   "avatar",               limit: 255
    t.string   "auth_key",             limit: 32
    t.string   "salt",                 limit: 32
    t.string   "access_token",         limit: 100
    t.string   "password_hash",        limit: 255
    t.string   "password_reset_token", limit: 255
    t.string   "email",                limit: 255
    t.integer  "role",                 limit: 2
    t.integer  "status",               limit: 2
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

  add_foreign_key "comments", "posts"
  add_foreign_key "comments", "users"
end
