import { useEffect, useState } from "react";
import "./App.css";
import { Dice } from "./components/Dice";
import Confetti from "react-confetti";

function App() {
	const [isTenzies, setIsTenzies] = useState(false);
	const [diceValues, setDiceValues] = useState(setupGame());
	const [score, setScore] = useState(1);

	const isAllDiceHeld = diceValues.every((x) => x.isHeld);
	const isAllDiceSameValues = diceValues.every(
		({ value }) => value == diceValues[0].value
	);

	function generateDie() {
		return {
			id: crypto.randomUUID(),
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
		};
	}

	function handleIsHeld(id) {
		setDiceValues((prevDice) =>
			prevDice.map((die) =>
				id === die.id
					? {
							...die,
							isHeld: !die.isHeld,
					  }
					: die
			)
		);
	}

	function setupGame() {
		const dice = [];
		for (let i = 0; i < 10; i++) {
			dice.push(generateDie());
		}
		return dice;
	}

	function newGame() {
		setIsTenzies(false);
		setDiceValues((prevDice) =>
			prevDice.map(() => {
				return generateDie();
			})
		);
		setScore(1);
	}

	function handleDiceRoll() {
		setDiceValues((prevDice) =>
			prevDice.map((die) => (!die.isHeld ? generateDie() : die))
		);
		setScore((prevScore) => prevScore + 1);
	}

	useEffect(() => {
		if (isAllDiceHeld && isAllDiceSameValues) setIsTenzies(true);
	}, [diceValues]);

	return (
		<main className="app--wrapper">
			{isTenzies && <Confetti />}
			<div className="app--inner">
				<div className="app--header">
					<h1 className="app--title">TENZIES</h1>
					<p>
						Roll until all dice are the same. Click each die to freeze it at its
						current value between rolls. The lower the score, the better.
					</p>
					<p className="score--title">Score: {score}</p>
				</div>
				<div className="dice--container">
					{diceValues.map((die) => (
						<Dice
							key={die.id}
							id={die.id}
							value={die.value}
							isHeld={die.isHeld}
							isTenzies={isTenzies}
							handleIsHeld={handleIsHeld}
						/>
					))}
				</div>
				<div className="roll--btn--container">
					{isTenzies ? (
						<button className="roll--btn" onClick={newGame}>
							New Game
						</button>
					) : (
						<button
							className="roll--btn"
							disabled={isAllDiceHeld}
							onClick={handleDiceRoll}
						>
							Roll
						</button>
					)}
				</div>
			</div>
		</main>
	);
}

export default App;
