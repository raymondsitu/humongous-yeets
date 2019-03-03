from flask import Flask, request, jsonify
from sqlalchemy import *

app = Flask(__name__)

engine = create_engine('mysql://root@localhost')
connection = engine.connect()
engine.execute('USE project')

@app.route("/")
def hello():
    return "poggers"

@app.route("/getCustomers")
def getCustomers():
    query = 'SELECT * FROM Customer;'
    response = []
    result = engine.execute(query)
    for row in result:
        customer = dict()
        customer['CustomerID'] = row[0]
        customer['EmailAddress'] = row[1]
        customer['PhoneNumber'] = row[2]
        customer['Address'] = row[3]
        response.append(customer)
    return jsonify(response)

@app.route("/addCustomer", methods=["PUT"])
def addCustomer():
    customerID = request.form['CustomerID']
    emailAddress = request.form['EmailAddress']
    phoneNumber = request.form['PhoneNumber']
    address = request.form['Address']
    query = 'INSERT INTO Customer VALUES ({}, "{}", "{}", "{}");'.format(customerID, emailAddress, phoneNumber, address)
    result = engine.execute(query)
    return 'successfully added {} {} {} {}'.format(customerID, emailAddress, phoneNumber, address)

if __name__ == '__main__':
    app.run(debug=True)