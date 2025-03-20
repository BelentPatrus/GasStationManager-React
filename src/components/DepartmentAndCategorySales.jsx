import React from "react";

const DepartmentAndCategorySales = ({ departmentSales, productCategorySales }) => {
  return (
    <div className="mt-4">
      {departmentSales && (
        <>
          <h3>Department Sales</h3>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Department</th>
                  <th scope="col" className="text-end">Sales ($)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(departmentSales).map(([department, sales], index) => (
                  <tr key={index}>
                    <td>{department}</td>
                    <td className="text-end">${sales.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {productCategorySales && (
        <>
          <h3 className="mt-4">Product Category Sales</h3>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col" className="text-end">Sales ($)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(productCategorySales).map(([category, sales], index) => (
                  <tr key={index}>
                    <td>{category}</td>
                    <td className="text-end">${sales.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default DepartmentAndCategorySales;
