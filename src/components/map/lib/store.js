// /components/map/lib/store.js
import { create } from "zustand"

export const useMapStore = create((set, get) => ({
  // Address
  name_local: "",
  house_no: "",
  road: "",
  subdistrict: "",
  district: "",
  province: "",
  postcode: "",

  // LatLng (default only once)
  latitude: 7.559,
  longitude: 99.611,

  // Layer
  colors: "#ff0000",
  data: null,   // object หรือ string
  geom: null,   // ใช้แสดงใน textarea

  // Setters
  setLatLng: (latitude, longitude) => {
    set({ latitude, longitude })
  },
  setAddress: (addr) => set(addr),

  setColor: (colors) => {
    set({ colors })
  },
  setColors: (colors) => {
    set({ colors })
  },

  setData: (data) => {
    set({ data })
  },
  setGeom: (geom) => {
    set({ geom })
  },

  setHouseNo: (house_no) => set({ house_no }),
  setRoad: (road) => set({ road }),
  setSubdistrict: (subdistrict) => set({ subdistrict }),
  setDistrict: (district) => set({ district }),
  setProvince: (province) => set({ province }),
  setPostcode: (postcode) => set({ postcode }),
  setNameLocal: (name_local) => set({ name_local }),


  // Getter function to see current state
  getState: () => {
    return get()
  },


}))
