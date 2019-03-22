from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import *

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
    query = 'SELECT * FROM Customer;'
    response = []
    result = engine.execute(query)
    if result.rowcount == 0:
        return "No customers found"
    for row in result:
        customer = dict(row)
        response.append(customer)
    return jsonify(response)

# Given a username and password as arguments in a get request, gets a single customer object
@app.route("/login")
def login():
    username = request.args.get('username')
    password = request.args.get('password')
    query = 'SELECT * FROM Customer WHERE CustomerUsername = "{}" AND CustomerPassword = "{}"'.format(username, password)
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
    query = 'SELECT * FROM Restaurant'
    response = []
    result = engine.execute(query)
    if result.rowcount == 0:
        return "No restaurants found"
    for row in result:
        restaurant = dict(row)
        response.append(restaurant)
    return jsonify(response)

# Given a name, gets all restaurants in the DB that have the name in their name
@app.route("/getRestaurantsFiltered")
def getRestaurantsFiltered():
    restaurantName = request.args.get('Name')
    query = "SELECT * FROM Restaurant WHERE Name LIKE '%%{}%%'".format(restaurantName)
    response = []
    try:
        result = engine.execute(query)
        if result.rowcount == 0:
            return "No restaurants found"
        for row in result:
            restaurant = dict(row)
            response.append(restaurant)
        return jsonify(response)
    except Exception as e:
        print(e)
        return "Exception thrown"

# Given the restaurant ID, get a single restaurant (wrapped in an array)
@app.route("/getRestaurant")
def getRestaurant():
    try:
        restaurantID = request.args.get('RestaurantID')
        query = 'SELECT * FROM Restaurant WHERE RestaurantID = {}'.format(restaurantID)
        response = []
        result = engine.execute(query)
        if result.rowcount == 0:
            return "Restaurant not found"
        row = result.first()
        restaurant = dict(row)
        response.append(restaurant)
        return jsonify(response)
    except Exception as e:
        print(e)
        return "Exception thrown"

# Get all restaurant orders in the DB
@app.route("/getRestaurantOrders")
def getRestaurantOrders():
    query = 'SELECT * FROM RestaurantOrder'
    response = []
    result = engine.execute(query)
    if result.rowcount == 0:
        return "No restaurant orders found"
    for row in result:
        restaurantOrder = dict(row)
        restaurantOrder['Time'] = str(restaurantOrder['Time'])
        response.append(restaurantOrder)
    return jsonify(response)

# Get all restaurant menus in  the DB
@app.route("/getMenus")
def getMenus():
    query = 'SELECT * FROM Menu'
    response = []
    result = engine.execute(query)
    if result.rowcount == 0:
        return "No menus found"
    for row in result:
        menu = dict(row)
        response.append(menu)
    return jsonify(response)

@app.route("/getMenu")
def getMenu():
  try:
    restaurantID = request.args.get('RestaurantID')
    query = 'SELECT * FROM Menu WHERE RestaurantID = {}'.format(restaurantID)
    response = []
    result = engine.execute(query)
    if result.rowcount == 0:
      return "Menu not found"
    row = result.first()
    menu = dict(row)

    menuItemsQuery = 'SELECT * FROM MenuItem WHERE MenuID = {}'.format(menu['MenuID'])
    menuItemsResult = engine.execute(menuItemsQuery)
    menuItems = []
    for itemRow in menuItemsResult:
      menuItem = dict(itemRow)
      menuItems.append(menuItem)

    menu['MenuItems'] = menuItems
    response.append(menu)
    return jsonify(response)
  except Exception as e:
    return "Exception thrown"

# Get all menu items in the DB
@app.route("/getMenuItems")
def getMenuItems():
    query = 'SELECT * FROM MenuItem'
    response = []
    result = engine.execute(query)
    if result.rowcount == 0:
        return "No menu items found"
    for row in result:
        menuItem = dict(row)
        response.append(menuItem)
    return jsonify(response)

#Get all ordered menu items from the DB
@app.route("/getOrderedMenuItems")
def getMOrderedenuItems():
    query = 'SELECT * FROM OrderedMenuItem'
    response = []
    result = engine.execute(query)
    if result.rowcount == 0:
        return "No ordered menu items found"
    for row in result:
        orderedMenuItem = dict(row)
        response.append(orderedMenuItem)
    return jsonify(response)

# Given all the fields in a POST form, create a new customer
@app.route("/addCustomer", methods=["POST"])
def addCustomer():
    customerUsername = request.form['CustomerUsername']
    customerPassword = request.form['CustomerPassword']
    emailAddress = request.form['EmailAddress']
    phoneNumber = request.form['PhoneNumber']
    address = request.form['Address']
    query = 'INSERT INTO Customer VALUES ("{}", "{}", "{}", "{}", "{}");'.format(customerUsername, customerPassword, emailAddress, phoneNumber, address)
    try:
        result = engine.execute(query)
    except Exception as e:
        return "Error in backend database"
    return 'Successfully added {} {} {} {} {}'.format(customerUsername, customerPassword, emailAddress, phoneNumber, address)

if __name__ == '__main__':
    app.run(debug=True)
