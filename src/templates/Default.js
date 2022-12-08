import Header from '../components/Header'

const Default = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <footer>footer</footer>
        </>
    )
}

export default Default