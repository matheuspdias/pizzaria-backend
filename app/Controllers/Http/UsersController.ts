import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
    public async me ({ request, response, auth }: HttpContextContract) {
        if (auth.user) {
            return response.json({
                id: auth.user.id,
                name: auth.user.name ,
                email: auth.user.email,
            })
        }
    }
}
