import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    //create multiple users
    const users = [
      {
        name: 'Matheus',
        email: 'matheus@stargrid.pro',
        password: 'stargrid'
      },
      {
        name: 'Tiago',
        email: 'tiago@stargrid.pro',
        password: 'stargrid'
      },
      {
        name: 'Alan',
        email: 'alan@stargrid.pro',
        password: 'stargrid',
      }
    ]

    await User.createMany(users)
  }
}
