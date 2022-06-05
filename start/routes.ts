/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout')

Route.group(() => {
    Route.get('/ping', 'HomeController.ping')

    //Route group user
    Route.group(() => {
        Route.get('/me', 'UsersController.me')
    }).prefix('/users')

    //Route group category
    Route.resource('/categories', 'CategoriesController')

    //Route group product
    Route.resource('/products', 'ProductsController')
}).prefix('/api/v1').middleware('auth:api')
