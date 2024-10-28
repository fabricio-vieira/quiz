import Estatisticas from '@/components/Estatisticas'
import styles from '../styles/Resultado.module.css'
import { useRouter } from 'next/router'
import { Botao } from '@/components/Botao'

export default function resultado() {
    const router = useRouter()

    const total = parseInt(router.query.total as string, 10)
    const certas = parseInt(router.query.certas as string, 10)
    const percentual = Math.round((certas / total) * 100)

    return (
        <div className={styles.resultado}>
            <h1>Resultado Final</h1>
            <div style={{ display: 'flex' }}>
                <Estatisticas texto="Perguntas" valor={total} />
                <Estatisticas texto="Certas" valor={certas} corFundo='#9CD2A4' />
                <Estatisticas texto="Percentual" valor={`${percentual}%`} corFundo='#DE6A33' />
            </div>
            <Botao href={"/"} texto="Tentar Novamente" />
        </div>
    )
}