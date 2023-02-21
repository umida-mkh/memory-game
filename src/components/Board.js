import Square from "./Square";

const boardStyle = {
    border: '4px solid green',
    width: '400px',
    height: '300px',
    display: 'grid',
    margin: '0 auto',
    gridTemplateColumns: 'auto auto auto auto'
}
const Board = (props) => {
    return (
        <div style={boardStyle}>
            {props.board.map((el) =>
                <Square
                    key={el.id}
                    card={el}
                    openCard={props.openCard}/>)}
        </div>
    );
};

export default Board;
