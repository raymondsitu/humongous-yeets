from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import *
from datetime import datetime
import random

app = Flask(__name__)
CORS(app)

engine = create_engine('mysql://root@localhost')
connection = engine.connect()
engine.execute('use project')
print('db set!')

@app.route("/")
def hello():
    return jsonify({"response": "poggers"})

# Returns all customers in the DB
@app.route("/getCustomers")
def getCustomers():
    query = 'SELECT * FROM project.Customer;'
    response = []
    result = engine.execute(query)
    if result.rowcount == 0:
        return jsonify("No customers found")
    for row in result:
        customer = dict(row)
        response.append(customer)
    return jsonify(response)

# Given a username and password as arguments in a get request, gets a single customer object
@app.route("/login")
def login():
    username = request.args.get('username')
    password = request.args.get('password')
    query = 'SELECT * FROM project.Customer WHERE CustomerUsername = "{}" AND CustomerPassword = "{}"'.format(username, password)
    response = []
    try:
        result = engine.execute(query)
        if result.rowcount == 0:
            # for some reason this query files without adding project in front of the table name XD
            query = 'SELECT * FROM project.Restaurant WHERE RestaurantID = {} AND RestaurantPassword = {}'.format(username, password)
            result = engine.execute(query)
            if result.rowcount == 0:
                return jsonify({"response": "not found"})
            else:
                row = result.first()
                restaurant = dict(row)
                response.append('restaurant')
                response.append(restaurant)
                return jsonify(response)
        else:
          row = result.first()
          customer = dict(row)
          response.append('customer')
          response.append(customer)
          return jsonify(response)
    except Exception as e:
        print(e)
        return jsonify({"response": "not found"})

# Returns all restaurants in the DB
@app.route("/getRestaurants")
def getRestaurants():
    query = 'SELECT * FROM project.Restaurant'
    response = []
    result = engine.execute(query)
    if result.rowcount == 0:
        return jsonify("No restaurants found")
    for row in result:
        restaurant = dict(row)
        response.append(restaurant)
    return jsonify(response)

# Given a name, gets all restaurants in the DB that have the name in their name
@app.route("/getRestaurantsFiltered")
def getRestaurantsFiltered():
    restaurantName = request.args.get('Name')
    query = "SELECT * FROM project.Restaurant WHERE Name LIKE '%%{}%%'".format(restaurantName)
    response = []
    try:
        result = engine.execute(query)
        if result.rowcount == 0:
            return jsonify("No restaurants found")
        for row in result:
            restaurant = dict(row)
            response.append(restaurant)
        return jsonify(response)
    except Exception as e:
        print(e)
        return jsonify("Exception thrown")

# Given the restaurant ID, get a single restaurant (wrapped in an array)
@app.route("/getRestaurant")
def getRestaurant():
    try:
        restaurantID = request.args.get('RestaurantID')
        query = 'SELECT * FROM project.Restaurant WHERE RestaurantID = {}'.format(restaurantID)
        response = []
        result = engine.execute(query)
        if result.rowcount == 0:
            return jsonify("No restaurant found")
        row = result.first()
        restaurant = dict(row)
        response.append(restaurant)
        return jsonify(response)
    except Exception as e:
        print(e)
        return jsonify("Exception thrown")

# Get all restaurant orders in the DB
@app.route("/getRestaurantOrders")
def getRestaurantOrders():
    query = 'SELECT * FROM project.RestaurantOrder'
    response = []
    result = engine.execute(query)
    if result.rowcount == 0:
        return jsonify("No restaurant orders found")
    for row in result:
        restaurantOrder = dict(row)
        restaurantOrder['Time'] = str(restaurantOrder['Time'])
        response.append(restaurantOrder)
    return jsonify(response)

# Get all restaurant menus in  the DB
@app.route("/getMenus")
def getMenus():
    query = 'SELECT * FROM project.Menu'
    response = []
    result = engine.execute(query)
    if result.rowcount == 0:
        return jsonify("No menus found")
    for row in result:
        menu = dict(row)
        response.append(menu)
    return jsonify(response)

# Get all credit cards that belong to customer in the DB
@app.route("/getCreditCards")
def getCreditCards():
    customerUsername = request.args.get('CustomerUsername')
    query = 'SELECT * FROM project.CreditCard WHERE CustomerUsername = "{}";'.format(customerUsername)
    response = []
    result = engine.execute(query)
    if result.rowcount == 0:
        return jsonify("No credit cards found")
    for row in result:
        menu = dict(row)
        response.append(menu)
    return jsonify(response)

@app.route("/getMenu")
def getMenu():
  try:
    restaurantID = request.args.get('RestaurantID')
    query = 'SELECT * FROM project.Menu WHERE RestaurantID = {}'.format(restaurantID)
    response = []
    result = engine.execute(query)
    if result.rowcount == 0:
      return jsonify("Menu not found")
    row = result.first()
    menu = dict(row)

    menuItemsQuery = 'SELECT * FROM project.MenuItem WHERE MenuID = {}'.format(menu['MenuID'])
    menuItemsResult = engine.execute(menuItemsQuery)
    menuItems = []
    for itemRow in menuItemsResult:
      menuItem = dict(itemRow)
      menuItems.append(menuItem)

    menu['MenuItems'] = menuItems
    response.append(menu)
    return jsonify(response)
  except Exception as e:
      return jsonify("Exception thrown")

# Get all menu items in the DB
@app.route("/getMenuItems")
def getMenuItems():
    query = 'SELECT * FROM project.MenuItem'
    response = []
    result = engine.execute(query)
    if result.rowcount == 0:
        return jsonify("No menu items found")
    for row in result:
        menuItem = dict(row)
        response.append(menuItem)
    return jsonify(response)

# Get all ordered menu items from the DB
@app.route("/getOrderedMenuItems")
def getMOrderedenuItems():
    query = 'SELECT * FROM project.OrderedMenuItem'
    response = []
    result = engine.execute(query)
    if result.rowcount == 0:
        return jsonify("No ordered menu items found")
    for row in result:
        orderedMenuItem = dict(row)
        response.append(orderedMenuItem)
    return jsonify(response)

# Get array of all menu categories that belong ot this specific menu
@app.route("/getOrdersBetween")
def getOrdersBetween():
  customerUsername = request.args.get('CustomerUsername')
  dateFrom = request.args.get('DateFrom')
  dateTo = request.args.get('DateTo')
  query = 'SELECT * FROM project.RestaurantOrder WHERE CustomerUsername = "{}" AND Date >= "{}" AND Date <= "{}"'.format(customerUsername, dateFrom, dateTo)
  response = []
  result = engine.execute(query)
  if result.rowcount == 0:
      return jsonify("No orders found between these dates")
  for row in result:
      print(row)
      ordersBetween = dict(row)
      ordersBetween['Date'] = str(ordersBetween['Date'])
      ordersBetween['Time'] = str(ordersBetween['Time'])
      response.append(ordersBetween)
  return jsonify(response)

# Get orders between for restuarant owner
@app.route("/getOrdersBetweenRestaurant")
def getOrdersBetweenRestaurant():
  restaurantID = request.args.get('RestaurantID')
  dateFrom = request.args.get('DateFrom')
  dateTo = request.args.get('DateTo')
  query = 'SELECT * FROM project.RestaurantOrder WHERE restaurantID = {} AND Date >= "{}" AND Date <= "{}"'.format(restaurantID, dateFrom, dateTo)
  response = []
  result = engine.execute(query)
  if result.rowcount == 0:
      return jsonify("No orders found between these dates")
  for row in result:
      print(row)
      ordersBetween = dict(row)
      ordersBetween['Date'] = str(ordersBetween['Date'])
      ordersBetween['Time'] = str(ordersBetween['Time'])
      response.append(ordersBetween)
  return jsonify(response)
# ====================================== POST endpoints ====================================

# Given all the fields in a POST form, create a new customer
@app.route("/addCustomer", methods=["POST"])
def addCustomer():
    params = request.get_json()
    customerUsername = params['CustomerUsername']
    customerPassword = params['CustomerPassword']
    emailAddress = params['EmailAddress']
    phoneNumber = params['PhoneNumber']
    address = params['Address']
    query = 'INSERT INTO project.Customer VALUES ("{}", "{}", "{}", "{}", "{}");'.format(customerUsername, customerPassword, emailAddress, phoneNumber, address)
    try:
        result = engine.execute(query)
    except Exception as e:
        return jsonify("addCustomer: Error in backend database")
    return jsonify('Successfully added {} {} {} {} {}'.format(customerUsername, customerPassword, emailAddress, phoneNumber, address))

# Create a credit card
@app.route("/addCreditCard", methods=["POST"])
def addCreditCard():
    params = request.get_json()
    ccNo = params['CreditCardNumber']
    bAdd = params['BillingAddress']
    dExp = params['DateExpire']
    name = params['NameOnCard']
    cusUser = params['CustomerUsername']
    query = 'INSERT INTO project.CreditCard VALUES ("{}", "{}", "{}", "{}", "{}")'.format(ccNo, bAdd, dExp, name, cusUser)
    try:
        result = engine.execute(query)
    except Exception as e:
        return jsonify("addMenuItem: Error in backend database")
    return jsonify('Successfully added {} {} {} {} {})'.format(ccNo, bAdd, dExp, name, cusUser))

# Creates a MenuItem
@app.route("/addMenuItem", methods=["POST"])
def addMenuItem():
    params = request.get_json()
    name = params['Name']
    menuID = params['MenuID'] #int
    price = params['Price'] #real
    calories = params['Calories'] #int
    description = params['Description']
    query = 'INSERT INTO project.MenuItem (Name, MenuID, Price, Calories, Description) VALUES ("{}", {}, {}, {}, "{}")'.format(name, menuID, price, calories, description)
    try:
        result = engine.execute(query)
    except Exception as e:
        return jsonify("addMenuItem: Error in backend database")
    return jsonify('Successfully added {} {} {} {} {})'.format(name, menuID, price, calories, description))

# Creates an order
@app.route("/addOrder", methods=["POST"])
def addOrder():
    # Get a delivery person by joining both Biker and Driver
    deliveryPerson = engine.execute('SELECT dp.Name, dp.Address, b.MaximumDistance FROM project.DeliveryPerson dp\
    LEFT OUTER JOIN project.Biker b ON b.Name = dp.Name AND b.Address = dp.Address\
    LEFT OUTER JOIN project.Driver d ON d.Name = dp.Name AND d.Address = dp.Address\
    ORDER BY RAND() LIMIT 1;')
    deliveryPerson = deliveryPerson.first()
    deliveryPerson = dict(deliveryPerson)

    params = request.get_json()
    print(params)
    restaurant = params['RestaurantOrderedFrom']
    orderedItems = params["OrderedItems"]

    # RestaurantOrder params
    date = datetime.today().strftime('%Y-%m-%d')
    time = datetime.now().strftime('%H:%M')
    price = restaurant['Price'] #REAL
    distance = 0 #int
    if deliveryPerson["MaximumDistance"] is None:
        distance = random.randint(1,20)
    else:
        distance = deliveryPerson["MaximumDistance"]
    print(distance)
    tip = restaurant['TipAmount'] #REAL
    status = 'delivered'
    loc = restaurant['Location']
    user = restaurant['CustomerUsername']
    ccNo = restaurant['CreditCardNumber']
    deliveryName = deliveryPerson['Name']
    deliveryAddress = deliveryPerson['Address']
    restID = restaurant['RestaurantID']
    special = restaurant['SpecialInstructions']
    query = 'INSERT INTO project.RestaurantOrder (Date, Time, Price, Distance, TipAmount, Status, Location, CustomerUsername, CreditCardNumber, DeliveryPersonName, DeliveryPersonAddress, RestaurantID, SpecialInstructions)\
            VALUES ("{}", "{}", {}, {}, {}, "{}", "{}", "{}", "{}", "{}", "{}", {}, "{}");'.format(date, time, price, distance, tip, status, loc, user, ccNo, deliveryName, deliveryAddress, restID, special)
    print(query)
    print(orderedItems)
    try:
        engine.execute(query)
        idResult = engine.execute('SELECT Max(OrderID) FROM RestaurantOrder;')
        idResult = idResult.first()
        idResult = dict(idResult)
        orderID = idResult['Max(OrderID)']
        for item in orderedItems:
            print(item)
            print('------------------------------------------------')
            menuItemID = item['MenuItemID']
            quantity = item['Quantity']
            insertQuery = 'INSERT INTO project.OrderedMenuItem VALUES ({}, {}, {});'.format(orderID, menuItemID, quantity)
            print(insertQuery)
            print('===================')
            engine.execute(insertQuery)
    except Exception as e:
        print("error:")
        print(e)
        return jsonify("AddOrder: Backend Server error")
    return jsonify("AddOrder: success")


# ==================================== PUT endpoints =======================================

# Update a customer's information
@app.route("/updateCustomer", methods=["PUT"])
def updateCustomer():
    params = request.get_json()
    customerUsername = params['CustomerUsername']
    customerPassword = params['CustomerPassword']
    emailAddress = params['EmailAddress']
    phoneNumber = params['PhoneNumber']
    address = params['Address']
    query = 'UPDATE project.Customer SET CustomerPassword = "{}", EmailAddress = "{}", PhoneNumber = "{}", Address = "{}" WHERE CustomerUsername = "{}";'.format(customerPassword, emailAddress, phoneNumber, address, customerUsername)
    try:
        result = engine.execute(query)
    except Exception as e:
        return jsonify("updateCustomer: Error in backend database")
    return jsonify('Successfully updated Customer {} with {} {} {} {}'.format(customerUsername, customerPassword, emailAddress, phoneNumber, address))

# Update a restaurant's information
@app.route("/updateRestaurant", methods=["PUT"])
def updateRestaurant():
    params = request.get_json()
    restaurantID = params['RestaurantID'] #int
    name = params["Name"]
    location = params["Location"]
    category = params["Category"]
    deliveryFee = params["DeliveryFee"] #real
    restaurantPassword = params["RestaurantPassword"] #int
    query = 'UPDATE project.Restaurant SET Name = "{}", Location = "{}", Category = "{}", DeliveryFee = {}, RestaurantPassword = {} WHERE RestaurantID = {};'.format(name, location, category, deliveryFee, restaurantPassword, restaurantID)
    try:
        result = engine.execute(query)
    except Exception as e:
        return jsonify("updateRestaurant: Error in backend database")
    return jsonify('Successfully updated Restaurant {} with {} {} {} {} {}'.format(restaurantID, name, location, category, deliveryFee, restaurantPassword))

# Update a menu item
@app.route("/updateMenuItem", methods=["PUT"])
def updateMenuItem():
    params = request.get_json()
    menuItemID = params['MenuItemID'] #int
    name = params['Name']
    menuID = params['MenuID'] #int
    price = params['Price'] #int
    calories = params['Calories'] #int
    description = params['Description']
    query = 'UPDATE project.MenuItem SET Name = "{}", MenuID = {}, Price = {}, Calories = {}, Description = "{}" WHERE MenuItemID = {};'.format(name, menuID, price, calories, description, menuItemID)
    try:
        result = engine.execute(query)
    except Exception as e:
        return jsonify("updateMenuItem: Error in backend database")
    return jsonify('Successfully updated MenuItem {} with {} {} {} {} {}'.format(menuItemID, name, menuID, price, calories, description))

# Update credit card
@app.route("/updateCreditCard", methods=["PUT"])
def updateCreditCard():
    params = request.get_json()
    ccNo = params['CreditCardNumber']
    bAdd = params['BillingAddress']
    dExp = params['DateExpire']
    name = params['NameOnCard']
    cusUser = params['CustomerUsername']
    query = 'UPDATE project.CreditCard SET BillingAddress = "{}", DateExpire = "{}", NameOnCard = "{}", CustomerUsername = "{}" WHERE CreditCardNumber = "{}";'.format(bAdd, dExp, name, cusUser, ccNo)
    try:
        result = engine.execute(query)
    except Exception as e:
        return jsonify("updateCreditCard: Error in backend database")
    return jsonify('Successfully updated Credit Card {} with {} {} {} {}'.format(ccNo, bAdd, dExp, name, cusUser))

# Delete menu item
@app.route("/deleteMenuItem", methods=["DELETE"])
def deleteMenuItem():
    try:
        menuItemID = request.args.get('MenuItemID')
        # menuItemID = parseInt(menuItemID)
        print(menuItemID)
        query = 'DELETE FROM project.MenuItem WHERE MenuItemID = {}'.format(menuItemID)
        print(query)
        result = engine.execute(query)
    except Exception as e:
        return jsonify("deleteMenuItem: Error")
    return jsonify('Successfully deleted menu item {}'.format(menuItemID))
if __name__ == '__main__':
    app.run(debug=True)

