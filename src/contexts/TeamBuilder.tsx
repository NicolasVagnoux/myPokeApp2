import React, { createContext, useState } from 'react';
import ITeamMember from '../interfaces/ITeamMember';

type TeamContent = {
  team: ITeamMember[];
  setTeam: React.Dispatch<React.SetStateAction<ITeamMember[]>>;
};

type Props = { children: React.ReactNode };

const TeamContext = createContext<TeamContent>({
  team: [],
  setTeam: () => {},
});

export const TeamContextProvider: React.FC<Props> = ({ children }) => {
  const [team, setTeam] = useState<ITeamMember[]>([]);

  return (
    <TeamContext.Provider value={{team, setTeam}}>
      {children}
    </TeamContext.Provider>
  );
};

export default TeamContext;
