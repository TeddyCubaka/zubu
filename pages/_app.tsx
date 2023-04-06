import "../styles/globals.css";
import "../styles/general_classes.css";
import "../styles/loader.css";
import "../styles/mobile.css";
import "../styles/mobile.globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
