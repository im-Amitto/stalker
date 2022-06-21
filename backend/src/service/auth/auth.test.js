import request from 'supertest'
import makeApp from '../../index.js'
import devConfig from '../../config/dev.config';
import db from '../../models/index.js'
import { getfakeUserName, getFakePassword, getFakeEmail } from '../../utils/faker.js'

const app = await makeApp(devConfig);

let userName = getfakeUserName();
let password = getFakePassword();
let email = getFakeEmail();

afterAll(async () => {
  await db.mongoose.connection.close();
});

describe("POST /api/auth/signup", () => {
  let endPoint = "/api/auth/signup"
  describe("given a username, password and email", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post(endPoint).send({
        username: userName,
        password: password,
        email: email
      })
      expect(response.statusCode).toBe(200)
    })

    test("should respond with a user already exist", async () => {
      const response = await request(app).post(endPoint).send({
        username: userName,
        password: password,
        email: email
      })
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe("Failed! Username is already in use!")
    })

    test("should specify json in the content type header", async () => {
      const response = await request(app).post(endPoint).send({
        username: getfakeUserName(),
        password: getFakePassword(),
        email: getFakeEmail()
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
  })

  describe("when the username and password is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        { username: "username" },
        { password: "password" },
        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).post(endPoint).send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })
})

describe("POST /api/auth/signin", () => {
  let endPoint = "/api/auth/signin"
  describe("given a username and password", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post(endPoint).send({
        username: userName,
        password: password,
      })
      expect(response.statusCode).toBe(200)
    })

    test("should respond with a unauthorised user", async () => {
      const response = await request(app).post(endPoint).send({
        username: userName,
        password: getFakePassword(),
      })
      expect(response.statusCode).toBe(401)
      expect(response.body.message).toBe("Invalid Password!")
    })

    test("should specify json in the content type header", async () => {
      const response = await request(app).post(endPoint).send({
        username: userName,
        password: password,
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
  })

  describe("when the username and password is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        { username: userName },
        { password: password },
        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).post(endPoint).send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })

  test("should respond with a json object containg the user id", async () => {
    for (let i = 0; i < 10; i++) {
      const response = await request(app).post(endPoint).send({
        username: userName,
        password: password,
      })
      expect(response.body.id).toBeDefined()
      expect(response.body.accessToken).toBeDefined()
    }
  })
})