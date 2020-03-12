import Head from "next/head";
import Nav from "./nav";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="butts">{children}</main>

      <style jsx>{`
        main {
          margin: 0 50px;
          background-color: red;
        }
      `}</style>
    </div>
  );
};

export default Layout;
