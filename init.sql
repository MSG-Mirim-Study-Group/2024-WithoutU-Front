-- 데이터베이스 생성 (이미 존재하면 이 단계는 건너뛰어도 됩니다)
CREATE DATABASE IF NOT EXISTS WithoutU;
USE WithoutU;

-- messages 테이블 생성
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_id VARCHAR(15) NOT NULL,
    name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL
);