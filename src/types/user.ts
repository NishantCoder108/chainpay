export interface User {
    id: number;
    name: string;
    walletAddress: string;
    email: string;
    country: string;
}

export interface IUserTransaction {
    _id: number | string;
    name: string[];
    email: string[];
    walletAddress: string[];
    amount: number;
    signature: string;
    createdAt: string;
    country: string[];
}

export interface IUserDashboardDetails {
    totalUsers: number;
    totalTransactions: number;
    incrementByWeek: string;
    incrementByMonth: string;
    latestTransactions: IUserTransaction[];
}

export interface IRecipient {
    name: string;
    email: string;
    walletAddress: string;
    country: string;
}

export interface IFilters {
    search: string;
    country?: string;
    startDate?: Date | null;
    endDate?: Date | null;
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    walletAddress: string;
    country: string;
    createdAt: string;
}
