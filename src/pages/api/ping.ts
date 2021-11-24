
import { NextApiRequest, NextApiResponse } from 'next'
import { conn } from 'src/utils/database'
type Data = {
  message: string,
  time: string
}
export default async function index(req: NextApiRequest, res: NextApiResponse<Data>) {
  const respose = await conn.query('SELECT NOW()')

  res.json({ message: 'pong', time: respose.rows[0].now })
}