import {
  Box,
} from "@adminjs/design-system"
import useSWR from "swr"
import { ApiClient } from "adminjs"
import { useOwnerStore } from "./lib/ownerStore"
import { useNavigate } from "react-router-dom"
import  React from "react"

const apiClient = new ApiClient()



const BcontrolTab = () => {
  const ownerId = useOwnerStore((state) => state.ownerId)
  const navigate = useNavigate()
// fetcher function
const fetchBuildings = async (ownerId) => {
  if (!ownerId) return []

  const response = await apiClient.resourceAction({
    resourceId: "BuildingControl",
    actionName: "list",
    params: {
      filters: { owner_id: String(ownerId) },
      page: 1,
      perPage: 10,
      sortBy: "createdAt",   // ✅ ใช้ createdAt
      direction: "desc",     // ✅ ล่าสุดมาก่อน
    },
  })
  
  return response?.data?.records?.map(r => r.params) || []
}

  // ✅ ใช้ swr แทน useEffect
  const { data: buildings = [], error, isLoading } = useSWR(
    ownerId ? ["buildings", ownerId] : null,
    () => fetchBuildings(ownerId)
  )

  const getStatusDisplay = (status) => {
    if (status?.toLowerCase() === "active") {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs">
          ใช้งาน
        </span>
      )
    } else if (status?.toLowerCase() === "inactive") {
      return (
        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-xs">
          ไม่ใช้งาน
        </span>
      )
    } else {
      return (
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
          {status || "—"}
        </span>
      )
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "—"
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("th-TH")
    } catch {
      return "—"
    }
  }

  // 👉 ฟังก์ชันไปหน้า new
  const handleCreate = () => {
    navigate(`/admin/resources/BuildingControl/actions/new`)
  }

  return (
    <Box
      p="lg"
      backgroundColor="white"
      border="1px solid #ddd"
      borderRadius="8px"
    >
      {/* 👉 Headline */}
      <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-200 ">
        ข้อมูลควบคุมอาคาร
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
              <th className="px-4 py-2 border-b">ประเภทอาคาร</th>
              <th className="px-4 py-2 border-b">วัตถุประสงค์</th>
              <th className="px-4 py-2 border-b">เลขที่ใบอนุญาต</th>
              <th className="px-4 py-2 border-b">จำนวน</th>
              <th className="px-4 py-2 border-b">วันที่ออกใบอนุญาต</th>
              <th className="px-4 py-2 border-b">สถานะ</th>
              <th className="px-4 py-2 border-b">action</th>
            </tr>
          </thead>  
        <tbody>
          {buildings.length > 0 ? (
            buildings.map((building) => (
              <tr key={building.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{building.building_type || "—"}</td>
                <td className="px-4 py-2 border-b">{building.use_purpose || "—"}</td>
                <td className="px-4 py-2 border-b">{building.license_number || "—"}</td>
                <td className="px-4 py-2 border-b">{building.quantity || "—"}</td>
                <td className="px-4 py-2 border-b">{formatDate(building.date)}</td>
                <td className="px-4 py-2 border-b">
                  {getStatusDisplay(building.status)}
                </td>
                <td className="px-4 py-2 border-b flex space-x-2">
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/resources/BuildingControl/records/${building.id}/show`
                      )
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
                colSpan={7}
                className="text-center text-gray-400 py-4 border-b"
              >
                ไม่พบข้อมูลควบคุมอาคาร
              </td>
            </tr>
          )}
        </tbody>
        </table>
      </div>
    </Box>
  )
}

export default BcontrolTab
