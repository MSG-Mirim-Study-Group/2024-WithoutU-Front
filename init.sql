-- init.sql
-- 메시지 테이블 생성 SQL 스크립트

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- 메시지 ID, 자동 증가
    name VARCHAR(255) NOT NULL,  -- 메시지를 남긴 사람의 이름
    message TEXT NOT NULL,  -- 메시지 내용
    page_id VARCHAR(255) NOT NULL,  -- 페이지 ID
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 메시지가 저장된 시간, 기본값은 현재 시간
);
