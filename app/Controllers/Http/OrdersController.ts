import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Item from 'App/Models/Item'
import Order from 'App/Models/Order'
import Product from 'App/Models/Product'
import { DateTime } from 'luxon'

export default class OrdersController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['table', 'name'])

    const orderSchema = schema.create({
      table: schema.number(),
      name: schema.string.optional()
    })
    
    await request.validate({schema: orderSchema})

    const order = await Order.create(data)

    if (!order) {
      return response.status(400).json({
        error: 'Problema ao criar o pedido'
      })
    }

    return response.json({
      status: 'Pedido criado com sucesso',
      order: order
    })
  }

  public async add({ request, response }: HttpContextContract) {
    const data = request.only(['order_id', 'product_id', 'amount'])

    const orderSchema = schema.create({
      order_id: schema.number(),
      product_id: schema.number(),
      amount: schema.number()
    })

    await request.validate({schema: orderSchema})

    const orderExist = await Order.query().where('id', data.order_id).whereNull('deleted_at').first()
    if (!orderExist) {
      return response.status(400).json({
        error: 'Pedido não encontrado'
      })
    }

    const product = await Product.query().where('id', data.product_id).whereNull('deleted_at').first()

    if (!product) {
      return response.status(400).json({
        error: 'Produto não encontrado'
      })
    }

    const orderItem = await Item.create({
      order_id: data.order_id,
      product_id: data.product_id,
      amount: data.amount
    })

    return response.json({
      status: 'Item adicionado com sucesso',
      item: orderItem
    })
  }

  public async remove({ request, response, params }: HttpContextContract) {
    const item = await Item.query().where('id', params.id).whereNull('deleted_at').first()

    if (item) {
      item.deleted_at = DateTime.utc()
      await item.save()
    }

    return response.json({
      status: 'Item excluído com sucesso'
    })
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ params ,request, response }: HttpContextContract) {
    const order_id = params.id
    const order = await Order.findBy('id', order_id)

    if (order) {
      order.deleted_at = DateTime.utc()
      await order.save()
    }

    return response.json({
      status: 'Pedido excluído com sucesso'
    })
  }
}
