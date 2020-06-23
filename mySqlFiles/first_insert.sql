-- ~~~~~~~~~~ FIRST INSERT  ~~~~~~~~~~~~~~~~~

USe magdilimdb;

 -- city 
INSERT INTO city (country_id,city_name) VALUE (1, "TEL_aviv"),(1, "Jerusalem"),(2, "Miami"),(1, "Bnei_brak");

-- country
INSERT INTO country (country_ID, country_name) VALUE(1,"Israel"), (2,"Usa");

-- Users

-- TODO: address??
INSERT INTO Users (user_name, first_name, last_name, pswd, email, address_id,num_phone) VALUES
	("Avital","Avital", "b", "123456", "avital@gmail.com",1, 050123456 ), 
	("Tehila","Tehila","j", "1234", "tehila@gmail.com",2,054123456),
	("Elchanan","Elchanan","b", "12345", "elchanan@gmail.com",3,058123456);

-- SELECT * FROM Users;
-- DELETE  FROM Credit_info   
-- where credit_id = 1234;

-- Credit_info
INSERT Into Credit_info (user_id,numbers) VALUES (1,1234),(1,1244);

-- ~~~~~~~~~~~~~~~ organizations ~~~~~~~~~
 -- TODO:  field_of_activity
 -- select * from field_of_activity
INSERT INTO field_of_activity(field_id,field_name) VALUES
(1,"הצלת חיים"),(2,"השאלת ציוד"),(3,"בריאות -כללי"),(4,"טיפול באסונות"),(5,"עולם התורה"),(6,"מימון"),(7,"אמנים"),(8,"עזרה לנזקקים"),(9,"חלוקת מזון");


 -- organizations
 -- drop table organizations
 -- select * from organizations
INSERT INTO organizations (org_name,approved,admin_name,description,one_time_donation,img_url,min_donation,org_num,phone,email,account_owner,branch,account_num,bank_num,founding_year,working,volunteers,friends,city_name,country_name,building,street,p_code) VALUES 
("איחוד הצלה ישראל",1,"אליהו פולק", "ן (אירועים רבי נפגעים), חולים ונפגעים. רכישת ציוד רפואי בסיסי ומתקדם לצורך פעילות המתנדבים. רכישת רכבי חירום והצלה, כגון אמבולנסים ואופנועים, ומימון הוצאות אחזקת רכבי החירום. הכשרת אזרחים לפעילות בקהילה לסיוע ומניעה של תאונות דרכים, פגיעות ומחלות",
0,"https://upload.wikimedia.org/wikipedia/commons/b/bc/UHNewLogo.svg",12,580465979,"0545391235","avitalbic@gmail.com","dov e",910,102346,10,2006,231,5400,12,"Jerusalem","Israel",78,"ירמיהו",9446758),
("עזר מציון", 1,"הרב חנניה צ'ולק","וסעודית. סיוע, שיקום ושירותים לנכי בריאות הנפש. סיוע לניצולי שואה. סיוע לחולי סרטן. הפעלת מגוון שרותים לאוכלוסיית הגמלאים והקשישים ודאגה לזכויותיהם. סיוע, ייעוץ, טיפול ושיקום לבעלי צרכים מיוחדים בכל סוגי הנכויות לרבות נכויות חושיות כגון לקויות שמיעה, לקויות דיבור ולקויות ראיה. הפעלת מסגרות חינוכיות וטיפוליות. הפעלת שירותי רווחה. סיוע לנפגעי טרור להקים קרן גמילות חסדים. לעזור לחולים נזקקים בריפוי ועזרה רפואית",
1,"https://www.ami.org.il/media/1047/logo.png",10,580079978,"0545211235","ezerM@gmail.com","dov e",911,123456,10,1985,8434,30078,5,"Jerusalem","Israel",5,"הרב רבינוב",5156316),
("יד שרה",1,"משה אורי כהן","להשאיל ציוד ומכשור רפואי ללא תמורה לתקנו ולתחזקו. לעודד, להפעיל, להדריך ולהכשיר מתנדבים וארגוני מתנדבים למתן מענה לצרכים קהילתיים. להעניק שירותי בית וקהילה מגוונים לחולים ונזקקים.להלוות כסף ללא ריבית לנצרכים, לעמותות המסייעות לנצרכים ולכל גוף ציבורי המסייע לנצרכים בכל אופן שהוא. להעניק לנצרכים מעוטי יכולת כסף ו/או מכשירים לריפוי וסיוע. לאחוז ולנקוט בכל האמצעים הנדרשים או שידרשו לצורך מימוש המטרות הנ ל וכן כל פעולה אחרת שתראה לועד העמותה ואשר מגמתה הינה עזרה לזולת",
0,"https://yad-sarah.net/wp-content/uploads/2019/04/logoys.png",15,580030104,"2145687884","yadSara@gmail.com","dov e",900,123456,10,1983,330,7000,11,"Jerusalem","Israel",124,"שדרות הרצל",9618722); 

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
select * from leveled;
insert into leveled (l_name,org_id,min_people,min_sum) values("silver",1,50,5000),("gold",1,150,50000),("platinum",1,1000,100000), -- org1
("all Donars",2,0,100),("silver",2,150,0),("gold",2,500,10),("platinum",2,4000,10000); -- org2

-- gifts
select * from gifts;
insert into gifts (gift_name,gift_description,gift_pic,level_id,g_date)values
("רכב 7 מקומות","כב מפואר עם 7 מקומותר","",3,"2020-08-23"),("מצלמה","מצלמת קאנון איכותית","",2,"2020-08-17"), -- org1
("דיסק","פרחי מיאמי","",4,"2020-07-17"),("מכונת תפירה","חדשה במחיוחד","",6,"2020-09-23"); -- org2

-- ***** *****


-- donation_status
insert into donation_status (description) values("מאושר"),("מבוטל");

 INSERT INTO doners_in_org (user_id, org_id, monthly_donation, referred_by,d_title, d_description,is_anonim,status_id) VALUES 
 (3,1,15,1,"תודות לארגון","נתרם עקב העזרה הרבה אשר הארגון מסייע לכלל ישראל ישר כוח!",TRUE,1), (1,2,50,2,"tanks for all halpe ","...",0,1);

-- ~~~~~~~~~~~~~~ not must ~~~~~~~~~~~~
-- admin
INSERT INTO admin(admin_id,org_id,admin_pswd) VALUE(1,1, 123456);

-- SELECT * FROM doners_in_org
-- Doners_in_org

 

    
-- https://github.com/tehilaja/project