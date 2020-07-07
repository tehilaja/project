Use magdilimdb;

 -- organization
INSERT INTO Organizations(org_name, org_admin_id, description, img_url, min_donation, one_time_donation, approved, pc_num, admin_name, founding_year, working, num_volunteers, num_friends, field_of_activity,website) VALUES
("איחוד הצלה ישראל","tehilaj97@gmail.com", "ן (אירועים רבי נפגעים), חולים ונפגעים. רכישת ציוד רפואי בסיסי ומתקדם לצורך פעילות המתנדבים. רכישת רכבי חירום והצלה, כגון אמבולנסים ואופנועים, ומימון הוצאות אחזקת רכבי החירום. הכשרת אזרחים לפעילות בקהילה לסיוע ומניעה של תאונות דרכים, פגיעות ומחלות",
"https://upload.wikimedia.org/wikipedia/commons/b/bc/UHNewLogo.svg",12, 30, true, 580465979, "אליהו פולק", 2006,388,231,5400, "הצלת נפשות","https://1221.org.il/"),
("עזר מציון","tehilaj97@gmail.com", "וסעודית. סיוע, שיקום ושירותים לנכי בריאות הנפש. סיוע לניצולי שואה. סיוע לחולי סרטן. הפעלת מגוון שרותים לאוכלוסיית הגמלאים והקשישים ודאגה לזכויותיהם. סיוע, ייעוץ, טיפול ושיקום לבעלי צרכים מיוחדים בכל סוגי הנכויות לרבות נכויות חושיות כגון לקויות שמיעה, לקויות דיבור ולקויות ראיה. הפעלת מסגרות חינוכיות וטיפוליות. הפעלת שירותי רווחה. סיוע לנפגעי טרור להקים קרן גמילות חסדים. לעזור לחולים נזקקים בריפוי ועזרה רפואית",
"https://www.ami.org.il/media/1047/logo.png",10, 1, true, 580079978, "הרב חנניה צ'ולק", 1985, 911,123456,8434, "עזרה רפואית","https://www.ami.org.il/"),
("יד שרה","tehilaj97@gmail.com","להשאיל ציוד ומכשור רפואי ללא תמורה לתקנו ולתחזקו. לעודד, להפעיל, להדריך ולהכשיר מתנדבים וארגוני מתנדבים למתן מענה לצרכים קהילתיים. להעניק שירותי בית וקהילה מגוונים לחולים ונזקקים.להלוות כסף ללא ריבית לנצרכים, לעמותות המסייעות לנצרכים ולכל גוף ציבורי המסייע לנצרכים בכל אופן שהוא. להעניק לנצרכים מעוטי יכולת כסף ו/או מכשירים לריפוי וסיוע. לאחוז ולנקוט בכל האמצעים הנדרשים או שידרשו לצורך מימוש המטרות הנ ל וכן כל פעולה אחרת שתראה לועד העמותה ואשר מגמתה הינה עזרה לזולת",
"https://yad-sarah.net/wp-content/uploads/2019/04/logoys.png",15, 20, true, 580030104,"משה אורי כהן",1983, 55,900,123456,"ציוד רפואי","https://yad-sarah.net/");
INSERT INTO Organizations(org_name, org_admin_id, description, img_url, min_donation, one_time_donation, approved, pc_num, admin_name, founding_year, working, num_volunteers, num_friends, field_of_activity, website) VALUES
("Hakshiva","tehilaj97@gmail.com", "Mentoring and coaching for Teens at Risk and their families.",
"https://upload.wikimedia.org/wikipedia/commons/b/bc/UHNewLogo.svg",12, 30, true, 580465979, "אליהו פולק", 2006,388,231,5400, "נוער", "https://hakshiva.org/");
-- addresses
select * from Addresses;
INSERT INTO Addresses(org_id, country, state, city, street, building, apartment, suite, zip) VALUES
(1, "Israel", null, "Jerusalem","ירמיהו", 78, null, null, 9446758),
(2, "Israel", null, "Jerusalem","הרב רבינוב", 5, null, null, 5156316),
(3, "Israel", null, "Jerusalem","שדרות הרצל", 124, null, null, 9618722);

-- donors in org
select * from Donors_in_org;
INSERT INTO Donors_in_org (user_id, org_id, monthly_donation, referred_by,d_title, d_description,anonymous,status_id) VALUES
("genstil@g.jct.ac.il",3,15,null, "תודות לארגון","נתרם עקב העזרה הרבה אשר הארגון מסייע לכלל ישראל ישר כוח!",TRUE,1),
("tehilaj97@gmail.com",3,45,null, "תודות לארגון","נתרם עקב העזרה הרבה אשר הארגון מסייע לכלל ישראל ישר כוח!",TRUE,1),
("rachelletikva@gmail.com",3,25,"genstil@g.jct.ac.il", "תודות לארגון","נתרם עקב העזרה הרבה אשר הארגון מסייע לכלל ישראל ישר כוח!",TRUE,1),
("someid@id.com",3,22,"tehilaj97@gmail.com", "תודות לארגון","נתרם עקב העזרה הרבה אשר הארגון מסייע לכלל ישראל ישר כוח!",TRUE,1),
("hadasefr@g.jct.ac.il",3,15,"tehilaj97@gmail.com", "תודות לארגון","נתרם עקב העזרה הרבה אשר הארגון מסייע לכלל ישראל ישר כוח!",TRUE,1),
("someotherid@id.com",3,80,"someid@id.com", "תודות לארגון","נתרם עקב העזרה הרבה אשר הארגון מסייע לכלל ישראל ישר כוח!",TRUE,1),
("tehilaj97@gmail.com",1,45,null, "תודות לארגון","נתרם עקב העזרה הרבה אשר הארגון מסייע לכלל ישראל ישר כוח!",TRUE,1),
("rachelletikva@gmail.com",1,25,"tehilaj97@gmail.com", "תודות לארגון","נתרם עקב העזרה הרבה אשר הארגון מסייע לכלל ישראל ישר כוח!",TRUE,1),
("someid@id.com",1,22,"tehilaj97@gmail.com", "תודות לארגון","נתרם עקב העזרה הרבה אשר הארגון מסייע לכלל ישראל ישר כוח!",TRUE,1),
("hadasefr@g.jct.ac.il",1,15,"tehilaj97@gmail.com", "תודות לארגון","נתרם עקב העזרה הרבה אשר הארגון מסייע לכלל ישראל ישר כוח!",TRUE,1),
("someotherid@id.com",1,80,"rachelletikva@gmail.com", "תודות לארגון","נתרם עקב העזרה הרבה אשר הארגון מסייע לכלל ישראל ישר כוח!",TRUE,1),
("someid@gmail.com",2,50,null,"tanks for all halpe ","...",TRUE,1);

-- levels
select * from Levels;
INSERT INTO Levels (org_id, level_num, level_name, min_people, min_sum) VALUES
(1, 1, "כסף", 5, null),
(1, 2, "זהב", 5, 500),
(1, 3, "פלטינום", 10, 2000),
(1, 4, "יהלום", null, 10000),
(2, 1, "ידיד", 1, null),
(2, 2, "נאמן", 2, null),
(2, 3, "חבר בלב ונפש", 10, null),
(2, 4, "אנש", 15, null),
(3, 1, "כסף", null, 200),
(3, 2, "זהב", null, 500),
(3, 3, "פלטינום", null, 2000),
(3, 4, "יהלום", null, 10000);

-- gifts
select* from Gifts;
INSERT INTO Gifts (gift_name, gift_description, gift_pic, org_id, level_num, g_date, raffle) VALUES
("רכב 7 מקומות"," רכב מפואר בעל 7 מקומות של חברת הונדה BR-V","https://magdilim-organization-images.s3.amazonaws.com/prizes/1_c3584880-be52-11ea-b9f1-a1543b6468b8_giftOrg1Level4.jpg"
,1,4,"2020-08-23",true),
("מחשב נייד","מחשב נייד של חברת דל","https://magdilim-organization-images.s3.amazonaws.com/prizes/5_8866dbf0-c015-11ea-a92d-d58a6f3c9a4b_laptop_hichud.jpeg",1,1,"2020-11-14",true),

("מצלמה","מצלמה איכותית ביותר של חברת קאנון","https://magdilim-organization-images.s3.amazonaws.com/prizes/2_7a43a270-be52-11ea-a06b-4107b5c84cbb_WIN A CANON CAMERA!.jpg"
,2,1,"2020-10-03",false),
("עיצוב הבית","חבילה הכוללת הום סטיילינג מהטובים בארץ בשווי של 30000 שח","https://magdilim-organization-images.s3.amazonaws.com/prizes/5_99e5ec90-c015-11ea-a92d-d58a6f3c9a4b_homeDesign_hezer.jpeg",2,3,"2020-09-04",true),
("דירה","דירה בת 5 חגרים בפרוייקט היוקרה מגדלי הנוף","https://magdilim-organization-images.s3.amazonaws.com/prizes/5_5deb9d70-c015-11ea-a92d-d58a6f3c9a4b_aparteement_hezer.jpeg",2,4,"2020-09-01",true),

("חדר ילדים","חדר ילדים שיממש לכל אמא את החלום שתמיד רצתה","https://magdilim-organization-images.s3.amazonaws.com/prizes/5_71aa16c0-c015-11ea-a92d-d58a6f3c9a4b_childrenRoom_yadShara.jpeg",3,3,"2020-08-14",true),
("חופשה חלומית","חופשה חלומית לבחירה מתוך 3 יעדים שווים במיוחד","https://magdilim-organization-images.s3.amazonaws.com/prizes/3_9c2f0e50-bfca-11ea-9b4f-b7223a148dce_vacation.jpg",3,2,"2020-09-18",true),

("מטבח","מטבח יוקרתי ממיטב המעצבים לבחירה",
"https://magdilim-organization-images.s3.amazonaws.com/prizes/5_53771cb0-c016-11ea-b1b6-ff6ac677a095_kitchen_hakshiva.jpeg",4,3,"2020-12-27",true);

-- inserting gifts with winners:
SELECT * FROM magdilimdb.gifts;
INSERT INTO Gifts (gift_name, gift_description, gift_pic, org_id, level_num, g_date, winner, raffle) VALUES
("דירה מפוארת","דירה בת 5 חגרים בפרוייקט היוקרה מגדלי הנוף", "https://magdilim-organization-images.s3.amazonaws.com/prizes/5_5deb9d70-c015-11ea-a92d-d58a6f3c9a4b_aparteement_hezer.jpeg", 1, 4, "2020-08-23", 'tehilaj97@gmail.com', true),
("מצלמה","מצלמת קאנון איכותית","",2,2,"2020-08-17", 'avitalspector@gmail.com', true);

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

-- ~~~~~~~~~~~ fields_of_activity ~~~~~~~~~~``
 -- select * from fields_of_activity
 
INSERT INTO fields_of_activity(field_id,field_name) VALUES
(1,"הצלת חיים"),(2,"השאלת ציוד"),(3,"בריאות -כללי"),(4,"טיפול באסונות"),(5,"עולם התורה"),(6,"מימון"),(7,"אמנים"),(8,"עזרה לנזקקים"),(9,"חלוקת מזון");

-- select * from org_field_of_activity
INSERT INTO org_field_of_activity(field_id,org_id) values(1,1),(3,1),(4,1),(2,2),(3,2),(1,2),(2,3),(3,3);




-- ~~~~~~~~~~~~~~~~ gifts & level ~~~~~~~~~~~~~~~~~~~
 
 -- ~~~ whith a  gifts_levels table
-- gifts_levels ---
-- insert into gifts_levels(g_levele_id,level_name) values(1,"all Donars"),(2,"silver"),(3,"gold"),(4,"platinum");

-- level
-- insert into leveled (g_levele_id,org_id,min_people,min_sum) values(2,1,50,5000),(3,1,150,50000),(4,1,1000,100000), -- org1
-- (1,2,0,100),(2,2,150,0),(3,2,500,10),(4,2,4000,10000); -- org2

-- level
-- select * from levels;
-- insert into levels (l_name,org_id,min_people,min_sum) values("silver",1,50,5000),("gold",1,150,50000),("platinum",1,1000,100000), -- org1
-- ("all Donars",2,0,100),("silver",2,150,0),("gold",2,500,10),("platinum",2,4000,10000); -- org2

-- gifts
-- select * from gifts;
-- insert into gifts (gift_name,gift_description,gift_pic,level_id,g_date)values
-- ("רכב 7 מקומות","כב מפואר עם 7 מקומותר","",3,"2020-08-23"),("מצלמה","מצלמת קאנון איכותית","",2,"2020-08-17"), -- org1
-- ("דיסק","פרחי מיאמי","",4,"2020-07-17"),("מכונת תפירה","חדשה במחיוחד","",6,"2020-09-23"); -- org2

   
-- https://github.com/tehilaja/project

