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
	RestaurantID integer,
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
	OrderID integer,
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
	PRIMARY KEY (OrderID),
	FOREIGN KEY (CustomerUsername) REFERENCES Customer(CustomerUsername),
	FOREIGN KEY (CreditCardNumber) REFERENCES 						CreditCard(CreditCardNumber),
FOREIGN KEY (DeliveryPersonName, DeliveryPersonAddress) 		REFERENCES DeliveryPerson(Name, Address),
FOREIGN KEY (RestaurantID) REFERENCES 	Restaurant(RestaurantID)
);

create table Menu (
	MenuID integer,
	Name char(30),
	RestaurantID integer NOT NULL,
	PRIMARY KEY (MenuID),
FOREIGN KEY (RestaurantID) REFERENCES 	Restaurant(RestaurantID)
);

create table MenuItem (
  	MenuItemID integer,
	Name char(30),
  	MenuID integer NOT NULL,
	Price REAL,
	Calories integer,
	Description char(100),
	Rating integer,
	PRIMARY KEY (MenuItemID),
	FOREIGN KEY (MenuID) REFERENCES	Menu(MenuID) ON DELETE CASCADE
);

create table OrderedMenuItem (
	OrderID integer,
	MenuItemID integer,
	Quantity integer,
	SpecialInstructions char(100),
	PRIMARY KEY (OrderID, MenuItemID),
	FOREIGN KEY (OrderID) REFERENCES RestaurantOrder(OrderID),
	FOREIGN KEY (MenuItemID) REFERENCES MenuItem(MenuItemID)
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

INSERT INTO Restaurant VALUES (1, "McDonalds", "101 5728 University Blvd, Vancouver, BC V6T 1K6", "Fast Food", 3.4, 3.25, 123456);
INSERT INTO Restaurant VALUES (2, "Miku", "200 Granville St #70, Vancouver, BC V6C 1S4", "Sushi", 4.5, 4.25, 123456);
INSERT INTO Restaurant VALUES (3, "FreshSlice", "688 Dunsmuir Street Vancouver, British Columbia V6B 1N3", "Pizza", 4.2, 4.00, 123456);
INSERT INTO Restaurant VALUES (4, "Santouka", "558 W Broadway, Vancouver, BC V5Z 1E9", "Ramen", 4.6, 3.00, 123456);
INSERT INTO Restaurant VALUES (5, "Uncle Fatih", "6045 University BLVD Vancouver, BC V6T 1Z1", "Pizza", 3.9, 2.25, 123456);

INSERT INTO Menu VALUES (1, "McDonalds Menu", 1);
INSERT INTO Menu VALUES (2, "Miku Menu", 2);
INSERT INTO Menu VALUES (3, "FreshSlice Menu", 3);
INSERT INTO Menu VALUES (4, "Santouka Menu", 4);
INSERT INTO Menu VALUES (5, "Uncle Fatih Menu", 5);


INSERT INTO RestaurantOrder VALUES (1, "2019-02-10", TIME("11:10"), 10.00, 4, 1.00, "delivered", "2329 West Mall, Vancouver, BC V6T 1Z4", "rsitu","4324-0987-1234-8765","Kristy Kong", "2053 Main Mall, Vancouver, BC V6T 1Z2", 1);
INSERT INTO RestaurantOrder VALUES (2, "2019-02-15", TIME("11:12"), 22.25, 14, 1.00, "delivered", "2330 West Mall, Vancouver, BC V6T 1Z4", "kwong","1111-9898-7676-5252","Sharpe Velleman", "2053 West Mall, Vancouver, BC V6T 1Z2", 2);
INSERT INTO RestaurantOrder VALUES (3, "2019-02-16", TIME("11:15"), 3.00, 12, 1.00, "delivered", "2530 West Mall, Vancouver, BC V6T 1Z4", "mshan","2222-0000-9999-8888","Berkowitz Pearson", "2053 East Mall, Vancouver, BC V6T 1Z2", 3);
INSERT INTO RestaurantOrder VALUES (4, "2019-02-18", TIME("11:22"), 24.00, 8, 1.00, "delivered", "2630 West Mall, Vancouver, BC V6T 1Z4", "yli","4321-0987-7654-1234","Spongebob Squarepants", "2153 Pineapple, Bikini Bottom, BC V6T 1Z2", 4);
INSERT INTO RestaurantOrder VALUES (5, "2019-02-24", TIME("11:10"), 5.00, 4, 1.00, "order made", "101 5728 University Blvd, Vancouver, BC V6T 1K6", "hughmungus","0808-9797-6565-2323","Patrick Star", "2053 Rock, Bikini Bottom, BC V6T 1Z2", 5);

INSERT INTO MenuItem VALUES (1, "Big Mac", 1, 5.00, 550, "burger 2 patties", 3.9);
INSERT INTO MenuItem VALUES (2, "Salmon Sashimi",2, 22.25, 500, "fresh fish", 4.6);
INSERT INTO MenuItem VALUES (3, "Cheese Pizza Slice", 3, 3.00, 340, "cheese pizza with chedder", 4.2);
INSERT INTO MenuItem VALUES (4, "Shio Ramen", 4, 12.00, 750, "ramen noodles with pork", 4.5);
INSERT INTO MenuItem VALUES (5, "Cheese Pizza Slice", 5, 2.50, 370, "a slice of cheese pizza", 3.9);

INSERT INTO OrderedMenuItem VALUES (1, 1, 2, "no pickles");
INSERT INTO OrderedMenuItem VALUES (2, 2, 1, "");
INSERT INTO OrderedMenuItem VALUES (3, 3, 1, "");
INSERT INTO OrderedMenuItem VALUES (4, 4, 2, "");
INSERT INTO OrderedMenuItem VALUES (5, 5, 1, "");

