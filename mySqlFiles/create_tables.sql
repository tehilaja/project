-- ~~~~~~~~~~~~ CREATE TABLE ~~~~~~~~~~~~~~~~ --

 -- ~~~~ DROP
-- DROP TABLE admin;
-- DROP TABLE country;
-- DROP TABLE city;
-- DROP TABLE credit_info;
-- DROP TABLE donation_status;
-- DROP TABLE doners_in_org;
-- DROP TABLE leveld_in_org;
-- DROP TABLE gifts;
-- DROP TABLE leveled;
-- DROP TABLE organization;
-- DROP TABLE users;


-- city --
CREATE TABLE IF NOT EXISTS City (
  city_id int(11) AUTO_INCREMENT PRIMARY KEY,
  country_id int(11),
  city_name varchar(50)
);

-- Country --
CREATE TABLE IF NOT EXISTS Country  (
  country_id int(11) AUTO_INCREMENT PRIMARY KEY,
  country_name varchar(50)
);

-- ! user name = email???
-- Users --
CREATE TABLE IF NOT EXISTS Users (
  user_id int(11) AUTO_INCREMENT PRIMARY KEY,
  user_name varchar(50) NOT NULL,
  first_name varchar(50) ,
  last_name varchar(50) ,
  pswd varchar(8) NOT NULL ,
  email varchar(25),
  address_id int(11),
  num_phone int(9)
);

-- Admin --
CREATE TABLE IF NOT EXISTS Admin (
  admin_id int(11) PRIMARY KEY,
  org_id int(11),
  admin_pswd int (11)
);

-- DROP TABLE Organization;
-- Organization --
CREATE TABLE IF NOT EXISTS Organization (
  org_id int(11) AUTO_INCREMENT PRIMARY KEY,
  org_name varchar(255),
  admin_name varchar(255),
  description varchar(3000),
  field_of_acctivity varchar(2000),
  org_pic varchar(250),
  min_donation int(11),
  org_num int(11),
  branch int(5),
  account_num int(11),
  bank_num int(3),
  founding_year int(4),
  working int(11),
  volunteers int(11),
  friends int(11),
  -- city_id int(11),
  city_name varchar(50),
  country_name varchar(250),
  building varchar(4),
  street varchar(50),
  p_code int(11),
  one_time_donation tinyint(1)
);

-- Leveled ---
CREATE TABLE IF NOT EXISTS Leveled (
  level_id int(11) AUTO_INCREMENT PRIMARY KEY,
  org_id int(11),
  g_levele_id int(10), -- name of level
  -- l_name varchar(25),
  min_people int(11),
  min_sum int(11)
);

CREATE TABLE IF NOT EXISTS gifts_levels (
g_levele_id int(10),
level_name varchar (50)
);

-- DROP TABLE Gifts;
-- Gifts --
CREATE TABLE IF NOT EXISTS Gifts (
  gift_id int(11) AUTO_INCREMENT PRIMARY KEY,
  gift_name varchar(250),
  gift_description varchar(1000),
  gift_pic varchar(250),
  level_id int(11),
  g_date DATE,
  winer varchar(250)

);

-- DROP TABLE Doners_in_org
-- Doners_in_org --
CREATE TABLE IF NOT EXISTS Doners_in_org (
  d_i_o_id int(11) AUTO_INCREMENT PRIMARY KEY,
  user_id int(11),
  org_id int(11),
  monthly_donation int(11),
  referred_by int(11),
  d_title varchar(250),
  d_description TEXT,
  is_anonim tinyint(1),
  d_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- ??
  status_id int(4)
);



-- Donation_status --
CREATE TABLE IF NOT EXISTS Donation_status (
  status_id int(11) PRIMARY KEY,
  description varchar(50)
);

-- Leveld_in_org --
CREATE TABLE IF NOT EXISTS Leveld_in_org (
  leveld_id int(11) AUTO_INCREMENT PRIMARY KEY,
  fk_d_i_o_id int(11),
  num_people int(11)
);
-- הערה: טריגר רק אם לא קיים ייצור טבלה אחרת נחשוב איך לעדכן בתרומה שאדם תורם

 -- Credit_info --
CREATE TABLE IF NOT EXISTS Credit_info (
  credit_id int AUTO_INCREMENT PRIMARY KEY,
  user_id int(11),
  numbers int(6)
);


