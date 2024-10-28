import Questionario from "@/components/Questionario";
import QuestaoModel from "@/model/questao";
import RespostaModel from "@/model/resposta";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const questaoModelo = new QuestaoModel(1, 'Qual é o Melhor time do mundo?', [
  RespostaModel.errada('Flamengo'),
  RespostaModel.errada('Barcelona'),
  RespostaModel.errada('Real Madrid'),
  RespostaModel.certa('Palmeiras'),
], false)

const BASE_URL = 'http://localhost:3000/api'

export default function Home() {
  const router = useRouter()

  const [questao, setQuestao] = useState<QuestaoModel>(questaoModelo)
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  async function carregarIdsDasQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionarios/conhecimentos`)
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }

  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const json = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(novaQuestao)
  }


  useEffect(() => {
    carregarIdsDasQuestoes()
  }, [])


  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes])


  function tempoEsgotado() {
    if (questao.naoRespondida) {
      setQuestao(questao.responderQuestao(-1))
    }
  }

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }

  function idProximaPergunta() {
    const proximoIndice = questao.id && idsDasQuestoes.indexOf(questao.id) + 1
    if (proximoIndice) {
      return idsDasQuestoes[proximoIndice]
    } else {
      return undefined
    }
  }

  function irPraProximoPasso() {
    const proximoId = idProximaPergunta()
    proximoId ? irPraProximaQuestao(proximoId) : finalizar()
  }

  function irPraProximaQuestao(proximoId: number) {
    carregarQuestao(proximoId)
  }

  function finalizar() {
    router.push({
      pathname: "/resultado",
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    })
  }


  return questao ? (
    <Questionario
      questao={questao}
      ultima={idProximaPergunta() === undefined}
      questaoRespondida={questaoRespondida}
      irPraProximoPasso={irPraProximoPasso}
    />
  ) : false
}
