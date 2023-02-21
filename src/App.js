import Board from "./components/Board";
import {useEffect, useState} from "react";

function App() {

    const [board, setBoard] = useState(Array(12).fill(null).map((el) => (
        {
            id: Math.random().toString(),
            img: null,
            isOpen: false
        })))

    const [history, setHistory] = useState([]);
    const [winner, setWinner] = useState(false);
    const [resultMove, setResultMove] = useState([])

    const emoji = ['🐬', '🦕', '🏄', '⛵', '🌺', '🌴']

    const emojiBoard = () => {
        const newBoard = board.map(el => ({...el, img: null, isOpen:false})
        )
        for (let i = 0; i < emoji.length; i++) {
            for (let j = 1; j <= 2; j++) {
                let index;
                do {
                    index = Math.trunc(Math.random() * 12)
                }
                while (newBoard[index].img !== null)
                newBoard[index].img = emoji[i]
            }
        }
        setBoard(newBoard)
    }
//eslint-disable-next-line
    useEffect(() => {
        emojiBoard()
    }, [])

    const openCard = (id, img) => {
        const newBoard = board.map(el => el.id === id ? {...el, isOpen: true} : el)
        setBoard(newBoard)
        setHistory([...history, img])
    }

    const checkMove = () => {
        if (history.length % 2 === 0 && history[history.length - 1] !== history[history.length - 2]) {
            const newBoard = board.map(el => el.img === history[history.length - 1] || history[history.length - 2] ? {
                ...el,
                isOpen: false
            } : el)
            setBoard(newBoard)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            checkMove();
        }, 1000);
    }, [history]);

    const calculateWinner = () => {
        const winnerRes = board.every(el => el.isOpen)
        setWinner(winnerRes)
       if (winnerRes) setResultMove([...resultMove, history.length / 2])
    }
    useEffect(() => {
        if (history.length % 2 === 0) {
            calculateWinner()
        }
    }, [history])

    const restart = () => {
        emojiBoard()
        setHistory([])
        setWinner(false)
    }

    useEffect(() => {
        setTimeout(() => {
           restart();
        }, 5000);
    }, [resultMove]);

    return (
        <div style={{textAlign: "center"}}>
            <h1> Memory Game </h1>
            <Board
                board={board}
                openCard={openCard}
            />
            {winner && <h2> Congratulation! You won in {history.length / 2} moves! </h2>}
            {resultMove.length &&
                <div> moves {
                    resultMove.map(el => <li>{el}</li>)
                }
                </div>
            }
        </div>
    );
}

export default App;
