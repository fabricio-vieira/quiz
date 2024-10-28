import styles from '../styles/Temporizador.module.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

interface TemporizadorProps {
    key: any
    duracao: number
    tempoEsgotado: () => void
}

export default function Temporizador(props: TemporizadorProps) {

    return (
        <div className={styles.temporizador} >
            <CountdownCircleTimer
                duration={props.duracao}
                size={110}
                isPlaying
                onComplete={props.tempoEsgotado}
                colors={['#004777', '#F7B801', '#FE5F2F', '#A30000']}
                colorsTime={[10, 6, 3, 0]}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
    )
}