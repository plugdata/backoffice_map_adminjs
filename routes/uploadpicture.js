import express from "express"
import multer from "multer"
import path from "path"
import fs from "fs"

const router = express.Router()

const __dirname = path.resolve()
const uploadsDir = path.join(__dirname, "public", "uploads", "images")

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
  console.log("📁 Created folder:", uploadsDir)
}

const upload = multer({ dest: "temp/" })

// 📤 Upload image
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" })

  const tempPath = req.file.path
  const ext = path.extname(req.file.originalname)
  const newFilename = `${Date.now()}${ext}`
  const targetPath = path.join(uploadsDir, newFilename)

  fs.rename(tempPath, targetPath, (err) => {
    if (err) {
      console.error("❌ Failed to save file:", err)
      return res.status(500).json({ error: "Failed to save file" })
    }

    const imageUrl = `/uploads/images/${newFilename}`
    console.log("✅ Uploaded:", imageUrl)
    res.json({ url: imageUrl })
  })
})



// 📋 Get all images
// ✅ ต้องอยู่ก่อนเสมอ
router.get("/list-images", (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error("❌ Failed to read upload directory:", err)
      return res.status(500).json({ error: "Failed to read upload directory" })
    }

    const imageList = files.map((filename) => ({
      name: filename,
      url: `/uploads/images/${filename}`,
    }))

    res.json({ count: imageList.length, images: imageList })
  })
})

// 👇 ควรอยู่ล่างสุด
router.get("/:filename", (req, res) => {
  const { filename } = req.params
  const filePath = path.join(uploadsDir, filename)

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" })
  }

  res.sendFile(filePath)
})


export default router
