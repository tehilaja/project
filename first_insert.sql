-- ~~~~~~~~~~ FIRST TINSERT  ~~~~~~~~~~~~~~~~~

USe magdilimdb;

 -- city 
INSERT INTO city (country_id,city_name) VALUE (1, "TEL_aviv"),(1, "Jerusalem"),(2, "Maiami"),(1, "Bnei_brak");

-- country
INSERT INTO country (country_ID, country_name) VALUE(1,"Israel"), (2,"Usa");

-- Users

-- TODO: address??
INSERT INTO Users (user_name, first_name, last_name, pswd, email, address_id,num_phone) VALUES
	("Avital","Avital", "b", "123456", "avital@gmail.com",1, 050123456 ), 
	("Tehila","Tehila","j", "1234", "tehila@gmail.com",2,054123456),
	("Elchanan","Elchanan","b", "12345", "elchanan@gmail.com",3,058123456);

-- SELECT * FROM Credit_info
-- DELETE  FROM Credit_info   
-- where credit_id = 1234;

-- Credit_info
INSERT Into Credit_info (user_id,numbers) VALUES (1,1234),(1,1244);


 -- organization
INSERT INTO organization (org_name,admin_name,description,field_of_acctivity,org_pic,min_donation,org_num,branch,account_num,bank_num,founding_year,working,volunteers,friends,city_id,building,street,p_code) VALUES 
("איחוד הצלה ישראל","אליהו פולק", "ן (אירועים רבי נפגעים), חולים ונפגעים. רכישת ציוד רפואי בסיסי ומתקדם לצורך פעילות המתנדבים. רכישת רכבי חירום והצלה, כגון אמבולנסים ואופנועים, ומימון הוצאות אחזקת רכבי החירום. הכשרת אזרחים לפעילות בקהילה לסיוע ומניעה של תאונות דרכים, פגיעות ומחלות","טיפול באסונות ומצבי חירוםהצלת חיים",
"https://upload.wikimedia.org/wikipedia/commons/b/bc/UHNewLogo.svg",12,580465979,910,102346,10,2006,231,5400,12,1,78,"ירמיהו",9446758),
("עזר מציון", "הרב חנניה צ'ולק","וסעודית. סיוע, שיקום ושירותים לנכי בריאות הנפש. סיוע לניצולי שואה. סיוע לחולי סרטן. הפעלת מגוון שרותים לאוכלוסיית הגמלאים והקשישים ודאגה לזכויותיהם. סיוע, ייעוץ, טיפול ושיקום לבעלי צרכים מיוחדים בכל סוגי הנכויות לרבות נכויות חושיות כגון לקויות שמיעה, לקויות דיבור ולקויות ראיה. הפעלת מסגרות חינוכיות וטיפוליות. הפעלת שירותי רווחה. סיוע לנפגעי טרור להקים קרן גמילות חסדים. לעזור לחולים נזקקים בריפוי ועזרה רפואית",
"בריאות והצלת חיים - כללי שירותי רווחה לאוכלוסיות שונות","https://www.ami.org.il/media/1047/logo.png",10,580079978,911,123456,10,1985,8434,30078,5,4,5,"הרב רבינוב",5156316),
("יד שרה","משה אורי כהן","להשאיל ציוד ומכשור רפואי ללא תמורה לתקנו ולתחזקו. לעודד, להפעיל, להדריך ולהכשיר מתנדבים וארגוני מתנדבים למתן מענה לצרכים קהילתיים. להעניק שירותי בית וקהילה מגוונים לחולים ונזקקים.להלוות כסף ללא ריבית לנצרכים, לעמותות המסייעות לנצרכים ולכל גוף ציבורי המסייע לנצרכים בכל אופן שהוא. להעניק לנצרכים מעוטי יכולת כסף ו/או מכשירים לריפוי וסיוע. לאחוז ולנקוט בכל האמצעים הנדרשים או שידרשו לצורך מימוש המטרות הנ ל וכן כל פעולה אחרת שתראה לועד העמותה ואשר מגמתה הינה עזרה לזולת", "בריאות והצלת חיים - כללי",
"https://yad-sarah.net/wp-content/uploads/2019/04/logoys.png",15,580030104,900,123456,10,1983,330,7000,11,1,124,"שדרות הרצל",9618722); 

-- leveled
insert into leveled (org_id,l_name,min_people,min_sum) values(1,"כסף",50,5000);
insert into leveled (org_id,l_name,min_people,min_sum) values(1,"זהב",150,50000);
insert into leveled (org_id,l_name,min_people,min_sum) values(1,"יהלום",1000,100000);

-- SELECT * FROM Gifts;

-- Gifts
--  STR_TO_DATE() to convert string to date format
insert into gifts (gift_description,gift_pic,level_id,g_date) values("רכב 7 מקומות","",3,"2020-03-23");
insert into gifts (gift_description,gift_pic,level_id,auto) values ("דיסק","",1,TRUE);

-- donation_status
insert into donation_status (description) values("מאושר"),("מבוטל");


-- ~~~~~~~~~~~~~~ not must ~~~~~~~~~~~~
-- admin
INSERT INTO admin(admin_id,org_id) VALUE(1,1);

-- SELECT * FROM doners_in_org
-- Doners_in_org
 INSERT INTO doners_in_org (user_id, org_id, monthly_donation, referred_by,d_title, d_description,is_anonim,status_id) VALUES 
 (3, 1,15,2,"תודות לארגון","נתרם עקב העזרה הרבה אשר הארגון מסייע לכלל ישראל ישר כוח!",TRUE,1), (3, 1,15,2,"לזכות עמי","",0,1);
 

    
-- https://github.com/tehilaja/project