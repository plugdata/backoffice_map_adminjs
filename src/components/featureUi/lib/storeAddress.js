import { create } from 'zustand'

export const address =  create((set,get)=>({

  province:"",
  district:"",
  amphoe:"",
  zipcode:"",
  subdistrict:"",

  provinces: [],   // ✅ ต้องมี default
  districts: [],
  amphoes: [],
  zipcodes: [],
  subdistricts: [],
  
        setAddress:(address)=>set({address}),
        setProvinces:(provinces)=>set({provinces}),
        setDistricts:(districts)=>set({districts}),
        setAmphoes:(amphoes)=>set({amphoes}),
        setZipcodes:(zipcodes)=>set({zipcodes}),
        setSubdistrict:(subdistrict)=>set({subdistrict}),

}))
