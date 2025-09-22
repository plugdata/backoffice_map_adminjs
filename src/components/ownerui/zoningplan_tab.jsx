import { Box } from "@adminjs/design-system"
import useSWR from "swr"
import { ApiClient } from "adminjs"
import { useNavigate } from "react-router-dom"
import  React from "react"
import { useOwnerStore } from "./lib/ownerStore"

const apiClient = new ApiClient()

const ZoningPlanTab = () => {
  const navigate = useNavigate()
 const ownerId = useOwnerStore((state) => state.ownerId)

 // fetcher function
const fetchZoningPlans = async (ownerId) => {
  if (!ownerId) return []

  const response = await apiClient.resourceAction({
    resourceId: "ZoningPlan",
    actionName: "list",
    page: 1,
    perPage: 10,
    sortBy: "createdAt",   // ✅ ใช้ createdAt
    direction: "desc",     // ✅ ล่าสุดมาก่อน
    params: {
      filters: { owner_id: String(ownerId) },
    },
  })
  return response?.data?.records?.map(r => r.params) || []
}
  // ✅ ใช้ swr
  const { data: zones = [], error, isLoading } = useSWR(
    ownerId ? ["zones", ownerId] : null,
    () => fetchZoningPlans(ownerId)
  )

  // 👉 ฟังก์ชันไปหน้า new
  const handleCreate = () => {
    navigate(`/admin/resources/ZoningPlan/actions/new`)
  }

  return (
    <Box
      p="lg"
      backgroundColor="white"
      border="1px solid #ddd"
      borderRadius="8px"
    >
      {/* 👉 Headline */}
      <h2 className="text-lg font-semibold text-back-700 border-b border-gray-200 ">
        ข้อมูลงานผังเมือง (Zoning Plan)
      </h2>

      {/* 👉 Actions */}
      <div className="flex justify-end space-x-2 py-3 mr-4">
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <span className="mr-2">＋</span> เพิ่มข้อมูล
        </button>
      </div>

      {/* 👉 Loading / Error */}
      {isLoading && (
        <p className="text-gray-500 text-center">กำลังโหลดข้อมูล...</p>
      )}
      {error && (
        <p className="text-red-500 text-center">เกิดข้อผิดพลาดในการดึงข้อมูล</p>
      )}

      {/* 👉 Table */}
      <div className="overflow-x-auto mt-2 ml-4 mr-4">
        <table className="min-w-full border border-gray-200 text-sm text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border-b">ชื่อพื้นที่</th>
              <th className="px-4 py-2 border-b">ข้อมูลเพิ่มเติม</th>
              <th className="px-4 py-2 border-b">action</th>
            </tr>
          </thead>
          <tbody>
            {zones.length > 0 ? (
              zones.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{plan.areaName || "—"}</td>
                  <td className="px-4 py-2 border-b">{plan.notes || "—"}</td>
                  <td className="px-4 py-2 border-b flex space-x-2">
                    {/* 👁 Show */}
                    <button
                      onClick={() =>
                        navigate(`/admin/resources/ZoningPlan/records/${plan.id}/show`)
                      }
                      className="bg-white text-blue-500 border border-blue-500 rounded-md p-2 hover:bg-blue-50 hover:text-green-500 transition-colors duration-200"
                    >
                      👁
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="text-center text-gray-400 py-4 border-b"
                >
                  ไม่พบข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Box>
  )
}

export default ZoningPlanTab
