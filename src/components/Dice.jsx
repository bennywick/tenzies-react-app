export function Dice({ value, isHeld, isTenzies, handleIsHeld, id }) {
	const isHeldStyle = isHeld
		? { background: "green" }
		: { background: "white" };

	return (
		<button
			className="dice"
			disabled={isTenzies}
			style={isHeldStyle}
			onClick={() => handleIsHeld(id)}
		>
			{value}
		</button>
	);
}
