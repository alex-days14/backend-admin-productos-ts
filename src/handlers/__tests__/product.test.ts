import request from "supertest";
import server from "../../server";

describe('POST /api/products', () => {
    it('should return validation errors', async () => {
        const response = await request(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBeLessThan(400)
        expect(response.status).not.toBeGreaterThan(400)
        expect(response.body.errors).not.toHaveLength(2)
    });

    it('should valid price is not empty', async () => {
        const response = await request(server).post('/api/products').send({name: "NUMERIC TEST"})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(3)

        expect(response.status).not.toBeLessThan(400)
        expect(response.status).not.toBeGreaterThan(400)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should valid price is numeric', async () => {
        const response = await request(server).post('/api/products').send({name: "NUMERIC TEST", price:"p"})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBeLessThan(400)
        expect(response.status).not.toBeGreaterThan(400)
        expect(response.body.errors).not.toHaveLength(1)
    })

    it('should valid price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({name: "NUMERIC TEST", price: -1})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBeLessThan(400)
        expect(response.status).not.toBeGreaterThan(400)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should create new product', async () => {
        const response = await request(server).post('/api/products').send({name: 'Mochila TEST', price: 799})

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBeGreaterThan(201)
        expect(response.body).not.toHaveProperty('error')
    })
})

describe("GET /api/products", () => {
    it('should check if /api/products url works', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)

        expect(response.status).not.toBeGreaterThan(200)
    })

    it("should display all products", async () => {
        const response = await request(server).get('/api/products')
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')

        expect(response.body).not.toHaveProperty('error')
    })
})

describe("GET /api/products/:id", () => {

    it("should validate url id param is numeric", async () => {
        const response = await request(server).get('/api/products/p')
        expect(response.status).toBe(400)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    it("should return 404 for non-existent product", async () => {
        const productId = 0
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it("should return product by id", async () => {
        const response = await request(server).get('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')

        expect(response.body).not.toHaveProperty('error')
    })
})

describe('PUT /api/products/:id', () => {
    const nonExistent = 0
    const productId = 1
    it("should return validation errors when empty payload and non-valid ID", async () => {
        const response = await request(server).put('/api/products/p').send({})
        expect(response.status).toBe(400)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(8)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    it("should return validation errors when empty payload and valid ID", async () => {
        const response = await request(server).put(`/api/products/${nonExistent}`).send({})
        expect(response.status).toBe(400)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(7)
    })

    it('should valid name is not empty', async () => {
        const response = await request(server).put(`/api/products/1`).send({price: 1200})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBeLessThan(400)
        expect(response.status).not.toBeGreaterThan(400)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should valid name is string', async () => {
        const response = await request(server).put(`/api/products/1`).send({name: 0, price:1200})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(3)

        expect(response.status).not.toBeLessThan(400)
        expect(response.status).not.toBeGreaterThan(400)
        expect(response.body.errors).not.toHaveLength(1)
    })

    it('should valid price is not empty', async () => {
        const response = await request(server).put(`/api/products/1`).send({name: "EMPTY TEST"})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBeLessThan(400)
        expect(response.status).not.toBeGreaterThan(400)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should valid price is numeric', async () => {
        const response = await request(server).put(`/api/products/1`).send({name: "NUMERIC TEST", price:"p"})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBeLessThan(400)
        expect(response.status).not.toBeGreaterThan(400)
        expect(response.body.errors).not.toHaveLength(1)
    })

    it('should valid price is greater than 0', async () => {
        const response = await request(server).put(`/api/products/1`).send({name: "NUMERIC TEST", price: -1})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(3)

        expect(response.status).not.toBeLessThan(400)
        expect(response.status).not.toBeGreaterThan(400)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it("should return 404 for non-existent product", async () => {
        
        const response = await request(server).put(`/api/products/${nonExistent}`).send({name: 'Mochila TEST ACT', price: 2000, availability: true})
        expect(response.status).toBe(404)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it("should update the product", async () => {
        const response = await request(server).put(`/api/products/${productId}`).send({name: 'Mochila TEST ACT', price: 2000, availability: true})
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toBeTruthy()
        expect(response.body.data.id).toEqual(productId)
    })
})

describe('PATCH /api/products/:id', () =>{
    const nonExistent = 0
    const productId = 1
    it("should return validation errors when non-valid ID", async () => {
        const response = await request(server).patch('/api/products/p')
        expect(response.status).toBe(400)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    it("should return 404 response when non-existent product", async () => {
        const response = await request(server).patch(`/api/products/${nonExistent}`)
        expect(response.status).toBe(404)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it('should return product when its availability changes', async () => {
        const response = await request(server).patch(`/api/products/${productId}`)
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('availability')
    })
})

describe('DELETE /api/products/:id', () => {
    const nonExistent = 0
    const productId = 1
    it("should return validation errors when non-valid ID", async () => {
        const response = await request(server).delete('/api/products/p')
        expect(response.status).toBe(400)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    it("should return 404 response when non-existent product", async () => {
        const response = await request(server).delete(`/api/products/${nonExistent}`)
        expect(response.status).toBe(404)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    it('should delete product from db', async () => {
        const response = await request(server).delete(`/api/products/${productId}`)
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toBe('Producto eliminado')
    })
})