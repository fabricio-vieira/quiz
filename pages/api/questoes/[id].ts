// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import questoes from "../bancoDeQuestoes";



export default function handler(req: NextApiRequest, res: NextApiResponse,) {
    const idSelecionado = req.query.id ? +req.query.id : 0

    const temQuestao = questoes.filter(questao => questao.id === idSelecionado)

    if (temQuestao.length === 1) {
        const questaoSelecionada = temQuestao[0].embaralharRespostas()
        return res.status(200).json(questaoSelecionada.paraObjeto())
    }
    else {
        return res.status(204).send('OK')
    }
}
