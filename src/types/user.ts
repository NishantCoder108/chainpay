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
    latestTransactions: IUserTransaction[] | null;
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

export interface IBillingTransaction {
    name: string;
    price: number;
    transactions: number;
    description: string;
    features: string[];
    color: string;
    createdAt: string;
    signature: string;
}

export interface IBillingPlan {
    planDetails: {
        name: string;
        createdAt: string;
        features: string[];
        price: number;
        signature: string;
        transactions: number;
        color: string;
        description: string;
    };
    userDetails: {
        email: string;
        name: string;
        walletAddress: string;
        transactions: {
            name: string;
            price: number;
            transactions: number;
            description: string;
            features: string[];
            color: string;
            createdAt: string;
            signature: string;
        }[];
    };
}
