import type { NextApiRequest, NextApiResponse } from "next";
import questoes from "../../bancoDeQuestoes";
import desordenar from "@/functions/desordenar";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const ids = questoes.map(quest => quest.id)
    return res.status(200).json(desordenar(ids))
}