export class PlayerWithPassword {
    id: string;
    password: string;
    name: string;
    avatarUrl?: string;
    groups: string[];
}

export type Player = Omit<PlayerWithPassword, "password">;
