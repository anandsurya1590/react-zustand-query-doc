import CodeBlock from "../components/CodeBlock";

const npmCode = `npm install react-zustand-query`;
const yarnCode = `yarn add react-zustand-query`;
const pnpmCode = `pnpm add react-zustand-query`;

const peerDeps = `{
  "peerDependencies": {
    "react": ">=17.0.0",
    "react-dom": ">=17.0.0"
  }
}`;

const importCode = `// ES Modules
import { useQuery, useMutation, useInfiniteQuery } from 'react-zustand-query';

// CommonJS
const { useQuery, useMutation, useInfiniteQuery } = require('react-zustand-query');`;

const typescriptCode = `import { useQuery } from 'react-zustand-query';

interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfile() {
  const { data, isLoading } = useQuery<User>({
    queryKey: 'user',
    queryFn: async () => {
      const res = await fetch('/api/user');
      return res.json();
    },
  });

  // data is typed as User | undefined
  return <div>{data?.name}</div>;
}`;

export default function Installation() {
  return (
    <div className="page">
      <h1>Installation</h1>
      <p className="lead">
        Install react-zustand-query and its peer dependencies to get started.
      </p>

      <section className="section">
        <h2>Package Managers</h2>
        <h3>npm</h3>
        <CodeBlock code={npmCode} language="bash" />
        
        <h3>Yarn</h3>
        <CodeBlock code={yarnCode} language="bash" />
        
        <h3>pnpm</h3>
        <CodeBlock code={pnpmCode} language="bash" />
      </section>

      <section className="section">
        <h2>Peer Dependencies</h2>
        <p>
          react-zustand-query requires React 17 or higher as a peer dependency:
        </p>
        <CodeBlock code={peerDeps} language="json" />
        <p>
          These are likely already installed in your React project. If not,
          install them alongside react-zustand-query.
        </p>
      </section>

      <section className="section">
        <h2>Importing</h2>
        <p>
          Once installed, you can import the hooks directly into your
          components:
        </p>
        <CodeBlock code={importCode} language="javascript" />
      </section>

      <section className="section">
        <h2>TypeScript Support</h2>
        <p>
          react-zustand-query is written in TypeScript and includes built-in
          type definitions. No additional @types packages are needed.
        </p>
        <CodeBlock code={typescriptCode} language="typescript" />
      </section>

      <section className="section">
        <h2>Bundle Size</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">~3KB</div>
            <div className="stat-label">Minified + Gzipped</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">0</div>
            <div className="stat-label">External Dependencies</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">100%</div>
            <div className="stat-label">Tree-shakeable</div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Browser Support</h2>
        <p>
          react-zustand-query supports all modern browsers and IE11 with
          appropriate polyfills:
        </p>
        <ul>
          <li>Chrome (latest)</li>
          <li>Firefox (latest)</li>
          <li>Safari (latest)</li>
          <li>Edge (latest)</li>
          <li>IE11 (with polyfills for Promise, fetch)</li>
        </ul>
      </section>
    </div>
  );
}
