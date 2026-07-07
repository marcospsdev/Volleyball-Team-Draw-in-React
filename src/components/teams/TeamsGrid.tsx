import type { Member, Team } from "@/types";
import { TeamCard } from "./TeamCard";

type TeamsGridProps = {
  teams: Team[];
  members: Member[];
};

export function TeamsGrid({ teams, members }: TeamsGridProps) {
  return (
    <div
      className={`grid gap-4 grid-cols-[repeat(auto-fit,minmax(170px,1fr))] ${
        teams.length <= 2 ? "max-w-md mx-auto" : ""
      }`}
    >
      {teams.map((team, index) => (
        <TeamCard key={index} team={team} index={index} members={members} />
      ))}
    </div>
  );
}
