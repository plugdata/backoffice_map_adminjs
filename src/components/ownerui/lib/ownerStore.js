import { create } from "zustand"

export const useOwnerStore = create((set) => ({
  ownerId: null, // ค่าเริ่มต้น

  // โหลดจาก localStorage แค่ตอน init
  initOwnerId: () => {
    const savedId = localStorage.getItem("ownerId")
    if (savedId) {
      set({ ownerId: savedId })
    }
  },

  setOwnerId: (id) => {
    set({ ownerId: id })   // ✅ update state ก่อน
    if (id) {
      localStorage.setItem("ownerId", id)
    } else {
      localStorage.removeItem("ownerId")
    }
  },

  clearOwnerId: () => {
    set({ ownerId: null })
    localStorage.removeItem("ownerId")
  },
}))
