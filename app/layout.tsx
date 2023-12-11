import "./style/globals.css";
import DefaultLayout from "./components/layout/DefaultLayout";

export default function RootLayout(props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
}) {
  return (
    <html lang="en">
      <body className="font-void">
        <DefaultLayout>{props.children}</DefaultLayout>
      </body>
    </html>
  );
}
