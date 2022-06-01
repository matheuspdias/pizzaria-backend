 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
    public async ping ({ request, response }: HttpContextContract) {
        return response.send({ pong: 'true' })
    }
}
