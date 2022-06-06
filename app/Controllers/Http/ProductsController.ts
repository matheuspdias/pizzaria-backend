import Application from '@ioc:Adonis/Core/Application';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index({ request, response }: HttpContextContract) {
    const products = await Product.query()
      .whereNull('deleted_at')
      .preload('category', (category) => {
        category.select('id', 'name')
      })

      products.map((product) => {
        if (product.banner) {
          product.banner = Application.tmpPath('uploads') + '/' + product.banner
        }
      })

    return response.json(products)
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['category_id', 'name', 'description', 'price'])
    const banner = request.file('banner', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    if (!banner?.isValid) {
      return response.status(400).json(
        banner?.errors
      )
    }

    if (banner) {
      await banner.moveToDisk('./')
    }

    const product = await Product.create({
      ...data,
      banner: banner.fileName,
    })

    return response.json(product)

  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
