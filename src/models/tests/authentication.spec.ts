import UserModel from '../user.model'
import db from '../../database'
import User from '../../types/user.types'

const userModel = new UserModel()

describe('Authentication Module', () => {
  describe('Test methods exists', () => {
    it('should have an Authenticate User method', () => {
      expect(userModel.authenticate).toBeDefined()
    })
  })

  describe('Test Authentication Logic', () => {
    const user = {
      email: 'test@test.com',
      username: 'testUser',
      firstname: 'Test',
      lastname: 'User',
      password: 'test123',
    } as User

    beforeAll(async () => {
      const createdUser = await userModel.create(user)
      user.id = createdUser.id
    })

    afterAll(async () => {
      const connection = await db.connect()
      // if you are not using uuid u need to add `\nALTER SEQUENCE users_id_seq RESTART WITH 1;`
      const sql = 'DELETE FROM users;'
      await connection.query(sql)
      connection.release()
    })

    it('Authenticate method should return the authenticated user', async () => {
      const authenticatedUser = await userModel.authenticate(
        user.username,
        user.password as string
      )
      expect(authenticatedUser?.email).toBe(user.email)
      expect(authenticatedUser?.username).toBe(user.username)
      expect(authenticatedUser?.firstname).toBe(user.firstname)
      expect(authenticatedUser?.lastname).toBe(user.lastname)
    })

    it('Authenticate method should return null for wrong credentials', async () => {
      const authenticatedUser = await userModel.authenticate(
        'fake@email.com',
        'fakepassword'
      )
      expect(authenticatedUser).toBe(null)
    })
  })
})