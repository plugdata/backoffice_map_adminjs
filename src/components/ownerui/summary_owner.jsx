// ./components/SummaryTab.jsx
import React, { useState, useEffect } from "react"   // ✅ ต้องใส่ useState, useEffect
import { ApiClient } from "adminjs"
import { Box, Badge } from "@adminjs/design-system"

import { Layers3, Building2, ShieldCheck, Map, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useOwnerStore } from "./lib/ownerStore"


const api = new ApiClient()

export default function SummaryTab() {
  const ownerId = useOwnerStore((state) => state.ownerId)
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [bcRes, rzRes, zpRes] = await Promise.all([
          api.resourceAction({ resourceId: "BuildingControl", actionName: "list" }),
          api.resourceAction({ resourceId: "RiskZone", actionName: "list" }),
          api.resourceAction({ resourceId: "ZoningPlan", actionName: "list" }),
        ])
  
        console.log("✅ ownerId จาก store:", ownerId)
  
        // 🔍 log params ของแต่ละ record
        console.log("🔍 BuildingControl params:", bcRes?.data?.records?.map(r => r.params))
        console.log("🔍 RiskZone params:", rzRes?.data?.records?.map(r => r.params))
        console.log("🔍 ZoningPlan params:", zpRes?.data?.records?.map(r => r.params))
  
        // ✅ ฟังก์ชันตรวจ ownerId (ลองทุกชื่อ)
        const matchOwner = (r) => {
          const p = r.params || {}
          return (
            String(p.owner_id) === String(ownerId) ||
            String(p.ownerId) === String(ownerId) ||
            String(p.OwnerID) === String(ownerId) ||
            String(p.owner) === String(ownerId)
          )
        }
  
        // 👉 filter
        const buildingCount = (bcRes?.data?.records || []).filter(matchOwner).length
        const riskCount = (rzRes?.data?.records || []).filter(matchOwner).length
        const zoningCount = (zpRes?.data?.records || []).filter(matchOwner).length
  
        console.log("📊 Result after filter:", { buildingCount, riskCount, zoningCount })
  
        const total = buildingCount + riskCount + zoningCount
  
        setSummary({
          totalAssets: total,
          apis: {
            building: buildingCount,
            publicSafety: riskCount,
            urbanPlan: zoningCount,
          },
          lastUpdate: new Date().toLocaleString("th-TH"),
        })
      } catch (err) {
        console.error("❌ Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
  
    if (ownerId) fetchSummary()
  }, [ownerId])
  
  
  if (loading) return <p>⏳ กำลังโหลด...</p>
  if (!summary) return <p>❌ ไม่มีข้อมูล</p>

  return (
    <Box
      flex
      flexDirection="column"
      mb="xl"
      style={{
        borderTop: "1px solid #e0e0e0",
        borderBottom: "1px solid #e0e0e0",
        padding: "16px 0",
      }}
    >
      {/* หัวข้อ */}
      <h3 style={{ fontSize: "14px", marginBottom: "12px", color: "#555" }}>
        📊 สรุปข้อมูล
      </h3>

      <Box
        flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        style={{ gap: "12px" }}
      >
        {/* 👉 ฝั่งซ้าย */}
        <Box flex flexDirection="row" alignItems="center" style={{ gap: "8px", flexWrap: "wrap" }}>
          <CustomBadge
            icon={<Layers3 size={16} />}
            text={`เอกสารทั้งหมด: ${summary.totalAssets}`}
            variant="primary"
          />
        
        </Box>

        {/* 👉 ฝั่งขวา */}
        <Box
          flex
          flexDirection="row"
          style={{
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          <CustomBadge
            icon={<Building2 size={16} />}
            text={`งานควบคุมอาคาร: ${summary.apis.building}`}
            variant="success"
          />
          <CustomBadge
            icon={<ShieldCheck size={16} />}
            text={`งานระวางสาธารณะ: ${summary.apis.publicSafety}`}
            variant="danger"
          />
          <CustomBadge
            icon={<Map size={16} />}
            text={`งานผังเมือง: ${summary.apis.urbanPlan}`}
            variant="info"
          />
        </Box>
      </Box>

      {/* last update */}
      <span
        style={{
          fontSize: "12px",
          color: "#888",
          marginTop: "10px",
          textAlign: "right",
          display: "block",
        }}
      >
        อัปเดตล่าสุด: {summary.lastUpdate}
      </span>
    </Box>
  )
}

/* Sub-component */
function CustomBadge({ icon, text, variant }) {
  return (
    <Badge
      size="lg"
      variant={variant}
      outline
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontWeight: "500",
        borderRadius: "9999px",
        padding: "6px 14px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"
        e.currentTarget.style.transform = "scale(1.05)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent"
        e.currentTarget.style.transform = "scale(1)"
      }}
    >
      {icon}
      {text}
    </Badge>
  )
}
