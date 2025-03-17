import React from "react";

export const Table = ({ children, className = "" }) => {
  return <table className={`min-w-full border-collapse ${className}`}>{children}</table>;
};

export const TableHeader = ({ children }) => {
  return <thead className="bg-gray-200 text-left">{children}</thead>;
};

export const TableBody = ({ children }) => {
  return <tbody className="divide-y">{children}</tbody>;
};

export const TableRow = ({ children }) => {
  return <tr className="border-b">{children}</tr>;
};

export const TableCell = ({ children, className = "" }) => {
  return <td className={`p-2 border border-gray-300 ${className}`}>{children}</td>;
};
