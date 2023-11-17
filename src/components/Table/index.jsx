import React from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

export function Table(props) {
    const { rows, cols, onEdit, onDelete, loadMore, hasMore, onView } = props;

    return (
        <div id="scrollableDiv" className="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ maxHeight: "500px", overflow: 'auto' }}>
            <InfiniteScroll
                dataLength={rows.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<p>Loading...</p>}
                endMessage={<p>No more rows.</p>}
                scrollableTarget="scrollableDiv"
            >
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">

                        {cols.map((col, i) => (
                            <th key={i} scope="col" className="px-6 py-3" style={{ maxWidth: '100px' }}>
                                {col}
                            </th>
                        ))}
                        <th scope="col" className="px-6 py-3">
                            {"Actions"}
                        </th>

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
                                <td class="px-6 py-2">
                                    <button onClick={() => { onView(row?._id) }} class="font-medium text-gray-600 dark:text-blue-500 hover:underline">View</button>
                                </td>
                                <td class="px-6 py-2">
                                    <button onClick={() => { onEdit(row?._id) }} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                </td>
                                <td class="px-6 py-2">
                                    <button onClick={() => { onDelete(row?._id) }} class="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </InfiniteScroll>
        </div >
    );
}
