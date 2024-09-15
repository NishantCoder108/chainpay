export interface User {
    id: number;
    name: string;
    walletAddress: string;
    email: string;
    country: string;
}

export interface IUserDashboardDetails {
    totalUsers: number;
    totalTransactions: number;
    incrementByWeek: string;
    incrementByMonth: string;
    latestTransactions: {
        id: number | string;
        name: string;
        email: string;
        walletAddress: string;
        amount: string;
        signature: string;
    }[];
}

export interface IRecipient {
    name: string;
    email: string;
    walletAddress: string;
    country: string;
}
