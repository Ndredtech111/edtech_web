-- Run this once in phpMyAdmin (select your database first, then the SQL tab).
CREATE TABLE IF NOT EXISTS leads (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name          VARCHAR(60)  NOT NULL,
  phone         VARCHAR(10)  NOT NULL,
  email         VARCHAR(120) NOT NULL,
  qualification VARCHAR(80)  NOT NULL,
  course        VARCHAR(120) NOT NULL,
  mode          VARCHAR(40)  NOT NULL DEFAULT '',
  message       VARCHAR(1000) NOT NULL,
  source        VARCHAR(40)  NOT NULL DEFAULT '',
  page          VARCHAR(255) NOT NULL DEFAULT '',
  ip            VARCHAR(45)  NOT NULL DEFAULT '',
  user_agent    VARCHAR(255) NOT NULL DEFAULT '',
  INDEX idx_created (created_at),
  INDEX idx_ip_created (ip, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
