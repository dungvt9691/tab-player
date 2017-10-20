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

ActiveRecord::Schema.define(version: 20171019041615) do

  create_table "admin_permissions", force: :cascade do |t|
    t.integer  "admin_id",      limit: 4,                 null: false
    t.integer  "permission_id", limit: 4,                 null: false
    t.boolean  "can_read",                default: false
    t.boolean  "can_create",              default: false
    t.boolean  "can_update",              default: false
    t.boolean  "can_destroy",             default: false
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
  end

  create_table "admins", force: :cascade do |t|
    t.string   "email",                   limit: 255,                 null: false
    t.string   "username",                limit: 255,                 null: false
    t.string   "encrypted_password",      limit: 255,                 null: false
    t.string   "fullname",                limit: 255
    t.string   "phone",                   limit: 255
    t.string   "address",                 limit: 255
    t.string   "avatar",                  limit: 255
    t.boolean  "updated_password",                    default: false
    t.datetime "last_update_password_at"
    t.string   "reset_password_token",    limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",           limit: 4,   default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",      limit: 255
    t.string   "last_sign_in_ip",         limit: 255
    t.datetime "created_at",                                          null: false
    t.datetime "updated_at",                                          null: false
  end

  add_index "admins", ["email"], name: "index_admins_on_email", unique: true, using: :btree
  add_index "admins", ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true, using: :btree

  create_table "artists", force: :cascade do |t|
    t.string   "name",                limit: 255
    t.string   "name_alias",          limit: 255
    t.string   "birthname",           limit: 255
    t.datetime "avatar_updated_at"
    t.integer  "avatar_file_size",    limit: 4
    t.string   "avatar_content_type", limit: 255
    t.string   "avatar_file_name",    limit: 255
    t.datetime "cover_updated_at"
    t.integer  "cover_file_size",     limit: 4
    t.string   "cover_content_type",  limit: 255
    t.string   "cover_file_name",     limit: 255
    t.integer  "zing_mp3_id",         limit: 4
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  create_table "average_caches", force: :cascade do |t|
    t.integer  "rater_id",      limit: 4
    t.integer  "rateable_id",   limit: 4
    t.string   "rateable_type", limit: 255
    t.float    "avg",           limit: 24,  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "categories", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "category_translations", force: :cascade do |t|
    t.integer  "category_id", limit: 4,   null: false
    t.string   "locale",      limit: 255, null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "name",        limit: 255
  end

  add_index "category_translations", ["category_id"], name: "index_category_translations_on_category_id", using: :btree
  add_index "category_translations", ["locale"], name: "index_category_translations_on_locale", using: :btree

  create_table "images", force: :cascade do |t|
    t.integer  "admin_id",                limit: 4,   null: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "attachment_file_name",    limit: 255
    t.string   "attachment_content_type", limit: 255
    t.integer  "attachment_file_size",    limit: 4
    t.datetime "attachment_updated_at"
  end

  create_table "impressions", force: :cascade do |t|
    t.string   "impressionable_type", limit: 255
    t.integer  "impressionable_id",   limit: 4
    t.integer  "user_id",             limit: 4
    t.string   "controller_name",     limit: 255
    t.string   "action_name",         limit: 255
    t.string   "view_name",           limit: 255
    t.string   "request_hash",        limit: 255
    t.string   "ip_address",          limit: 255
    t.string   "session_hash",        limit: 255
    t.text     "message",             limit: 65535
    t.text     "referrer",            limit: 65535
    t.text     "params",              limit: 65535
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "impressions", ["controller_name", "action_name", "ip_address"], name: "controlleraction_ip_index", using: :btree
  add_index "impressions", ["controller_name", "action_name", "request_hash"], name: "controlleraction_request_index", using: :btree
  add_index "impressions", ["controller_name", "action_name", "session_hash"], name: "controlleraction_session_index", using: :btree
  add_index "impressions", ["impressionable_type", "impressionable_id", "ip_address"], name: "poly_ip_index", using: :btree
  add_index "impressions", ["impressionable_type", "impressionable_id", "request_hash"], name: "poly_request_index", using: :btree
  add_index "impressions", ["impressionable_type", "impressionable_id", "session_hash"], name: "poly_session_index", using: :btree
  add_index "impressions", ["user_id"], name: "index_impressions_on_user_id", using: :btree

  create_table "overall_averages", force: :cascade do |t|
    t.integer  "rateable_id",   limit: 4
    t.string   "rateable_type", limit: 255
    t.float    "overall_avg",   limit: 24,  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "page_translations", force: :cascade do |t|
    t.integer  "page_id",    limit: 4,     null: false
    t.string   "locale",     limit: 255,   null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "title",      limit: 255
    t.text     "content",    limit: 65535
  end

  add_index "page_translations", ["locale"], name: "index_page_translations_on_locale", using: :btree
  add_index "page_translations", ["page_id"], name: "index_page_translations_on_page_id", using: :btree

  create_table "pages", force: :cascade do |t|
    t.string   "slug",         limit: 255
    t.boolean  "edit_content",             default: false
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
  end

  create_table "permissions", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "rates", force: :cascade do |t|
    t.integer  "rater_id",      limit: 4
    t.integer  "rateable_id",   limit: 4
    t.string   "rateable_type", limit: 255
    t.float    "stars",         limit: 24,  null: false
    t.string   "dimension",     limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "rates", ["rateable_id", "rateable_type"], name: "index_rates_on_rateable_id_and_rateable_type", using: :btree
  add_index "rates", ["rater_id"], name: "index_rates_on_rater_id", using: :btree

  create_table "rating_caches", force: :cascade do |t|
    t.integer  "cacheable_id",   limit: 4
    t.string   "cacheable_type", limit: 255
    t.float    "avg",            limit: 24,  null: false
    t.integer  "qty",            limit: 4,   null: false
    t.string   "dimension",      limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "rating_caches", ["cacheable_id", "cacheable_type"], name: "index_rating_caches_on_cacheable_id_and_cacheable_type", using: :btree

  create_table "seo_translations", force: :cascade do |t|
    t.integer  "seo_id",      limit: 4,     null: false
    t.string   "locale",      limit: 255,   null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "title",       limit: 255
    t.text     "keywords",    limit: 65535
    t.text     "description", limit: 65535
  end

  add_index "seo_translations", ["locale"], name: "index_seo_translations_on_locale", using: :btree
  add_index "seo_translations", ["seo_id"], name: "index_seo_translations_on_seo_id", using: :btree

  create_table "seos", force: :cascade do |t|
    t.integer  "object_id",      limit: 4,   null: false
    t.string   "object_type",    limit: 255, null: false
    t.string   "featured_image", limit: 255
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "settings", force: :cascade do |t|
    t.string   "app_name",                  limit: 255
    t.string   "app_url",                   limit: 255
    t.string   "app_email",                 limit: 255
    t.string   "app_phone",                 limit: 255
    t.string   "app_hotline",               limit: 255
    t.string   "app_fax",                   limit: 255
    t.string   "app_address",               limit: 255
    t.string   "facebook_fanpage",          limit: 255
    t.string   "facebook_app_id",           limit: 255
    t.string   "facebook_app_secret",       limit: 255
    t.string   "google_api_key",            limit: 255
    t.string   "google_app_id",             limit: 255
    t.string   "google_app_secret",         limit: 255
    t.string   "google_analytics_id",       limit: 255
    t.string   "youtube_endpoint",          limit: 255
    t.string   "youtube_thumbnail",         limit: 255
    t.string   "youtube_api_key",           limit: 255
    t.string   "adfly_uid",                 limit: 255
    t.string   "adfly_key",                 limit: 255
    t.string   "adfly_secret_key",          limit: 255
    t.string   "adfly_group_id",            limit: 255
    t.string   "adfly_endpoint",            limit: 255
    t.string   "smtp_sender",               limit: 255
    t.string   "smtp_address",              limit: 255
    t.integer  "smtp_port",                 limit: 4
    t.string   "smtp_username",             limit: 255
    t.string   "smtp_password",             limit: 255
    t.string   "smtp_authentication",       limit: 255
    t.boolean  "smtp_enable_starttls_auto"
    t.string   "recaptcha_publickey",       limit: 255
    t.string   "recaptcha_privatekey",      limit: 255
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
  end

  create_table "tab_artists", force: :cascade do |t|
    t.integer  "tab_id",     limit: 4
    t.integer  "artist_id",  limit: 4
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "tab_categories", force: :cascade do |t|
    t.integer  "tab_id",      limit: 4
    t.integer  "category_id", limit: 4
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  create_table "tab_favorites", force: :cascade do |t|
    t.integer  "tab_id",     limit: 4
    t.integer  "user_id",    limit: 4
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "tabs", force: :cascade do |t|
    t.string   "sid",                limit: 255
    t.string   "title",              limit: 255
    t.datetime "sheet_updated_at"
    t.integer  "sheet_file_size",    limit: 4
    t.string   "sheet_content_type", limit: 255
    t.string   "sheet_file_name",    limit: 255
    t.string   "download_hash",      limit: 255
    t.string   "download_link",      limit: 255
    t.string   "adfly_url_id",       limit: 255
    t.integer  "user_id",            limit: 4
    t.integer  "songsterr_id",       limit: 4
    t.integer  "status",             limit: 4,   default: 1
    t.integer  "cached_views",       limit: 4,   default: 0
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
  end

  create_table "tutorials", force: :cascade do |t|
    t.string   "link",                    limit: 255
    t.integer  "tab_id",                  limit: 4
    t.string   "video_id",                limit: 255
    t.integer  "status",                  limit: 4,   default: 1
    t.datetime "created_at",                                        null: false
    t.datetime "updated_at",                                        null: false
    t.integer  "cached_votes_total",      limit: 4,   default: 0
    t.integer  "cached_votes_score",      limit: 4,   default: 0
    t.integer  "cached_votes_up",         limit: 4,   default: 0
    t.integer  "cached_votes_down",       limit: 4,   default: 0
    t.integer  "cached_weighted_score",   limit: 4,   default: 0
    t.integer  "cached_weighted_total",   limit: 4,   default: 0
    t.float    "cached_weighted_average", limit: 24,  default: 0.0
  end

  add_index "tutorials", ["cached_votes_down"], name: "index_tutorials_on_cached_votes_down", using: :btree
  add_index "tutorials", ["cached_votes_score"], name: "index_tutorials_on_cached_votes_score", using: :btree
  add_index "tutorials", ["cached_votes_total"], name: "index_tutorials_on_cached_votes_total", using: :btree
  add_index "tutorials", ["cached_votes_up"], name: "index_tutorials_on_cached_votes_up", using: :btree
  add_index "tutorials", ["cached_weighted_average"], name: "index_tutorials_on_cached_weighted_average", using: :btree
  add_index "tutorials", ["cached_weighted_score"], name: "index_tutorials_on_cached_weighted_score", using: :btree
  add_index "tutorials", ["cached_weighted_total"], name: "index_tutorials_on_cached_weighted_total", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",               limit: 255, default: "", null: false
    t.string   "encrypted_password",  limit: 255, default: "", null: false
    t.string   "fullname",            limit: 255
    t.datetime "avatar_updated_at"
    t.integer  "avatar_file_size",    limit: 4
    t.string   "avatar_content_type", limit: 255
    t.string   "avatar_file_name",    limit: 255
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",       limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",  limit: 255
    t.string   "last_sign_in_ip",     limit: 255
    t.datetime "locked_at"
    t.datetime "created_at",                                   null: false
    t.datetime "updated_at",                                   null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

  create_table "votes", force: :cascade do |t|
    t.integer  "votable_id",   limit: 4
    t.string   "votable_type", limit: 255
    t.integer  "voter_id",     limit: 4
    t.string   "voter_type",   limit: 255
    t.boolean  "vote_flag"
    t.string   "vote_scope",   limit: 255
    t.integer  "vote_weight",  limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "votes", ["votable_id", "votable_type", "vote_scope"], name: "index_votes_on_votable_id_and_votable_type_and_vote_scope", using: :btree
  add_index "votes", ["voter_id", "voter_type", "vote_scope"], name: "index_votes_on_voter_id_and_voter_type_and_vote_scope", using: :btree

end
