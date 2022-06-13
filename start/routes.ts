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
    //Route group user
    Route.group(() => {
        Route.get('/me', 'UsersController.me')
    }).prefix('/users')

    //Route group category
    Route.resource('/categories', 'CategoriesController')

    //Route group product
    Route.resource('/products', 'ProductsController')

    //Route group orders
    Route.group(() => {
        Route.post('/', 'OrdersController.store')
        Route.get('/', 'OrdersController.index')
        Route.get('/:id', 'OrdersController.show')
        Route.delete('/remove', 'OrdersController.remove')
        Route.delete('/:id', 'OrdersController.destroy')
        Route.post('/add', 'OrdersController.add')        
        Route.patch('/send', 'OrdersController.sendOrder')
        Route.patch('/finish', 'OrdersController.finishOrder')
    }).prefix('/orders')
    
}).prefix('/api/v1').middleware('auth:api')

Route.get('/', ({ response }) => {
    return response.json({
        message: 'Bem vindo a API.'
    })
})
Route.get('/ping', 'HomeController.ping')
