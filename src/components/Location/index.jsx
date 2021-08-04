import Search from "./Search";
import Find from "./Find";

export default function Location({ updateLocation }) {
	return (
		<div className="flex row space-between align-center mvfull p-4">
			<Search updateLocation={updateLocation} />
			<Find updateLocation={updateLocation} />
		</div>
	);
}
