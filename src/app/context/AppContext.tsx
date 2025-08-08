'use client';

// Libraries
import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';

// Define the context value type
interface AppContextType {
	isTouchDevice: boolean | undefined;
	screenWidth: number | undefined;
	screenHeight: number | undefined;
	windowHeight: number | null;
	windowWidth: number | null;
}

// Create Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Define the provider props type
interface ContextProviderProps {
	children: ReactNode;
}

// Create the context provider component
export const ContextProvider = ({ children }: ContextProviderProps) => {
	const [isTouchDevice, setIsTouchDevice] = useState<boolean | undefined>(
		undefined
	);
	const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);
	const [screenHeight, setScreenHeight] = useState<number | undefined>(
		undefined
	);
	const [windowHeight, setWindowHeight] = useState<number | null>(null);
	const [windowWidth, setWindowWidth] = useState<number | null>(null);

	// Set screenWidth and screenHeight on page load
	useEffect(() => {
		setScreenHeight(screen.height);
		setScreenWidth(screen.width);
		setWindowHeight(window.innerHeight);
		setWindowWidth(window.innerWidth);
	}, []);

	// Set screenWidth and screenHeight on resize
	useEffect(() => {
		if (typeof window === 'undefined') return;

		const handleResize = () => {
			setScreenHeight(screen.height);
			setScreenWidth(screen.width);
			setWindowHeight(window.innerHeight);
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);
		window.addEventListener('orientationchange', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('orientationchange', handleResize);
		};
	}, []);

	// Determine if touch device or not
	useEffect(() => {
		const mq = window.matchMedia('(pointer: coarse)');
		setIsTouchDevice(mq.matches);

		const handler = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
		mq.addEventListener('change', handler);

		return () => mq.removeEventListener('change', handler);
	}, []);

	return (
		<AppContext.Provider
			value={{
				isTouchDevice,
				screenHeight,
				screenWidth,
				windowHeight,
				windowWidth,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

// Custom hook to access context
export const useAppContext = (): AppContextType => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within a ContextProvider');
	}
	return context;
};
