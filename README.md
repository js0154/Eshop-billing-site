# Eshop-billing-site  


Packages:-
Express
mongoose
jwt
body-parser
mongoose


  User related request:-
POST     /api/eshop/users/register                                      (first Register)
POST     /api/eshop/users/login                                         (Then Login)
GET      /api/eshop/users                                               (admin only)
GET      /api/eshop/users/:id                                           (admin only)
POST     /api/eshop/users                                               (admin only)

  Products related requests:-
GET      /api/eshop/products
GET      /api/eshop/products/:id
POST     /api/eshop/products                                            (admin only)
PUT      /api/eshop/products/:id                                        (admin only)
Get      /api/eshop/products/get/featured

Every Product is divided into 2 catergories:-                           (Its a required field)
1) Products
2) Services

 Categories related request:-
GET      /api/eshop/categories                                          
GET      /api/eshop/categories/:id
POST     /api/eshop/categories                                          (admin only)
PUT      /api/eshop/categories/:id                                      (admin only)

  Order related request:-
GET      /api/eshop/orders
GET      /api/eshop/orders/:id
POST     /api/eshop/orders
PUT      /api/eshop/orders/:id                                          (admin only)
DELETE   /api/eshop/orders/:id
GET:     /api/v1/orders/get/userorders/:userid

The Tax is calculated based on given conditions in the problem statement and added to the total price thus giving us the exact value of the cart.


  
