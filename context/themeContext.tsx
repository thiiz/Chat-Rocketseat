import { createContext, useContext, useEffect, useState } from "react";
import { lightTheme, darkTheme } from '@/styles/Theme'
import { parseCookies, setCookie } from 'nookies'
import { ThemeProvider } from "styled-components";

type ThemeContextType = false | true;

const ThemeContext = createContext<any>({} as ThemeContextType)

export default function ThemeContextProvider({ children }: any) {
	const [isDarkTheme, setIsDarkTheme] = useState<ThemeContextType>(true)

	const toggleTheme = () => {
		if (isDarkTheme) {
			setIsDarkTheme(false)
			setCookie(null, 'THEME', 'Light', {
				maxAge: 86400,
				path: '/',
			})
			return
		}
		else {
			setIsDarkTheme(true)
			setCookie(null, 'THEME', 'Dark', {
				maxAge: 86400,
				path: '/',
			})
			return
		}
	}

	const state = {
		isDarkTheme,
		toggleTheme
	}

	useEffect(() => {
		const prefersDark = window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches;
		const cookieTheme = parseCookies().THEME
		if (cookieTheme === 'Dark' || cookieTheme === "Light") {
			setIsDarkTheme(cookieTheme === 'Dark' ? true : false);
		} else if (prefersDark) {
			setIsDarkTheme(true);
		}
	}, []);

	return (
		<ThemeContext.Provider value={state} >
			<ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
				{children}
			</ThemeProvider>
		</ThemeContext.Provider >
	)
}

export const useThemeContext = () => {
	const context = useContext(ThemeContext)
	const {
		isDarkTheme,
		toggleTheme
	} = context
	return { isDarkTheme, toggleTheme }
}
