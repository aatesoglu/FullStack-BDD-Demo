"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/", id: "nav-dashboard" },
    { label: "Users", href: "/users", id: "nav-kullanıcılar" },
    { label: "Projects", href: "/projects", id: "nav-projeler" },
    { label: "Scales", href: "/scales", id: "nav-scales" },
    { label: "Scale Items", href: "/scale-items", id: "nav-scale-items" },
    { label: "Surveys", href: "/surveys", id: "nav-surveys" },
    { label: "Analyses", href: "/analyses", id: "nav-analyses" },
    { label: "Credit Transactions", href: "/credit-transactions", id: "nav-credit-transactions" },
    { label: "Responses", href: "/responses", id: "nav-responses" },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 shadow" data-cy="navigation">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">Survey App</div>
        <ul className="flex space-x-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                data-cy={item.id}
                className={`hover:text-gray-300 ${
                  pathname === item.href ? "text-blue-400" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

