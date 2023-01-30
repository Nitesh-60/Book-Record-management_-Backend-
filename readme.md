# book-record-management-backend-project

This is a Book record Management API Backend for management of records and books

# Routes and Endpoints

## /users
1. GET: Get list of all user ✅
2. POST: Create a new user ✅

## /users/{id}
1. GET: Get the user by id ✅
2. PUT: Update the user by id ✅
3. DELETE: Delete the user by id --> (check if he/she still has issued book) --> (Is there any fine to be paid)

## /users/subscription-details/{id}
GET: Get user subscription details
1. Date of subscription
2. Valid till
3. Fine if any

## /books
1. GET: Get all books ✅
2. POST: Create/Add a new book ✅

## /books/{id}
1. GET: Get a book by id ✅
2. PUT: Update a book by id ✅

## /books/issued/books
GET: Get all issued books ✅

## /books/issued/withFine
GET: all issued books with fine

# Subscription Types
1. Basic (3 months)
2. Standard (6 months)
3. Premium (12 months)

if the subscription date is 01/08/22
and subscription type is Standard
the valid till date will be 01/02/23

if he has an issued book and the issued book is to be returned at 01/01/23
and he missed the date of return, then he gets a fine of Rs. 100

if he has an issued book and the issued book is to be returned at 01/01/23
if he missed the date of return and its subscription also expired then he will get a fine of Rs. 100