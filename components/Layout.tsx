import Head from "next/head";

export type LayoutProps = React.PropsWithChildren<{
  title: string,
}>;


export default function Layout({children, title}: LayoutProps) {
  return <>
    <Head>
      <title>Tracez | {title}</title>
    </Head>
    {children}
  </>; 
}