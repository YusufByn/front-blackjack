import Header from './Header'
import HeaderNav from './HeaderNav'
import Footer from './Footer'

function Layout({ children }) {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;

