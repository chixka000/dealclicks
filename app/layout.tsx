import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './style/globals.css'
import DefaultLayout from './layout/DefaultLayout'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <DefaultLayout>
          {props.children}
        </DefaultLayout>
      </body>
    </html>
  )
}
