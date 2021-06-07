import React from 'react';
import {Link, useLocation} from "react-router-dom";
import P5Wrapper from 'react-p5-wrapper';
import s from './Game.module.css'

const Game = () => {
    let hash = useLocation().hash?.substring(1);
    const fieldSize = (!hash || hash > 12 || hash < 3) ? 3 : Number.parseInt(hash);

    const sketch = (p5) => {
        let fontBold;
        let context;
        let cellSize;
        let fieldWidth;
        let fieldLeftTop = new Array(2);
        let map;
        let score = {
            'X': 0,
            'O': 0,
            'tie': 0,
        };

        const initMap = () => {
            map = [];
            for(let i = 0; i < fieldSize; i++) {
                map.push(new Array(Number.parseInt(fieldSize)).fill(''));
            }
        }

        const getCellSize = () => {
            const maxWidth = p5.windowWidth * 0.8 < p5.windowHeight * 0.8 ? p5.windowWidth * 0.8 : p5.windowHeight * 0.8;
            const maxCellSize = 200 * fieldSize < maxWidth ? 200 : Math.floor(maxWidth / fieldSize);
            return maxCellSize;
        }

        const drawField = () => {
            cellSize = getCellSize();
            fieldWidth = cellSize * fieldSize;
            fieldLeftTop[0] = (p5.windowWidth / 2 - fieldWidth / 2);
            fieldLeftTop[1] = (p5.windowHeight - fieldWidth) / 2 < 60 ? 60 : (p5.windowHeight - fieldWidth) / 2;

            p5.push();
            p5.noStroke();
            p5.fill(242, 242, 242);

            // vertical lines
            for (let i = 0; i < fieldSize - 1; i++) {
                let x = Math.floor(cellSize + i * cellSize + fieldLeftTop[0]);
                p5.rect(x, fieldLeftTop[1], 5, fieldWidth, 10);
            }

            // horizontal lines
            for(let i = 0; i < fieldSize - 1; i++) {
                let y = Math.floor(cellSize + i * cellSize + fieldLeftTop[1])
                p5.rect(p5.windowWidth / 2 - fieldWidth / 2, y, fieldWidth, 5, 10);
            }

            p5.pop();
        }

        const drawO = (x, y) => {
            p5.push();
            p5.stroke(242, 242, 242);
            p5.strokeWeight(7)
            p5.noFill();
            p5.circle(x, y, cellSize * 0.8 - 7);
            p5.pop();
        }

        const drawX = (x, y) => {
            p5.push();
            p5.rectMode(p5.CENTER);
            p5.fill(242, 242, 242);
            p5.angleMode(p5.DEGREES);
            p5.noStroke();
            p5.translate(x, y);
            p5.rotate(45);
            p5.rect(0, 0, cellSize * 0.8, 7, 10);
            p5.rotate(-90);
            p5.rect(0, 0, cellSize * 0.8, 7, 10);
            p5.pop();
        }

        const drawMap = () => {
            for(let i  = 0; i < fieldSize; i++) {
                for (let j = 0; j < fieldSize; j++) {
                    if(map[i][j] === 'X') {
                        drawX(fieldLeftTop[0] + cellSize * j + Math.floor(cellSize / 2),
                            fieldLeftTop[1] + cellSize * i + Math.floor(cellSize / 2));
                    } else if (map[i][j] === 'O') {
                        drawO(fieldLeftTop[0] + cellSize * j + Math.floor(cellSize / 2),
                            fieldLeftTop[1] + cellSize * i + Math.floor(cellSize / 2));
                    }
                }
            }
        }

        const drawScore = () => {
            p5.push();
            p5.textSize(25);
            p5.textFont(fontBold);
            p5.fill(242, 242, 242);
            p5.text(`Player: ${score.X}`, p5.windowWidth * 0.8, p5.windowHeight * 0.4);
            p5.text(`Tie: ${score.tie}`, p5.windowWidth * 0.8, p5.windowHeight * 0.428);
            p5.text(`Computer: ${score.O}`, p5.windowWidth * 0.8, p5.windowHeight * 0.456);
            p5.pop();
        };

        const nextTurn = () => {
            let randomIndex = Math.floor(p5.random(getEmpty()));
            let counter = -1;

            for (let y = 0; y < fieldSize; y++) {
                for (let x = 0; x < fieldSize; x++) {
                    if (map[y][x].length === 0) {
                        counter++;
                    }
                    if (randomIndex === counter) {
                        map[y][x] = 'O';
                        return;
                    }
                }
            }
        }

        const checkWinner = () => {
            let tmp = [];
            let winner = null;

            const checkLine = (line) => {
                if (line.every((elem)=> elem === 'X')) {
                    score.X += 1;
                    initMap();
                    return 'X';
                }
                else if (line.every(elem=> elem === 'O')) {
                    score.O += 1;
                    initMap();
                    return 'O';
                }
            }

            // horisontal
            map.forEach((line) => {
                winner = checkLine(line);
                if (winner)
                    return winner;
            });

            // vertical
            for (let i = 0; i < fieldSize; i++) {
                tmp = [];
                for (let j = 0; j < fieldSize; j++) {
                    tmp.push(map[j][i]);
                }
                winner = checkLine(tmp);
                if (winner)
                    return winner;
            }
            // diagonal
            tmp = [];
            map.forEach((line, i) => {
                tmp.push(line[i]);
            });
            winner = checkLine(tmp);
            if (winner)
                return winner;

            tmp = [];
            map.forEach((line, i) => {
                tmp.push(line[map.length - i]);
            });
            winner = checkLine(tmp);
            if (winner)
                return winner;
        }

        const getEmpty = () => {
            return map.flat().filter((cell) => cell.length === 0).length;
        }

        const checkTie = () => {
            if (getEmpty() === 0) {
                score.tie += 1;
                initMap();
            }
        };

        p5.preload = () => {
            fontBold = p5.loadFont('/RalewayBold.ttf');
        };

        p5.setup = () => {
            p5.createCanvas(p5.windowWidth, p5.windowHeight);
            context = p5.drawingContext;
            initMap();
        };

        p5.draw = () => {
            p5.background('rgba(0,0,0, 0.95)');
            drawField();
            drawMap();
            drawScore();
        }

        p5.windowResized = () => {
            p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
        };

        p5.mouseClicked = () => {
            if (p5.mouseX >= fieldLeftTop[0] && p5.mouseX <= fieldLeftTop[0] + fieldWidth
                && p5.mouseY >= fieldLeftTop[1] && p5.mouseY < fieldLeftTop[1] + fieldWidth) {
                let mapX = Math.floor((p5.mouseX - fieldLeftTop[0]) / cellSize);
                let mapY = Math.floor((p5.mouseY - fieldLeftTop[1]) / cellSize);

                if(map[mapY][mapX]?.length === 0) {
                    map[mapY][mapX] = 'X';
                    if (!checkWinner())
                        nextTurn();
                    if (!checkWinner())
                        checkTie();
                }
            }
        }
    };
    return (
        <P5Wrapper sketch={sketch}>
            <Link className={s.link} to='/'>Tic-tac-toe</Link>
        </P5Wrapper>
    );
};

export default Game;
