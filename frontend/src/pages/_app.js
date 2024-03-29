import "../styles/output.css";
import localFont from "next/font/local";
import { Provider } from "react-redux";
import store from "../store/index";

const neusa = localFont({
  src: [
    {
      path: "../assets/fonts/neusa/NeusaNextPro-Bold.otf",
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

const grandHotel = localFont({
  src: [
    {
      path: "../assets/fonts/grand_hotel/GrandHotel-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-grandHotel",
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <main className={`${neusa.variable} ${grandHotel.variable} font-sans `}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
