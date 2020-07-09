Use magdilimdb;

 -- organization
INSERT INTO Organizations(org_name, org_admin_id, description, img_url, min_donation, one_time_donation, approved, pc_num, admin_name, founding_year, working, num_volunteers, num_friends, field_of_activity,website) VALUES
("Hatzala Bet Shemesh","tehilaj97@gmail.com", "We provide quick, professional and compassionate first response to any emergency.",
"https://upload.wikimedia.org/wikipedia/commons/b/bc/UHNewLogo.svg",12, 30, true, 580465979, "caring people", 2006,388,231,5400, "Saving Lives","https://www.hatzbs.org/"),
("Ezer Metzion","tehilaj97@gmail.com", "Ezer Mizion's diverse line-up of services includes the world's largest Jewish Bone Marrow Donor Registry and specialized programs for children with special needs, cancer patients, the elderly, and terror victims. Ezer Mizion's International Bone Marrow Registry collaborates with transplant centers around the globe by facilitating transplants for patients whose only chance of survival is a bone marrow transplant.",
"https://www.ami.org.il/media/1047/logo.png",10, 1, true, 580079978, "Rabbi Chananya Cholak", 1985, 911,123456,8434, "Medical Help","https://ezermizion.org/"),
("Yad Sarah","tehilaj97@gmail.com","Service For Medical Equipment, In-Home Geriatric Dental Care.",
"https://yad-sarah.net/wp-content/uploads/2019/04/logoys.png",15, 20, true, 580030104,"Moshe Uri Cohen",1983, 55,900,123456,"Medical Help","https://yad-sarah.net/");
INSERT INTO Organizations(org_name, org_admin_id, description, img_url, min_donation, one_time_donation, approved, pc_num, admin_name, founding_year, working, num_volunteers, num_friends, field_of_activity, website) VALUES
("Hakshiva","avital05484@gmail.com", "Mentoring and coaching for Teens at Risk and their families.",
"https://magdilim-organization-images.s3.amazonaws.com/organizations/8_87860a40-be93-11ea-90ae-77889d74b9e4_Hakshiva.jpg",12, 30, true, 580465979, "Rabbi Yonason Martin", 2006,388,231,5400, "Teens", "https://hakshiva.org/");
-- Addresses
select * from Addresses;
INSERT INTO Addresses(org_id, country, state, city, street, building, apartment, suite, zip) VALUES
(1, "Israel", null, "Jerusalem","Yirmiyahu", 78, null, null, 9446758),
(2, "Israel", null, "Jerusalem","Ribinov", 5, null, null, 5156316),
(3, "Israel", null, "Jerusalem","Hertzel St", 124, null, null, 9618722);

-- donors in org
select * from Donors_in_org;
INSERT INTO Donors_in_org (user_id, org_id, monthly_donation, referred_by,d_title, d_description,anonymous,status_id) VALUES
("genstil@g.jct.ac.il",3,15,null, "Thank You!","For all you do for the sake of am yisrael!",TRUE,1),
("avital05484@gmail.com",1,100,null, "We appreciate all you do!","Biggest thanks, from the depths of our hearts!",TRUE,1),
("hadasefr@g.jct.ac.il",3,15,"tehilaj97@gmail.com", "in loving memory of Ruth","",TRUE,1),
("tehilaj97@gmail.com",3,45,null, "The Kindness you are constantly sharing, has made this a greater place!",TRUE,1),
("tehilaj97@gmail.com",2,45,null, "We could never have gotten through what we did without you...",TRUE,1),
("rachelletikva@gmail.com",3,25,"genstil@g.jct.ac.il", "In Honor Of: our DAD!","who taught us what it means to be a good human",TRUE,1),
("someid@id.com",3,22,"tehilaj97@gmail.com", "MOM!","You're the most inspiring volunteer ever!",TRUE,1),
("someotherid@id.com",3,80,"someid@id.com", "","",TRUE,1),
("tehilaj97@gmail.com",1,45,null, "In Loving Memory of Grandpa Nick","",TRUE,1),
("someotherid@id.com",1,80,"rachelletikva@gmail.com", "Thanks for all you do","no other words",TRUE,1),
("someid@gmail.com",2,50,null,"thanks for all your help ","...",TRUE,1);

-- Levels
select * from Levels;
INSERT INTO Levels (org_id, level_num, level_name, min_people, min_sum) VALUES
(1, 1, "Silver", 5, null),
(1, 2, "Gold", 5, 500),
(1, 3, "Platinum", 10, 2000),
(1, 4, "Diamond", null, 10000),
(2, 1, "Silver", 5, null),
(2, 2, "Gold", 5, 500),
(2, 3, "Platinum", 10, 2000),
(2, 4, "Diamond", null, 10000),

(4, 1, "Member", 1, null),
(4, 2, "Friend", 2, null),
(4, 3, "Partner", 10, null),
(4, 4, "Family", 15, null),
(3, 1, "Member", null, 200),
(3, 2, "Friend", null, 500),
(3, 3, "Partner", null, 2000),
(3, 4, "Family", null, 10000);

-- Gifts
select* from Gifts;
INSERT INTO Gifts (gift_name, gift_description, gift_pic, org_id, level_num, g_date, raffle) VALUES
("A New Car","Brand new 7 seater vehicle!","https://magdilim-organization-images.s3.amazonaws.com/prizes/1_c3584880-be52-11ea-b9f1-a1543b6468b8_giftOrg1Level4.jpg"
,1,4,"2020-08-23",true),
("Laptop","New Dell Laptop","https://magdilim-organization-images.s3.amazonaws.com/prizes/5_8866dbf0-c015-11ea-a92d-d58a6f3c9a4b_laptop_hichud.jpeg",
1,1,"2020-11-14",true),

("Camera","High quality camera from Canon","https://magdilim-organization-images.s3.amazonaws.com/prizes/2_7a43a270-be52-11ea-a06b-4107b5c84cbb_WIN A CANON CAMERA!.jpg"
,2,1,"2020-06-17",false),
("Interior Design","3000 SHEKEL package, with the top designers in Israel!","https://magdilim-organization-images.s3.amazonaws.com/prizes/5_99e5ec90-c015-11ea-a92d-d58a6f3c9a4b_homeDesign_hezer.jpeg",
2,3,"2020-09-04",true),
("Apartment","see our offer!","https://magdilim-organization-images.s3.amazonaws.com/prizes/5_5deb9d70-c015-11ea-a92d-d58a6f3c9a4b_aparteement_hezer.jpeg"
,2,4,"2020-09-01",true),

("Child's Bedroom","every parent and childs dream","https://magdilim-organization-images.s3.amazonaws.com/prizes/5_71aa16c0-c015-11ea-a92d-d58a6f3c9a4b_childrenRoom_yadShara.jpeg",
3,3,"2020-08-14",true),
("Dream vacation","choose one out of these three incredible destinations","https://magdilim-organization-images.s3.amazonaws.com/prizes/3_9c2f0e50-bfca-11ea-9b4f-b7223a148dce_vacation.jpg",
3,2,"2020-09-18",true),

("Kitchen","Top designers in the country!",
"https://magdilim-organization-images.s3.amazonaws.com/prizes/5_53771cb0-c016-11ea-b1b6-ff6ac677a095_kitchen_hakshiva.jpeg",
4,3,"2020-12-27",true);



update Gifts set winner = "tehilaj97@gmail.com"
where gift_id = 5;
update Gifts set winner = "rachelletikva@gmail.com"
where gift_id = 2;

-- UPDATE table_name SET field1 = new-value1, field2 = new-value2
-- [WHERE Clause]

-- inserting comments into the feed --
select* from Feed_comments;
INSERT INTO Feed_comments (feed_type, feed_type_id, user_id, date, comment_text, likes) VALUES
('org', 2, 'tehilaj97@gmail.com', "2020-03-23", 'I love this organization', 3),
('org', 2, 'rachelletikva@gmail.com', "2020-03-23", "I know, they're the best", 2),
('org', 2, 'tehilaj97@gmail.com', "2020-03-23", 'oh! you like them too???', 3),
('org', 2, 'rachelletikva@gmail.com', "2020-03-23", "they are life changing:) ", 2),
('org', 1, 'tehilaj97@gmail.com', "2020-03-23", 'I love this organization', 3),
('org', 1, 'rachelletikva@gmail.com', "2020-03-23", "I know, they're the best", 2),
('org', 3, 'tehilaj97@gmail.com', "2020-03-23", 'oh! you like them too???', 3),
('org', 3, 'rachelletikva@gmail.com', "2020-03-23", "they are life changing:) ", 2),
('org', 1, 'Avital05484@gmail.com', "2020-03-23", "common! get your friends!", 2);

-- bank info
INSERT INTO Bank_info (org_id, branch, account_num, bank_num, account_owner) VALUES
(1, 698, 383838, 12, 'Hatzala Bet Shemesh'),
(2, 444, 656555, 10, "rabbi Cholak"),
(3, 545, 324344, 12, "Yad Sarah");

-- one time donations
select * from One_time_donations;
INSERT INTO One_time_donations (user_id, org_id, referred_by, sum_donation, d_date, anonymous) VALUES
('tehilaj97@gmail.com', 1, null, 200, '2020-05-23', false),
('tehilaj97@gmail.com', 1, null, 500, '2020-04-23', false),
('tehilaj97@gmail.com', 1, null, 200, '2020-06-23', false),
('rachelletikva@gmail.com', 1, 'tehilaj97@gmail.com', 200, '2020-05-23', false),
('rachelletikva@gmail.com', 1, 'tehilaj97@gmail.com', 200, '2020-04-23', false),
('rachelletikva@gmail.com', 1, 'tehilaj97@gmail.com', 200, '2020-06-23', false),
(null, 1, null, 2000, '2020-05-20', true),
('tehilaj97@gmail.com', 2, null, 200, '2020-05-23', false),
('tehilaj97@gmail.com', 2, null, 500, '2020-04-23', false),
('tehilaj97@gmail.com', 2, null, 200, '2020-06-23', false),
(null, 2, null, 2200, '2020-05-23', true),
('rachelletikva@gmail.com', 2, null, 200, '2020-04-23', false),
('rachelletikva@gmail.com', 2, 'tehilaj97@gmail.com', 200, '2020-06-23', false),
(null, 2, null, 2000, '2020-05-20', true);

-- ~~~~~~~~~~~ Fields_of_activity ~~~~~~~~~~``
 -- select * from Fields_of_activity
 
INSERT INTO Fields_of_activity(field_id,field_name) VALUES
(1,"Saving Lives"),(2,"Medical Equipment"),(3,"Medical Help"),(4,"Tragedies"),(5,"Torah Learning"),(6,"Support"),(7,"Proffesions"),(8,"Our Elders"),(9,"Food for the Needy"),(10,"Teens");

-- select * from Org_field_of_activity
INSERT INTO Org_field_of_activity(field_id,org_id) values(1,1),(3,1),(4,1),(2,2),(3,2),(1,2),(2,3),(3,3),(5,4),(10,4);

