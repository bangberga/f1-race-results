import { isArrDriver } from "../interfaces/Drivers";
import { isArrRace } from "../interfaces/Races";
import { isArrTeam } from "../interfaces/Teams";
import Driver from "./Driver";
import Race from "./Race";
import Team from "./Team";

interface ListItemProps {
  data: any[];
}

export default function ListItem(props: ListItemProps) {
  const { data } = props;
  if (isArrDriver(data))
    return data.map((driver, i) => <Driver key={i} driver={driver} />);
  if (isArrRace(data))
    return data.map((race, i) => <Race key={i} race={race} />);
  if (isArrTeam(data))
    return data.map((team, i) => <Team key={i} team={team} />);
  return <></>;
}
