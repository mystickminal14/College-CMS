-- Guest WiFi vouchers, read by public/api/send-pass-sms.php.
-- The first seven columns match the voucher CSV from the WiFi controller, in
-- order. sms_status is ours: NULL until the
-- voucher has been texted, then 'sent'.
-- Rename the table freely; set VOUCHER_TABLE in sms-config.php to match.

CREATE TABLE IF NOT EXISTS wifi_vouchers (
    id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
    code         VARCHAR(32)  NOT NULL,          -- WiFi username
    pin          VARCHAR(32)  NOT NULL,          -- WiFi password
    status       VARCHAR(16)  NOT NULL DEFAULT 'active',
    batch        VARCHAR(191) DEFAULT NULL,
    location     VARCHAR(64)  DEFAULT NULL,
    created_at   DATETIME     DEFAULT NULL,
    redeemed_at  DATETIME     DEFAULT NULL,
    sms_status   VARCHAR(16)  DEFAULT NULL,      -- NULL = not sent, 'sent' = texted
    PRIMARY KEY (id),
    UNIQUE KEY uq_code (code),
    KEY idx_unsent (status, sms_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Importing a batch: do NOT use phpMyAdmin's CSV import (it auto-creates a
-- table with COL 1..COL 8 columns) or LOAD DATA LOCAL INFILE (disabled on the
-- server, error #3948). Turn the CSV into an INSERT IGNORE ... VALUES file and
-- run that from the SQL tab or Import > SQL instead.

-- What the SMS script runs:
--   first unsent voucher
SELECT id, code, pin FROM wifi_vouchers
 WHERE status = 'active' AND (sms_status IS NULL OR sms_status <> 'sent')
 ORDER BY id LIMIT 1;
--   after Sociair accepts the text
-- UPDATE wifi_vouchers SET sms_status = 'sent' WHERE id = ?;

-- Stock left
SELECT COUNT(*) AS unsent FROM wifi_vouchers
 WHERE status = 'active' AND (sms_status IS NULL OR sms_status <> 'sent');
