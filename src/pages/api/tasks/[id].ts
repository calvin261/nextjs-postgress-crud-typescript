
import { NextApiRequest, NextApiResponse } from 'next'
export default function id(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req

    switch (method) {
        case 'GET':
            return res.status(200).json(' getting a unique task ')

        case 'PUT':
            return res.status(200).json('updating a unique task')

        case 'DELETE':
            return res.status(200).json('deleting a unique task')

        default:
            return res.status(400).json('invalid method')
    }
}