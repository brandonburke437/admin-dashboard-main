



export default function DataTable() {
    const tableData = [
      {
        name: "Apple iMac",
        category: "Computers",
        brand: "Apple",
        price: "$1,299",
        stock: 50,
        totalSales: 200,
        status: "In Stock",
      },
      {
        name: "Apple iPhone",
        category: "Mobile Phones",
        brand: "Apple",
        price: "$999",
        stock: 120,
        totalSales: 300,
        status: "In Stock",
      },
      {
        name: "Samsung Galaxy",
        category: "Mobile Phones",
        brand: "Samsung",
        price: "$899",
        stock: 80,
        totalSales: 150,
        status: "In Stock",
      },
      {
        name: "Dell XPS 13",
        category: "Computers",
        brand: "Dell",
        price: "$1,099",
        stock: 30,
        totalSales: 120,
        status: "In Stock",
      },
      {
        name: "HP Spectre x360",
        category: "Computers",
        brand: "HP",
        price: "$1,299",
        stock: 25,
        totalSales: 80,
        status: "In Stock",
      },
      {
        name: "Google Pixel 6",
        category: "Mobile Phones",
        brand: "Google",
        price: "$799",
        stock: 100,
        totalSales: 200,
        status: "In Stock",
      },
      {
        name: "Sony WH-1000XM4",
        category: "Headphones",
        brand: "Sony",
        price: "$349",
        stock: 60,
        totalSales: 150,
        status: "In Stock",
      },
      {
        name: "Apple AirPods Pro",
        category: "Headphones",
        brand: "Apple",
        price: "$249",
        stock: 200,
        totalSales: 300,
        status: "In Stock",
      },
      {
        name: "Asus ROG Zephyrus",
        category: "Computers",
        brand: "Asus",
        price: "$1,899",
        stock: 15,
        totalSales: 50,
        status: "In Stock",
      },
      {
        name: "Microsoft Surface Pro 7",
        category: "Computers",
        brand: "Microsoft",
        price: "$899",
        stock: 40,
        totalSales: 100,
        status: "In Stock",
      },
    ];
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Brand
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Price
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Stock
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Sales
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                  {item.name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {item.category}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {item.brand}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {item.price}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {item.stock}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  {item.totalSales}
                </td>
                <td
                  className={`px-4 py-2 text-sm ${
                    item.status === "In Stock"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }