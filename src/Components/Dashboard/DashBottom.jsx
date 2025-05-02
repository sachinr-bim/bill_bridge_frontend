import React from 'react'

export default function DashBottom() {
  return (
    <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold text-gray-700 mb-4">Real-Time Logs</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">TIMESTAMP</th>
              <th>USER</th>
              <th>LEVEL</th>
              <th>MESSAGE</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                timestamp: "2024-07-24 10:00:00.123",
                user: "User 1",
                level: "INFO",
                message: "User logged in",
                color: "blue",
              },
              {
                timestamp: "2024-07-24 09:59:58.987",
                user: "User 5",
                level: "ERROR",
                message: "Database connection error",
                color: "red",
              },
              {
                timestamp: "2024-07-24 09:59:55.456",
                user: "User 3",
                level: "WARNING",
                message: "Resource not found",
                color: "yellow",
              },
            ].map(({ timestamp, user, level, message, color }, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-2 text-gray-700">{timestamp}</td>
                <td className="text-blue-600 cursor-pointer hover:underline">{user}</td>
                <td className="capitalize">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full bg-${
                      color === "blue"
                        ? "blue-100 text-blue-600"
                        : color === "red"
                        ? "red-100 text-red-600"
                        : "yellow-100 text-yellow-600"
                    }`}
                  >
                    {level}
                  </span>
                </td>
                <td className="text-gray-700">{message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}
