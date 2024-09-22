import React from "react";

const UpperBar = ({ links, activeTab, onTabChange }) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <ul className="flex gap-4 items-stretch">
          {links.map((link) => (
            <li key={link.key}>
              <button
                onClick={() => onTabChange(link.key)}
                className={`px-4 py-2 rounded-md text-gray-800 dark:text-white transition-all duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-darkmode-hover hover:bg-graydark hover:text-white dark:hover:bg-white dark:hover:text-graydark  ${
                  activeTab === link.key
                    ? "dark:bg-white dark:text-black-2  bg-graydark text-white"
                    : ""
                }`}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default UpperBar;
