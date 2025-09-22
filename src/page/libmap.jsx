import React, { useState, useEffect } from "react"
import { Box, Button, Input, ValueGroup, Text } from "@adminjs/design-system"

const CenterPopup = (props) => {
  const { record, property, onChange } = props

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [recordId, setRecordId] = useState("")

  useEffect(() => {
    // ✅ ดึงจาก props (ถ้ามี)
    if (record?.id) {
      setRecordId(record.id)
    } else {
      // ✅ ถ้าไม่มี record → ดึงจาก URL
      const pathParts = window.location.pathname.split("/")
      const idIndex = pathParts.indexOf("records") + 1
      if (idIndex > 0) {
        setRecordId(pathParts[idIndex])
      }
    }

    // preload ค่า property
    if (record?.params?.[property?.path]) {
      setValue(record.params[property.path])
    }
  }, [record, property])

  const handleSubmit = () => {
    console.log("📌 Submit:", { recordId, value })

    if (onChange) {
      onChange(property.path, value)
      onChange("recordId", recordId) // ส่งค่า id เข้าไปด้วย
    }
    setOpen(false)
  }

  return (
    <Box>
      <Button type="button" variant="primary" onClick={() => setOpen(true)}>
        Add existing item
      </Button>

      {open && (
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <Box
            variant="white"
            border="default"
            style={{
              width: "400px",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="lg">
              <Text as="h2">Add existing item</Text>
              <Button type="button" size="icon" variant="text" onClick={() => setOpen(false)}>
                ✕
              </Button>
            </Box>

            <ValueGroup label="Record ID">
              <Input value={recordId} disabled /> {/* ✅ แสดง id */}
            </ValueGroup>

            <ValueGroup label="Select an item to add">
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type to search...หหหหกหกหก"
              />
            </ValueGroup>

            <Box display="flex" justifyContent="flex-end" gap="md" mt="lg">
              <Button type="button" variant="text" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="button" variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default CenterPopup
