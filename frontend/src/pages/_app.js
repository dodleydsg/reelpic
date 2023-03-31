import "../styles/output.css";
import localFont from "next/font/local";

const futura = localFont({
  src: [
    {
      path: "../fonts/futura/FuturaPTBold.otf",
      weight: "700",
      style: "bolder",
    },
    {
      path: "../fonts/futura/FuturaPTDemi.otf",
      weight: "600",
      style: "bold",
    },
    {
      path: "../fonts/futura/FuturaPTMedium.otf",
      weight: "500",
      style: "semibold",
    },
    {
      path: "../fonts/futura/FuturaPTBook.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/futura/FuturaPTLight.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-futura",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={futura.className}>
      <Component {...pageProps} />
    </main>
  );
}
