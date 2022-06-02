import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import { DateTime } from 'luxon'

export default class CategoriesController {
    public async index ({ request, response }: HttpContextContract) {

        //get categories with products
        const categories = await Category.query().whereNull('deleted_at')

        return response.json(categories)
    }

    public async store ({ request, response }: HttpContextContract) {
        const data = request.only(['name'])
        
        if (!data.name) {
            return response.status(400).json({
                error: 'Name is required'
            })
        }

        const category = await Category.create(data)

        return response.json(category)
    }

    public async show ({ params, request, response }: HttpContextContract) {
        const category = await Category.query().where('id', params.id).whereNull('deleted_at').first()

        if(!category) {
            return response.status(404).json({
                error: 'Category not found'
            })
        }

        return response.json(category)
    }

    public async update ({ params, request, response }: HttpContextContract) {
        const category = await Category.findBy('id', params.id)

        if(!category) {
            return response.status(404).json({
                error: 'Category not found'
            })
        }

        const data = request.only(['name'])

        if (!data.name) {
            return response.status(400).json({
                error: 'Name is required'
            })
        }

        category.merge(data)
        await category.save()

        return response.json(category)
    }

    public async destroy ({ params, request, response }: HttpContextContract) {
        const category = await Category.find(params.id)

        //soft delete
        if(category) {
            category.deletedAt = DateTime.utc()
            await category.save()
        }

        return response.json({
            success: true,
        })
    }
}
