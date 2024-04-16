"use client"
import React, {createContext, ReactNode, useContext, useState} from 'react';


type SidebarContextType = {
	sidebarOpen: boolean,
	setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>, // function to update sidebarOpen used by useState
};

const defaultContextValue: SidebarContextType = {
	sidebarOpen: false,
	setSidebarOpen: () => {
	}, // This is just a placeholder, it will be replaced by the actual function.
};

interface SidebarProviderProps {
	children: ReactNode;
}

const SidebarContext = createContext(defaultContextValue);

export function useSidebar() {
	return useContext(SidebarContext);
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({children}) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	
	return (
		<SidebarContext.Provider value={{sidebarOpen, setSidebarOpen}}>
			{children}
		</SidebarContext.Provider>
	);
};
