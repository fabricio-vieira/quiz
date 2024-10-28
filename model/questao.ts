import desordenar from '@/functions/desordenar'
import RespostaModel from './resposta'

export default class QuestaoModel {
    #id?: number | undefined
    #enunciado: string
    #respostas: RespostaModel[]
    #acertou: boolean
    // #respondida: boolean

    constructor(id: number, enunciado: string, respostas: RespostaModel[], acertou: boolean) {
        this.#id = id,
            this.#enunciado = enunciado,
            this.#respostas = respostas,
            this.#acertou = acertou
    }

    get id() {
        return this.#id
    }

    get enunciado() {
        return this.#enunciado
    }

    get respostas() {
        return this.#respostas
    }

    get acertou() {
        return this.#acertou
    }

    get naoRespondida() {
        return !this.respondida
    }

    get respondida() {
        for (let resposta of this.#respostas) {
            if (resposta.revelada) return true
        }
        return false

    }

    responderQuestao(indice: number): QuestaoModel {
        const acertou = this.respostas[indice]?.certa
        const respostas = this.respostas.map((resposta, ind) => {
            const respostaSelecionada = indice === ind
            const deveRevelar = respostaSelecionada
            // const deveRevelar = respostaSelecionada || resposta.certa
            return deveRevelar ? resposta.revelar() : resposta
        })
        const id = this.#id ? this.#id : 0
        return new QuestaoModel(id, this.enunciado, respostas, acertou)
    }

    embaralharRespostas(): QuestaoModel {
        let respostasAleatorias = desordenar(this.#respostas)
        const id = this.#id ? this.#id : 0
        return new QuestaoModel(id, this.#enunciado, respostasAleatorias, this.#acertou)
    }

    static criarUsandoObjeto(obj: QuestaoModel): QuestaoModel {
        const id = obj.id ? obj.id : 0
        const respostas = obj.respostas.map(resp => RespostaModel.criarUsandoObjeto(resp))
        return new QuestaoModel(id, obj.enunciado, respostas, obj.acertou)
    }

    paraObjeto() {
        return {
            id: this.#id,
            enunciado: this.#enunciado,
            acertou: this.#acertou,
            respondida: this.respondida,
            respostas: this.#respostas.map(resposta => resposta.paraObjeto())
        }
    }
}