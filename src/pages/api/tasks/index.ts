
import { NextApiRequest, NextApiResponse } from 'next'
export default function tasks(req: NextApiRequest, res: NextApiResponse) {

    const { method } = req

    switch (method) {
        case 'GET':
            return res.status(200).json('getting tasks')

        case 'POST':
            return res.status(200).json('creating tasks')

        default:
            return res.status(400).json('invalid method')
    }
}