import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Order from 'App/Models/Order'
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
    
    const validate = await request.validate({schema: orderSchema})

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
