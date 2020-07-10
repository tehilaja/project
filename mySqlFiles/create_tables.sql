ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '12345678';
GRANT ALL ON *.* to 'root'@'%';

CREATE DATABASE IF NOT EXISTS magdilimdb;
USE magdilimdb;

SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

-- ~~~~~~~~~~~~ CREATE TABLE ~~~~~~~~~~~~~~~~ --

 -- ~~~~ DROP
-- DROP TABLE Bank_info;
-- DROP TABLE Addresses;
-- DROP TABLE Donors_in_org;
-- DROP TABLE Fields_of_activity;
-- DROP TABLE Gifts;
-- DROP TABLE Gifts_Levels;
-- DROP TABLE Levels;
-- DROP TABLE Org_field_of_activity;
-- DROP TABLE Organizations;
-- DROP TABLE Feed_comments;
-- DROP TABLE Payments;
-- DROP TABLE One_time_donations;


-- Addresses--
CREATE TABLE IF NOT EXISTS Addresses (
org_id int(11) PRIMARY KEY,
country varchar(50),
state varchar(50),
city varchar(50),
street varchar(50),
building int(11),
apartment int(11),
suite int(11),
zip int(11)
);


-- Organazation Bank info --
CREATE TABLE IF NOT EXISTS Bank_info (
org_id int PRIMARY KEY,
branch int(5),
account_num int(11),
bank_num int(3),
account_owner varchar(50)
);


-- טבלת משתמשים בקוגניטו --


-- DROP TABLE Organizations;
-- Organizations --
CREATE TABLE IF NOT EXISTS Organizations (
  org_id int(11) AUTO_INCREMENT PRIMARY KEY,
  org_name varchar(255),
  org_admin_id varchar(25), -- user_id which is email
  description varchar(3000),
  img_url varchar(250),
  min_donation int(11),
  one_time_donation tinyint(1),
  approved tinyint(1),
  pc_num int(11),
 
  -- optional fields --
 
  admin_name varchar(255),
  founding_year int(4),
  working int(11),
  num_volunteers int(11),
  num_friends int(11),
  website varchar(250),
 
  -- make another table to do a search box --
  field_of_activity varchar(200)
);

-- Levels --
CREATE TABLE IF NOT EXISTS Levels (
  -- double key:
  -- level_id int(11) AUTO_INCREMENT PRIMARY KEY,
  org_id int(11),
  level_num int(11),
  level_name varchar(50), -- name of level by default will be silver/gold etc - give option to change
  min_people int(11), -- will be -1 in case where the level isn't chosen by these criterias
  min_sum int(11),
PRIMARY KEY(org_id, level_num)
);


-- DROP TABLE Gifts;
-- Gifts --
CREATE TABLE IF NOT EXISTS Gifts (
  gift_id int(11) AUTO_INCREMENT PRIMARY KEY,
  gift_name varchar(250),
  gift_description varchar(1000),
  gift_pic varchar(250),
  org_id int(11),
  level_num int(11),
  g_date DATE,
  winner varchar(250),
  raffle boolean
);

-- create table if not exists Gifts_Levels(
-- 	level_num int(11),
--     gift_id int(11)
-- );

-- DROP TABLE Donors_in_org
-- Donors_in_org --
CREATE TABLE IF NOT EXISTS Donors_in_org (
  d_i_o_id int(11) AUTO_INCREMENT PRIMARY KEY,
  user_id varchar(25),
  org_id int(11),
  referred_by varchar(25),
  monthly_donation int(11),
  d_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- ??
  anonymous tinyint, -- default -> false
 
  -- האם לשנות ל enum() ? --
  status_id tinyint,
 
  d_title varchar(250),
  d_description text
);



CREATE TABLE IF NOT EXISTS Fields_of_activity (
	field_id int(11),
    field_name varchar(255)
);

CREATE TABLE IF NOT EXISTS Org_field_of_activity(
	org_id int(11),
    field_id int (11)
);

-- Adding this tables to keep track of admin pages --
-- One_time_donations --
CREATE TABLE IF NOT EXISTS One_time_donations (
  donation_id int(11) AUTO_INCREMENT PRIMARY KEY,
  user_id varchar(25),
  org_id int(11),
  referred_by varchar(25),
  sum_donation int(11),
  d_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- ??
  anonymous tinyint -- default -> false
);

CREATE TABLE IF NOT EXISTS Payments (
  payment_id int(11) AUTO_INCREMENT PRIMARY KEY,
  org_id int(11),
  amount_paid int(11),
  date_paid TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  still_owed int(11)
);

CREATE TABLE IF NOT EXISTS Feed_comments (
  comment_id int(11) AUTO_INCREMENT PRIMARY KEY,
  feed_type varchar(25),
  feed_type_id int(11),
  user_id varchar(25),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  comment_text varchar(3000),
  likes int(11)
);



