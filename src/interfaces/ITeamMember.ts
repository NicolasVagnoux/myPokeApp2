export default interface ITeamMember {
    id: number | undefined;
    name: string | undefined;
    image: string | undefined;
    apiTypes: Array<{name: string, image: string}> | undefined;
    type1: {name: string, color: string, strenghts: string[], weaknesses: string[]};
    type2: {name: string, color: string, strenghts: string[], weaknesses: string[]};
}