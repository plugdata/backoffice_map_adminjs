import { Box } from "@adminjs/design-system"
import useSWR from "swr"
import { ApiClient } from "adminjs"
import { useNavigate } from "react-router-dom"
import { useOwnerStore } from "./lib/ownerStore"
const apiClient = new ApiClient()


const RiskZoneTab = () => {
  const navigate = useNavigate()
 
  const ownerId = useOwnerStore((state) => state.ownerId)
// fetcher function
const fetchRiskZones = async (ownerId) => {
  if (!ownerId) return []

  const response = await apiClient.resourceAction({
    resourceId: "RiskZone",
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

  // ✅ ใช้ swr แทน useEffect
  const { data: riskZones = [], error, isLoading } = useSWR(
    ownerId ? ["riskZones", ownerId] : null,
    () => fetchRiskZones(ownerId)
  )
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
    navigate(`/admin/resources/RiskZone/actions/new`)
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
        ข้อมูลระวางสาธารณะ
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
      <th className="px-4 py-2 border-b">ชื่อโซน</th>
      <th className="px-4 py-2 border-b">ประเภทโซน</th>
      <th className="px-4 py-2 border-b">รายละเอียด</th>
      <th className="px-4 py-2 border-b">สถานะ</th>
      <th className="px-4 py-2 border-b">Action</th>
    </tr>
  </thead>
  <tbody>
    {riskZones.length > 0 ? (
      riskZones.map((zone) => (
        <tr key={zone.id} className="hover:bg-gray-50">
          <td className="px-4 py-2 border-b">{zone.name_zone || "—"}</td>
          <td className="px-4 py-2 border-b">{zone.zoneType || "—"}</td>
          <td className="px-4 py-2 border-b">{zone.description || "—"}</td>
          <td className="px-4 py-2 border-b">{zone.status || "—"}</td>
          <td className="px-4 py-2 border-b flex space-x-2">
            {/* 👁 Show */}
            <button
              onClick={() =>
                navigate(`/admin/resources/RiskZone/records/${zone.id}/show`)
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
          colSpan={5}
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

export default RiskZoneTab
