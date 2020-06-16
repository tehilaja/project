Use magdilimdb;

 -- organization
INSERT INTO organizations(org_name, org_admin_id, description, img_url, min_donation, one_time_donation, approved, pc_num, admin_name, founding_year, working, num_volunteers, num_friends, field_of_acctivity) VALUES
("איחוד הצלה ישראל","tehilaj97@gmail.com", "ן (אירועים רבי נפגעים), חולים ונפגעים. רכישת ציוד רפואי בסיסי ומתקדם לצורך פעילות המתנדבים. רכישת רכבי חירום והצלה, כגון אמבולנסים ואופנועים, ומימון הוצאות אחזקת רכבי החירום. הכשרת אזרחים לפעילות בקהילה לסיוע ומניעה של תאונות דרכים, פגיעות ומחלות",
"https://upload.wikimedia.org/wikipedia/commons/b/bc/UHNewLogo.svg",12, 30, true, 580465979, "אליהו פולק", 2006,388,231,5400, "הצלת נפשות"),
("עזר מציון","tehilaj97@gmail.com", "וסעודית. סיוע, שיקום ושירותים לנכי בריאות הנפש. סיוע לניצולי שואה. סיוע לחולי סרטן. הפעלת מגוון שרותים לאוכלוסיית הגמלאים והקשישים ודאגה לזכויותיהם. סיוע, ייעוץ, טיפול ושיקום לבעלי צרכים מיוחדים בכל סוגי הנכויות לרבות נכויות חושיות כגון לקויות שמיעה, לקויות דיבור ולקויות ראיה. הפעלת מסגרות חינוכיות וטיפוליות. הפעלת שירותי רווחה. סיוע לנפגעי טרור להקים קרן גמילות חסדים. לעזור לחולים נזקקים בריפוי ועזרה רפואית",
"https://www.ami.org.il/media/1047/logo.png",10, 1, true, 580079978, "הרב חנניה צ'ולק", 1985, 911,123456,8434, "עזרה רפואית"),
("יד שרה","tehilaj97@gmail.com","להשאיל ציוד ומכשור רפואי ללא תמורה לתקנו ולתחזקו. לעודד, להפעיל, להדריך ולהכשיר מתנדבים וארגוני מתנדבים למתן מענה לצרכים קהילתיים. להעניק שירותי בית וקהילה מגוונים לחולים ונזקקים.להלוות כסף ללא ריבית לנצרכים, לעמותות המסייעות לנצרכים ולכל גוף ציבורי המסייע לנצרכים בכל אופן שהוא. להעניק לנצרכים מעוטי יכולת כסף ו/או מכשירים לריפוי וסיוע. לאחוז ולנקוט בכל האמצעים הנדרשים או שידרשו לצורך מימוש המטרות הנ ל וכן כל פעולה אחרת שתראה לועד העמותה ואשר מגמתה הינה עזרה לזולת",
"https://yad-sarah.net/wp-content/uploads/2019/04/logoys.png",15, 20, true, 580030104,"משה אורי כהן",1983, 55,900,123456,"ציוד רפואי");

-- addresses
INSERT INTO addresses(org_id, country, state, city, street, building, apartment, suite, zip) VALUES
(1, "Israel", null, "Jerusalem","ירמיהו", 78, null, null, 9446758),
(2, "Israel", null, "Jerusalem","הרב רבינוב", 5, null, null, 5156316),
(3, "Israel", null, "Jerusalem","שדרות הרצל", 124, null, null, 9618722);

-- doners in org
INSERT INTO doners_in_org (user_id, org_id, monthly_donation, referred_by,d_title, d_description,anonymous,status_id) VALUES
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
INSERT INTO levels (org_id, level_num, level_name, min_people, min_sum) VALUES
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
INSERT INTO gifts (gift_name, gift_description, gift_pic, org_id, level_num, g_date, raffle) VALUES
("רכב 7 מקומות","כב מפואר עם 7 מקומותר", null, 1, 4, "2020-08-23", true),
("מצלמה","מצלמת קאנון איכותית","",2,2,"2020-08-17", true),
("דיסק","פרחי מיאמי","",3,1,"2020-07-17", false),
("רכב 7 kjhkhומות","כב מפואר עם 7 מקומותר", null, 1, 1, "2020-08-23", true),
("מצdfdfלמה","מצלמת קאנון איכותית","",2,1,"2020-08-17", true),
("dfdfדיסק","פרחי מיאמי","",3,1,"2020-07-17", false),
("מכונת תפירה","חדשה במחיוחד","",1,2,"2020-09-23", false);


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

   
-- https://github.com/tehilaja/project
