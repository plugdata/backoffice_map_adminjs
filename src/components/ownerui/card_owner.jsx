import React, { useEffect, useState } from "react"
import { useOwnerStore } from "./lib/ownerStore"
import { ApiClient } from "adminjs"

export default function CardOwner() {
  const ownerId = useOwnerStore((state) => state.ownerId)   // ได้ ownerId จาก store
  const [ownerData, setOwnerData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const api = new ApiClient()

  useEffect(() => {
    const fetchOwner = async () => {
      if (!ownerId) {
        setOwnerData(null)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        // ✅ ดึง owner record เดียว
        const res = await api.recordAction({
          resourceId: "Owner",   // 👈 resource ที่ register ใน AdminJS
          recordId: ownerId,     // 👈 ใช้ record id
          actionName: "show",    // 👈 action show
        })

        console.log("🔍 owner record:", res?.data?.record)

        setOwnerData(res?.data?.record?.params || null)
      } catch (err) {
        console.error("❌ Fetch error:", err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchOwner()
  }, [ownerId])

  if (!ownerId) return <p className="text-gray-500">❌ ไม่มี Owner ID</p>
  if (loading) return <p className="text-gray-500">⏳ กำลังโหลด...</p>
  if (error) return <p className="text-red-500">❌ โหลดข้อมูลผิดพลาด</p>
  if (!ownerData) return <p className="text-gray-500">❌ ไม่พบข้อมูลเจ้าของ</p>

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold border-b pb-2">ข้อมูลเจ้าของ</h2>

      <Field
        label="ชื่อ - นามสกุล"
        value={`${ownerData.title_owner || ""} ${ownerData.first_name || ""} ${ownerData.last_name || ""}`.trim() || "—"}
      />

      <Field
        label="เลขบัตรประชาชน / เบอร์โทร"
        value={`${ownerData.number_no || "—"} / ${ownerData.phone || "—"}`}
      />

      <Field
        label="ที่อยู่"
        value={[
          ownerData.no_id ? `บ้านเลขที่ ${ownerData.no_id}` : null,
          ownerData.road ? `ถนน ${ownerData.road}` : null,
          ownerData.subdistrict ? `ตำบล ${ownerData.subdistrict}` : null,
          ownerData.district ? `อำเภอ ${ownerData.district}` : null,
          ownerData.province ? `จังหวัด ${ownerData.province}` : null,
          ownerData.postcode ? `รหัสไปรษณีย์ ${ownerData.postcode}` : null,
        ]
          .filter(Boolean)
          .join(" ")}
      />

      <Field
        label="หน่วยงาน"
        value={`${ownerData.org_name || "—"} ${ownerData.org_address || ""}`}
      />
    </div>
  )
}

/* Field Component */
function Field({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-base text-gray-800">
        {value && value.trim() !== "" ? value : "—"}
      </p>
    </div>
  )
}
