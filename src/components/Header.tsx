import { Link } from "react-router-dom";

const Header = () => {
    return <div className="bg-indigo-500 py-4">
        <div className="px-4">
            <div className="flex text-white space-x-5">
                <Link to="/">
                    <p>Film</p>
                </Link>
                <Link to="/production">
                    <p>Production</p>
                </Link>
            </div>
        </div>
    </div>
}

export default Header;