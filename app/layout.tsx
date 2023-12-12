import "./style/globals.css";
import DefaultLayout from "./layout/DefaultLayout";

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
      <body className="font-wix">
        <DefaultLayout>{props.children}</DefaultLayout>
      </body>
    </html>
  );
}
