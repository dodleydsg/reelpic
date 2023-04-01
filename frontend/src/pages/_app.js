import "../styles/output.css";
import localFont from "next/font/local";
import { Provider } from "react-redux";
import store from "../store/index";

const neusa = localFont({
  src: [
    {
      path: "../assets/fonts/neusa/NeusaNextPro-Regular.otf",
      weight: "600",
      style: "bold",
    },
    {
      path: "../assets/fonts/neusa/NeusaNextPro-Medium.otf",
      weight: "500",
      style: "semibold",
    },
    {
      path: "../assets/fonts/neusa/NeusaNextPro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/neusa/NeusaNextPro-Light.otf",
      weight: "300",
      style: "light",
    },
  ],
  variable: "--font-neusa",
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <main className={neusa.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
