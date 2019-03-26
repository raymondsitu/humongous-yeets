drop database if exists project;
create database project;
use project;

create table Customer (
  CustomerUsername char(30),
  CustomerPassword char(30),
	EmailAddress char(30),
	PhoneNumber char(20),
	Address char(50),
	PRIMARY KEY (CustomerUserName)
);

create table CreditCard (
	CreditCardNumber char(20),
	BillingAddress char(100),
	DateExpire DATE,
	NameOnCard char(30),
	CustomerUsername char(30) NOT NULL,
	PRIMARY KEY (CreditCardNumber),
	FOREIGN KEY (CustomerUsername) REFERENCES Customer(CustomerUsername)
);

create table Restaurant (
	RestaurantID integer AUTO_INCREMENT,
	Name char(30),
	Location char(100),
	Category char(30),
	Rating integer,
	DeliveryFee REAL,
	RestaurantPassword integer(6),
	PRIMARY KEY (RestaurantID)
);

create table DeliveryPerson(
	Name char(30),
	Address char(100),
	Tips REAL,
	Rating REAL,
	EmailAddress char(50),
	BankAccountNumber char(20),
	DateJoined DATE,
  	PRIMARY KEY (Name, Address)
);

create table Biker (
	Name char(30),
	Address char(100),
	MaximumDistance integer,
	BikeDescription char(200),
	PRIMARY KEY (Name, Address),
FOREIGN KEY (Name, Address) REFERENCES DeliveryPerson(Name, 	Address)
);

create table DriverVehicleInformation (
	LicensePlateNumber char(10),
	DriverLicenseNumber char(30),
	VehicleDescription char(200),
	ValidInsurance bit,
  	PRIMARY KEY (LicensePlateNumber, DriverLicenseNumber)
);

create table Driver (
	Name char(30),
	Address char(100),
	LicensePlateNumber char(10),
	DriverLicenseNumber char(30),
	PRIMARY KEY (Name, Address),
FOREIGN KEY (Name, Address) REFERENCES DeliveryPerson(Name, 	Address),
FOREIGN KEY (LicensePlateNumber, DriverLicenseNumber) 			REFERENCES DriverVehicleInformation(LicensePlateNumber, 		DriverLicenseNumber)
);


create table RestaurantOrder (
	OrderID integer AUTO_INCREMENT,
	Date DATE,
	Time TIME,
	Price REAL,
	Distance integer,
	TipAmount REAL,
	Status char(20),
	Location char(100),
	CustomerUsername char(30) NOT NULL,
	CreditCardNumber char(20) NOT NULL,
	DeliveryPersonName char(30) NOT NULL,
  DeliveryPersonAddress char(50) NOT NULL,
	RestaurantID integer NOT NULL,
  SpecialInstructions char(100),
	PRIMARY KEY (OrderID),
	FOREIGN KEY (CustomerUsername) REFERENCES Customer(CustomerUsername),
	FOREIGN KEY (CreditCardNumber) REFERENCES 						CreditCard(CreditCardNumber),
FOREIGN KEY (DeliveryPersonName, DeliveryPersonAddress) 		REFERENCES DeliveryPerson(Name, Address),
FOREIGN KEY (RestaurantID) REFERENCES 	Restaurant(RestaurantID)
);

create table Menu (
	MenuID integer AUTO_INCREMENT,
	Name char(30),
	RestaurantID integer NOT NULL,
	PRIMARY KEY (MenuID),
FOREIGN KEY (RestaurantID) REFERENCES 	Restaurant(RestaurantID)
);

create table MenuItem (
  	MenuItemID integer AUTO_INCREMENT,
	Name char(30),
  	MenuID integer NOT NULL,
	Price REAL,
	Calories integer,
	Description char(100),
	PRIMARY KEY (MenuItemID),
	FOREIGN KEY (MenuID) REFERENCES	Menu(MenuID) ON DELETE CASCADE
);

create table OrderedMenuItem (
	OrderID integer,
	MenuItemID integer,
	Quantity integer,
	PRIMARY KEY (OrderID, MenuItemID),
	FOREIGN KEY (OrderID) REFERENCES RestaurantOrder(OrderID),
	FOREIGN KEY (MenuItemID) REFERENCES MenuItem(MenuItemID) ON DELETE CASCADE
);


INSERT INTO Customer VALUES ("rsitu", "rsitupw", "raymond.situ@hotmail.com", "6045557389", "2329 West Mall, Vancouver, BC V6T 1Z4");
INSERT INTO Customer VALUES ("kwong", "kwongpw", "kev.wong97@gmail.com", "6045551234", "2330 West Mall, Vancouver, BC V6T 1Z4");
INSERT INTO Customer VALUES ("mshan", "mshanpw", "shanmarkshan@gmail.com", "6045557782", "2529 West Mall, Vancouver, BC V6T 1Z4");
INSERT INTO Customer VALUES ("yli", "ylipw", "yvonneli97@gmail.com", "6045554321", "2629 West Mall, Vancouver, BC V6T 1Z4");
INSERT INTO Customer VALUES ("hughmungus", "hughmunguspw", "humungusyeets@hehe.com", "6045559872","2829 West Mall, Vancouver, BC V6T 1Z4");

INSERT INTO CreditCard VALUES ("4324-0987-1234-8765", "2329 West Mall, Vancouver, BC V6T 1Z4",'2020-02-11', "Raymond Situ", "rsitu");
INSERT INTO CreditCard VALUES ("1111-9898-7676-5252", "2330 West Mall, Vancouver, BC V6T 1Z4",'2020-08-21', "Kevin Wong", "kwong");
INSERT INTO CreditCard VALUES ("2222-0000-9999-8888", "2529 West Mall, Vancouver, BC V6T 1Z4",'2021-07-12', "Mark Shan", "mshan");
INSERT INTO CreditCard VALUES ("4321-0987-7654-1234", "2629 West Mall, Vancouver, BC V6T 1Z4",'2022-06-13', "Yvonne Li", "yli");
INSERT INTO CreditCard VALUES ("0808-9797-6565-2323", "2829 West Mall, Vancouver, BC V6T 1Z4",'2022-05-14', "Humung Yeets", "hughmungus");

INSERT INTO DeliveryPerson VALUES ("Kristy Kong", "2053 Main Mall, Vancouver, BC V6T 1Z2", 20.21, 3.2, "kristykong@gmail.com", "11114444", "2018-02-11");
INSERT INTO DeliveryPerson VALUES ("Sharpe Velleman", "2053 West Mall, Vancouver, BC V6T 1Z2", 5.21, 4.2, "sv@gmail.com", "12340987", "2018-03-11");
INSERT INTO DeliveryPerson VALUES ("Berkowitz Pearson", "2053 East Mall, Vancouver, BC V6T 1Z2", 25.21, 3.1, "bp@gmail.com", "22223333", "2018-04-11");
INSERT INTO DeliveryPerson VALUES ("Cherry Fizzell", "2053 North Mall, Vancouver, BC V6T 1Z2", 120.21, 3.5, "cf@gmail.com", "33334444", "2018-05-11");
INSERT INTO DeliveryPerson VALUES ("Veaux Hoshin", "2053 South Mall, Vancouver, BC V6T 1Z2", 202.21, 4.2, "vh@gmail.com", "55554444", "2018-06-11");
INSERT INTO DeliveryPerson VALUES ("Elon Musk", "2000 Main Mall, Vancouver, BC V6T 1Z2", 20.21, 3.2, "elonmusk@gmail.com", "00009999", "2018-07-11");
INSERT INTO DeliveryPerson VALUES ("Jeff Bezos", "2022 West Mall, Vancouver, BC V6T 1Z2", 5.21, 4.2, "jeff@gmail.com", "88887777", "2018-08-11");
INSERT INTO DeliveryPerson VALUES ("Mark Zuckerberg", "2353 East Mall, Vancouver, BC V6T 1Z2", 25.21, 3.1, "mark@gmail.com", "77773333", "2018-02-21");
INSERT INTO DeliveryPerson VALUES ("Spongebob Squarepants", "2153 Pineapple, Bikini Bottom, BC V6T 1Z2", 120.21, 3.5, "spongebob@gmail.com", "10109292", "2018-02-15");
INSERT INTO DeliveryPerson VALUES ("Patrick Star", "2053 Rock, Bikini Bottom, BC V6T 1Z2", 202.21, 4.2, "rick@gmail.com", "12341337", "2018-03-15");

INSERT INTO Biker VALUES("Kristy Kong", "2053 Main Mall, Vancouver, BC V6T 1Z2", 10, "cool blue bike");
INSERT INTO Biker VALUES("Sharpe Velleman", "2053 West Mall, Vancouver, BC V6T 1Z2", 15, "cool red bike");
INSERT INTO Biker VALUE("Berkowitz Pearson", "2053 East Mall, Vancouver, BC V6T 1Z2", 10, "hot pink bike");
INSERT INTO Biker VALUES("Cherry Fizzell", "2053 North Mall, Vancouver, BC V6T 1Z2", 5, "coral green bike");
INSERT INTO Biker VALUES("Veaux Hoshin", "2053 South Mall, Vancouver, BC V6T 1Z2", 10, "watermelon red bike");

INSERT INTO DriverVehicleInformation VALUES ("000000", "Elon123", "2012 Red Tesla Roadster", 1);
INSERT INTO DriverVehicleInformation VALUES ("111111", "Jeff123", "2099 Rainbow Lamborghini Aventador", 1);
INSERT INTO DriverVehicleInformation VALUES ("222222", "Mark123", "1962 Green John Deere Tractor", 0);
INSERT INTO DriverVehicleInformation VALUES ("333333", "Spongebob123", "1999 White Speedboat", 0);
INSERT INTO DriverVehicleInformation VALUES ("444444", "Patrick123", "2322 Brown Half Sphere Rock", 0);

INSERT INTO Driver VALUES ("Elon Musk", "2000 Main Mall, Vancouver, BC V6T 1Z2", "000000", "Elon123");
INSERT INTO Driver VALUES ("Jeff Bezos", "2022 West Mall, Vancouver, BC V6T 1Z2", "111111", "Jeff123");
INSERT INTO Driver VALUES ("Mark Zuckerberg", "2353 East Mall, Vancouver, BC V6T 1Z2", "222222", "Mark123");
INSERT INTO Driver VALUES ("Spongebob Squarepants", "2153 Pineapple, Bikini Bottom, BC V6T 1Z2", "333333", "Spongebob123");
INSERT INTO Driver VALUES ("Patrick Star", "2053 Rock, Bikini Bottom, BC V6T 1Z2", "444444", "Patrick123");

INSERT INTO Restaurant (Name, Location, Category, Rating, DeliveryFee, RestaurantPassword) VALUES ("McDonalds", "101 5728 University Blvd, Vancouver, BC V6T 1K6", "Fast Food", 3.4, 3.25, 123456);
INSERT INTO Restaurant (Name, Location, Category, Rating, DeliveryFee, RestaurantPassword) VALUES ("Miku", "200 Granville St #70, Vancouver, BC V6C 1S4", "Sushi", 4.5, 4.25, 123456);
INSERT INTO Restaurant (Name, Location, Category, Rating, DeliveryFee, RestaurantPassword) VALUES ("FreshSlice", "688 Dunsmuir Street Vancouver, British Columbia V6B 1N3", "Pizza", 4.2, 4.00, 123456);
INSERT INTO Restaurant (Name, Location, Category, Rating, DeliveryFee, RestaurantPassword) VALUES ("Santouka", "558 W Broadway, Vancouver, BC V5Z 1E9", "Ramen", 4.6, 3.00, 123456);
INSERT INTO Restaurant (Name, Location, Category, Rating, DeliveryFee, RestaurantPassword) VALUES ("Uncle Fatih", "6045 University BLVD Vancouver, BC V6T 1Z1", "Pizza", 3.9, 2.25, 123456);

INSERT INTO Menu (Name, RestaurantID) VALUES ("McDonalds Menu", 1);
INSERT INTO Menu (Name, RestaurantID) VALUES ("Miku Menu", 2);
INSERT INTO Menu (Name, RestaurantID) VALUES ("FreshSlice Menu", 3);
INSERT INTO Menu (Name, RestaurantID) VALUES ("Santouka Menu", 4);
INSERT INTO Menu (Name, RestaurantID) VALUES ("Uncle Fatih Menu", 5);


INSERT INTO RestaurantOrder (Date, Time, Price, Distance, TipAmount, Status, Location, CustomerUsername, CreditCardNumber, DeliveryPersonName, DeliveryPersonAddress, RestaurantID)
VALUES ("2019-02-10", TIME("11:10"), 10.00, 4, 1.00, "delivered", "2329 West Mall, Vancouver, BC V6T 1Z4", "rsitu","4324-0987-1234-8765","Kristy Kong", "2053 Main Mall, Vancouver, BC V6T 1Z2", 1);
INSERT INTO RestaurantOrder (Date, Time, Price, Distance, TipAmount, Status, Location, CustomerUsername, CreditCardNumber, DeliveryPersonName, DeliveryPersonAddress, RestaurantID)
VALUES ("2019-02-15", TIME("11:12"), 22.25, 14, 1.00, "delivered", "2330 West Mall, Vancouver, BC V6T 1Z4", "kwong","1111-9898-7676-5252","Sharpe Velleman", "2053 West Mall, Vancouver, BC V6T 1Z2", 2);
INSERT INTO RestaurantOrder (Date, Time, Price, Distance, TipAmount, Status, Location, CustomerUsername, CreditCardNumber, DeliveryPersonName, DeliveryPersonAddress, RestaurantID)
VALUES ("2019-02-16", TIME("11:15"), 3.00, 12, 1.00, "delivered", "2530 West Mall, Vancouver, BC V6T 1Z4", "mshan","2222-0000-9999-8888","Berkowitz Pearson", "2053 East Mall, Vancouver, BC V6T 1Z2", 3);
INSERT INTO RestaurantOrder (Date, Time, Price, Distance, TipAmount, Status, Location, CustomerUsername, CreditCardNumber, DeliveryPersonName, DeliveryPersonAddress, RestaurantID)
VALUES ("2019-02-18", TIME("11:22"), 24.00, 8, 1.00, "delivered", "2630 West Mall, Vancouver, BC V6T 1Z4", "yli","4321-0987-7654-1234","Spongebob Squarepants", "2153 Pineapple, Bikini Bottom, BC V6T 1Z2", 4);
INSERT INTO RestaurantOrder (Date, Time, Price, Distance, TipAmount, Status, Location, CustomerUsername, CreditCardNumber, DeliveryPersonName, DeliveryPersonAddress, RestaurantID)
VALUES ("2019-02-24", TIME("11:10"), 5.00, 4, 1.00, "order made", "101 5728 University Blvd, Vancouver, BC V6T 1K6", "hughmungus","0808-9797-6565-2323","Patrick Star", "2053 Rock, Bikini Bottom, BC V6T 1Z2", 5);
INSERT INTO RestaurantOrder (Date, Time, Price, Distance, TipAmount, Status, Location, CustomerUsername, CreditCardNumber, DeliveryPersonName, DeliveryPersonAddress, RestaurantID, SpecialInstructions)
VALUES ("2019-03-26", "13:24", 60.5, 15, 20, "delivered", "2829 West Mall, Vancouver, BC V6T 1Z4", "hughmungus", "0808-9797-6565-2323", "Sharpe Velleman", "2053 West Mall, Vancouver, BC V6T 1Z2", 2, "Please cook the salmon");
INSERT INTO RestaurantOrder (Date, Time, Price, Distance, TipAmount, Status, Location, CustomerUsername, CreditCardNumber, DeliveryPersonName, DeliveryPersonAddress, RestaurantID, SpecialInstructions)
VALUES ("2019-03-26", "13:26", 48.25, 10, 100, "delivered", "2330 West Mall, Vancouver, BC V6T 1Z4", "kwong", "1111-9898-7676-5252", "Veaux Hoshin", "2053 South Mall, Vancouver, BC V6T 1Z2", 2, "");
INSERT INTO RestaurantOrder (Date, Time, Price, Distance, TipAmount, Status, Location, CustomerUsername, CreditCardNumber, DeliveryPersonName, DeliveryPersonAddress, RestaurantID, SpecialInstructions)
VALUES ("2019-03-26", "13:27", 52.5, 16, 0, "delivered", "2529 West Mall, Vancouver, BC V6T 1Z4", "mshan", "2222-0000-9999-8888", "Mark Zuckerberg", "2353 East Mall, Vancouver, BC V6T 1Z2", 2, "");
INSERT INTO RestaurantOrder (Date, Time, Price, Distance, TipAmount, Status, Location, CustomerUsername, CreditCardNumber, DeliveryPersonName, DeliveryPersonAddress, RestaurantID, SpecialInstructions)
VALUES ("2019-03-26", "13:30", 93, 6, 0, "delivered", "2329 West Mall, Vancouver, BC V6T 1Z4", "rsitu", "4324-0987-1234-8765", "Elon Musk", "2000 Main Mall, Vancouver, BC V6T 1Z2", 2, "addd");
INSERT INTO RestaurantOrder (Date, Time, Price, Distance, TipAmount, Status, Location, CustomerUsername, CreditCardNumber, DeliveryPersonName, DeliveryPersonAddress, RestaurantID, SpecialInstructions)
VALUES ("2019-03-26", "13:32", 30.25, 4, 0, "delivered", "2629 West Mall, Vancouver, BC V6T 1Z4", "yli", "4321-0987-7654-1234", "Jeff Bezos", "2022 West Mall, Vancouver, BC V6T 1Z2", 2, "");

INSERT INTO `MenuItem` VALUES (1,'Big Mac',1,3.99,509,'Two 100 percent beef patties'),
(2,'Salmon Sashimi',2,22.25,500,'fresh fish'),
(3,'Cheese Pizza Slice',3,1.99,340,'cheese pizza with chedder'),
(4,'Shio Ramen',4,12,750,'ramen noodles with pork in salt broth'),
(5,'Cheese Pizza Slice',5,2.5,370,'a slice of cheese pizza'),
(6,'Bacon Clubhouse Beef',1,5.99,673,'Has good bacon'),
(7,'Quarter Pounder with Cheese',1,3.99,527,'Two slices of melted cheddar cheese and more'),
(8,'McChicken',1,3.99,426,'Our 100 percent chicken breast patty in a crispy coating'),
(9,'Double Cheeseburger',1,1.99,442,'Two 100 percent pure beef patties and cheddar'),
(10,'Filet-o-Fish',1,3.99,333,'Savour our crispy fish burger'),
(11,'20 pc. Chicken McNuggets',1,4.99,894,'Better than wedding rings'),
(12,'Oreo McFlurry',1,1.99,505,'Oreo McFlurry good stuff'),
(13,'M&M McFlurry',1,1.99,344,'M&M McFlurry good stuff'),
(14,'Medium Fries',1,1.99,341,'Nice salted fries'),
(15,'Large Fries',1,2.49,448,'Nice salted fries'),
(16,'Miso Soup',2,4,70,'green onion, enoki mushroom, wakame'),
(17,'Nutrigreens Farm Tofu Salad',2,15,200,'organic baby greens'),
(18,'Nutrigreens Farm Tofu Salad',2,15,200,'organic baby greens'),
(19,'Kaiso Seaweed Salad',2,18,250,'nutrigreens farm organic greens'),
(20,'Calamari',2,18,550,'squid in tempura batter, pickled beet and cucumber'),
(21,'Steamed Edamame',2,7,180,'sea salt'),
(22,'Miku Waterfront Platter',2,105,700,'chef\'s selection of sashimi, fresh oysters, mussels, prawns, clams, etc.'),
(23,'AAA Sterling Silver Prime Rib',2,45,1050,'10oz, 5 hour sous-vide, brown butter wasabi sauce'),
(24,'Dessert Platter',2,49,700,'our pastry chef\'s selection of four desserts'),
(25,'Meat Lovers Feast',3,14.99,2560,'lots of meat'),
(26,'Pepperoni Feast',3,11.99,2010,'lots of pepperoni'),
(27,'Combo Feast',3,12.99,1805,'meat and vegetables'),
(28,'Hawaiian Feast',3,12.99,1950,'ham and pineapples'),
(29,'BBQ Chicken Bacon Feast',3,12.99,2100,'chicken and bbq sauce'),
(30,'Butter Chicken Feast',3,12.99,2250,'butter chicken on pizza'),
(31,'Pesto Feast',3,12.99,2100,'pesto sauce'),
(32,'Veggie Feast',3,12.99,1900,'lots of veggies'),
(33,'Shoyu Ramen',4,12,780,'ramen noodles with pork in soy broth'),
(34,'Miso Ramen',4,13,790,'ramen noodles with pork in miso broth'),
(35,'Spicy Miso Ramen',4,14,810,'ramen noodles with pork in spicy miso broth'),
(36,'Tokusen Toroniku Ramen',4,18,900,'ramen noodles with roasted pork cheeks'),
(37,'Negimeshi',4,6,350,'rice with green onion'),
(38,'Hanjuku Tamago',4,2,90,'soft boiled egg'),
(39,'Yaki Gyoza',4,6,400,'Fried dumpling'),
(40,'BBQ Chicken',5,14.99,2100,'bbq base, chicken, red pepper, mushroom cheddar'),
(41,'BBQ Pulled Pork',5,14.99,2150,'bbq base, pulled pork, mushroom cheddar'),
(42,'Chipotle Chicken',5,14.99,2250,'chipotle base, chicken, onion, etc'),
(43,'Beef and Blue Cheese',5,14.99,2300,'ground beef and blue cheese'),
(44,'Canadian',5,14.99,2200,'bacon mushroom and cheddar'),
(45,'Eggplant Artichoke',5,13.99,1900,'roasted eggplant, artichoke, pesto'),
(46,'Fresh Tomato and Feta',5,13.99,1950,'green pepper, mushroom, tomato and feta'),
(47,'Mixed Veggie',5,13.99,2000,'black olive, green pepper, mushroom, onion');



INSERT INTO OrderedMenuItem VALUES (1, 1, 2);
INSERT INTO OrderedMenuItem VALUES (2, 2, 1);
INSERT INTO OrderedMenuItem VALUES (3, 3, 1);
INSERT INTO OrderedMenuItem VALUES (4, 4, 2);
INSERT INTO OrderedMenuItem VALUES (5, 5, 1);
INSERT INTO OrderedMenuItem VALUES (6, 2, 2);
INSERT INTO OrderedMenuItem VALUES (6, 16, 4);
INSERT INTO OrderedMenuItem VALUES (7, 2, 1);
INSERT INTO OrderedMenuItem VALUES (7, 16, 2);
INSERT INTO OrderedMenuItem VALUES (7, 19, 1);
INSERT INTO OrderedMenuItem VALUES (8, 2, 2);
INSERT INTO OrderedMenuItem VALUES (8, 16, 2);
INSERT INTO OrderedMenuItem VALUES (9, 2, 4);
INSERT INTO OrderedMenuItem VALUES (9, 16, 1);
INSERT INTO OrderedMenuItem VALUES (10, 2, 1);
INSERT INTO OrderedMenuItem VALUES (10, 16, 2);

