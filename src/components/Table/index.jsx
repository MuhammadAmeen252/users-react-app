import React from "react";

export function Table(props) {
    const { rows, cols, onEdit, onDelete } = props;

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {cols.map((col, i) => (
                            <th key={i} scope="col" className="px-6 py-3">
                                {col}
                            </th>
                        ))}
                        <th scope="col" className="px-6 py-3">
                                {"Actions"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            {Object.values(row).map((value, colIndex) => (
                                <td key={colIndex} className="px-6 py-4">
                                    {value}
                                </td>
                            ))}
                            <td class="px-6 py-4">
                                <button onClick={()=>{onEdit(row?._id)}} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                            </td>
                            <td class="px-6 py-4">
                                <button onClick={()=>{onDelete(row?._id)}} class="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
