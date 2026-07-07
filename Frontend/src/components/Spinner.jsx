import "./Spinner.scss"

const Spinner = ({ text = "Loading..." }) => {
    return (
        <div className="spinner-overlay">
            <div className="spinner"></div>
            {text && <p className="spinner-text">{text}</p>}
        </div>
    )
}

export default Spinner
