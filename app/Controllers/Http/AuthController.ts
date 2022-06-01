 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    public async login ({ request, auth, response }: HttpContextContract) {
        const { email, password } = request.all()
        
        try {
            const token = await auth.use('api').attempt(email, password)
            return token
        } catch {
            return response.status(401).send({
                success: false,
                message: 'Usuário ou senha inválidos'
            })
        }
    }

    public async logout ({ auth, response }: HttpContextContract) {
        await auth.use('api').revoke()
        
        return response.status(200).send({
            success: true,
        })
    }
}
