import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'

export default class CategoryAndProducts extends BaseSeeder {
  public async run () {
    const categories = [
        {
            name: 'Pizzas'
        },
        {
            name: 'Bebidas'
        },
        {
            name: 'Sobremesas'
        },
    ]

    const products = [
        //pizzas
        {
            category_id: 1,
            name: 'Pizza de Mussarela',
            description: 'Pizza de Mussarela',
            price: '40',
        },
        {
            category_id: 1,
            name: 'Pizza de Calabresa',
            description: 'Pizza de Calabresa',
            price: '30',
        },
        {
            category_id: 1,
            name: 'Pizza de Frango',
            description: 'Pizza de Frango',
            price: '35',
        },

        // bebidas
        {
            category_id: 2,
            name: 'Coca-Cola',
            description: 'Coca-Cola',
            price: '10',
        },
        {
            category_id: 2,
            name: 'Fanta',
            description: 'Fanta',
            price: '8',
        },
        {
            category_id: 2,
            name: 'Guaraná',
            description: 'Guaraná',
            price: '7',
        },

        // sobremesas
        {
            category_id: 3,
            name: 'Brigadeiro',
            description: 'Brigadeiro',
            price: '12',
        },
        {
            category_id: 3,
            name: 'Sorvete',
            description: 'Sorvete',
            price: '12',
        },
        {
            category_id: 3,
            name: 'Torta',
            description: 'Torta',
            price: '25',
        }
    ]

    await Category.createMany(categories)
    await Product.createMany(products)
  }
}
