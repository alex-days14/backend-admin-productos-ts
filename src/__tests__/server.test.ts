import { connectDB } from "../server";
import db from "../config/db";

type Msg = {
    msg: string
}

/* describe('GET to /api', () => {
    it('should send back a JSON response', async () => {
        const response = await request(server).get('/api');
        expect(response.status).toBe(200)
        expect(response.header['content-type']).toMatch(/json/)
        expect(response.body.msg).toBe('Desde API')

        expect(response.status).not.toBe(404 || 400)
        expect(response.body.msg).not.toBe('desde api')
        expect(response.body).not.toMatchObject<Msg>({msg: ''})
    })
}) */

jest.mock('../config/db')
describe('connectDB', () => {
    it('should handle DB connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error("HUBO UN ERROR AL CONECTAR A LA DB"))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("HUBO UN ERROR AL CONECTAR A LA DB"))
    })
})