import { NavLink } from "react-router-dom";
import { links } from "../utils/constants";
import styled from "styled-components";

export default function Navbar() {
  return (
    <NavbarContainer>
      <h1 className="logo">F1</h1>
      <ul>
        {links.map(({ text, id, url }) => (
          <li key={id}>
            <NavLink
              to={url}
              className={({ isActive }) => `${isActive && "active"}`}
            >
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.nav`
  background: var(--clr-white);
  height: 5rem;
  box-shadow: var(--box-shadow);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10rem;
  .logo {
    font-style: italic;
    user-select: none;
  }
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 1rem;
    height: 100%;
    li {
      a {
        font-size: larger;
        text-transform: capitalize;
        transition: var(--transition);
        &.active,
        &:hover {
          color: dodgerblue;
        }
      }
    }
  }
`;
