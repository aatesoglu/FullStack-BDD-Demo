import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">Users</h2>
            <p className="text-gray-600 mb-4">View and manage users</p>
            <Link
              href="/users"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
              data-cy="view-users"
            >
              View Users
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">Projects</h2>
            <p className="text-gray-600 mb-4">View and manage projects</p>
            <Link
              href="/projects"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
              data-cy="view-projects"
            >
              View Projects
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">Scales</h2>
            <p className="text-gray-600 mb-4">Manage survey scales</p>
            <Link
              href="/scales"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
              data-cy="view-scales"
            >
              View Scales
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">Scale Items</h2>
            <p className="text-gray-600 mb-4">Manage scale items and questions</p>
            <Link
              href="/scale-items"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
              data-cy="view-scale-items"
            >
              View Scale Items
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">Surveys</h2>
            <p className="text-gray-600 mb-4">Manage surveys</p>
            <Link
              href="/surveys"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
              data-cy="view-surveys"
            >
              View Surveys
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">Analyses</h2>
            <p className="text-gray-600 mb-4">Manage analyses</p>
            <Link
              href="/analyses"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
              data-cy="view-analyses"
            >
              View Analyses
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">Credit Transactions</h2>
            <p className="text-gray-600 mb-4">Manage credit transactions</p>
            <Link
              href="/credit-transactions"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
              data-cy="view-credit-transactions"
            >
              View Credit Transactions
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">Responses</h2>
            <p className="text-gray-600 mb-4">Manage responses</p>
            <Link
              href="/responses"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
              data-cy="view-responses"
            >
              View Responses
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

