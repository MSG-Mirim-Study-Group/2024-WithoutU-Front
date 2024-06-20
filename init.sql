-- 데이터베이스 생성 (이미 존재하면 이 단계는 건너뛰어도 됩니다)
CREATE DATABASE IF NOT EXISTS WithoutU CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE WithoutU;   

-- messages 테이블 생성
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_id VARCHAR(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    message TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- user 테이블 생성
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;