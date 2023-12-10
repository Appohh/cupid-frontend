import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function CustomLink({ to, children, icon, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname })
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                <i className={icon}></i>
                {children}
            </Link>
        </li>
    )
}

export default CustomLink;

