import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoriesController {
    public async index ({ request, response }: HttpContextContract) {
        const categories = await Category.all()

        return response.json(categories)
    }

    public async store ({ request, response }: HttpContextContract) {
        const data = request.only(['name'])

        const category = await Category.create(data)

        return response.json(category)
    }

    public async show ({ params, request, response }: HttpContextContract) {
        const category = await Category.findOrFail(params.id)

        return response.json(category)
    }

    public async update ({ params, request, response }: HttpContextContract) {
        const category = await Category.findOrFail(params.id)
        const data = request.only(['name'])

        category.merge(data)
        await category.save()

        return response.json(category)
    }

    public async destroy ({ params, request, response }: HttpContextContract) {
        const category = await Category.findOrFail(params.id)

        await category.delete()

        return response.json({
            success: true,
        })
    }
}
