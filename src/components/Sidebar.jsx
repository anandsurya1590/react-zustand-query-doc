import { NavLink } from "react-router-dom";

const navigation = [
  {
    title: "Getting Started",
    items: [
      { name: "Overview", path: "/" },
      { name: "Quick Start", path: "/quickstart" },
      { name: "Installation", path: "/installation" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { name: "Queries", path: "/concepts/queries" },
      { name: "Mutations", path: "/concepts/mutations" },
      { name: "Caching", path: "/concepts/caching" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { name: "useQuery", path: "/api/use-query" },
      { name: "useMutation", path: "/api/use-mutation" },
      { name: "useInfiniteQuery", path: "/api/use-infinite-query" },
    ],
  },
  {
    title: "Examples",
    items: [
      { name: "Basic Query", path: "/examples/basic-query" },
      { name: "Mutations", path: "/examples/mutations" },
      { name: "Infinite Scroll", path: "/examples/infinite-scroll" },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>react-zustand-query</h1>
        <span className="version">v1.0.6</span>
      </div>
      <nav className="sidebar-nav">
        {navigation.map((section) => (
          <div key={section.title} className="nav-section">
            <h3 className="nav-section-title">{section.title}</h3>
            <ul className="nav-list">
              {section.items.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <a
          href="https://www.npmjs.com/package/react-zustand-query"
          target="_blank"
          rel="noopener noreferrer"
        >
          NPM Package
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </aside>
  );
}
