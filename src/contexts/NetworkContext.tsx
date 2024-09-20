import { createContext, useContext, useState, useMemo, ReactNode } from "react";

const SOLANA_URLS: { [key: string]: string | undefined } = {
    devnet: process.env.NEXT_PUBLIC_RPC_URL,
    mainnet: process.env.NEXT_PUBLIC_RPC_MAINNET_URL,
};

interface NetworkContextType {
    network: string;
    setNetwork: (network: string) => void;
    solanaUrl: string | undefined;
}

const NetworkContext = createContext<NetworkContextType>({
    network: "devnet",
    setNetwork: () => {},
    solanaUrl: SOLANA_URLS.devnet,
});

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
    const [network, setNetwork] = useState<string>("devnet");

    const solanaUrl = useMemo(() => SOLANA_URLS[network], [network]);

    return (
        <NetworkContext.Provider value={{ network, setNetwork, solanaUrl }}>
            {children}
        </NetworkContext.Provider>
    );
};

export const useNetwork = () => useContext(NetworkContext);
