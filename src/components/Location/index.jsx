import Search from "./Search";
import Find from "./Find";

export default function Location({ updateLocation }) {
	return (
		<div className="flex row space-between mvfull p-4">
			<Search />
			<Find updateLocation={updateLocation} />
		</div>
	);
}
