-- ~~~~~~~~~~~~ CREATE TABLE ~~~~~~~~~~~~~~~~ --

 -- ~~~~ DROP
DROP TABLE doners_in_org;
DROP TABLE bank_info;
DROP TABLE addresses;
DROP TABLE doners_in_org;
DROP TABLE field_of_acctivity;
DROP TABLE gifts;
DROP TABLE gifts_levels;
DROP TABLE levels_in_org;
DROP TABLE levels;
DROP TABLE org_field_of_acctivity;
DROP TABLE organizations;


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
 
  -- make another table to do a search box --
 
  field_of_acctivity varchar(200)
);

-- Levels --
CREATE TABLE IF NOT EXISTS Levels (
  -- double key:
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
  winer varchar(250),
  raffle boolean
);

-- DROP TABLE Doners_in_org
-- Doners_in_org --
CREATE TABLE IF NOT EXISTS Doners_in_org (
  d_i_o_id int(11) AUTO_INCREMENT PRIMARY KEY,
  user_id varchar(25),
  org_id int(11),
  referred_by varchar(25),
  monthly_donation int(11),
  d_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- ??
  anonymous tinyint, -- default -> false
 
  -- האם לשנות ל enum() ? --
  status_id int(4),
 
  d_title varchar(250),
  d_description text
);

-- האם לא כדאי לשמור שתי שדות נופים בטבלה של doners_in_org ? --

-- Levels_in_org --
CREATE TABLE IF NOT EXISTS Levels_in_org (
  level_id int(11),
  fk_d_i_o_id int(11), -- for each foreign key to doners in org save:
  num_people_downline int(11),
  sum_money_downline int(11),
  PRIMARY KEY(level_id, fk_d_i_o_id)
);
-- כל כמה זמן לעדכן ?

CREATE TABLE IF NOT EXISTS fields_of_activity (
	field_id int(11),
    field_name varchar(255)
);

CREATE TABLE IF NOT EXISTS org_field_of_activity(
	org_id int(11),
    field_id int (11)
);


