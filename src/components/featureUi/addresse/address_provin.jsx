import React, { useState, useEffect } from "react";
import { Box, Label, Select } from "@adminjs/design-system";
import { useTranslation } from 'adminjs' // ✅ hook แปลภาษา
import { address } from "../lib/storeAddress";
const AddressSelect = ({ onChange, record, property }) => {
  const { provinces, setProvinces } = address();
  const { translateProperty } = useTranslation()
  useEffect(() => {
    fetch("/api/address/provinces")
      .then(r => r.json())
      .then(data => setProvinces(data));
  }, []);

  // ✅ หาค่า selected object จาก record.params
  const selected = provinces.find(p => p.value === record.params[property.name]) || null;

  return (
    <Box>
      <Label>{translateProperty(property.label, property.resourceId)}</Label>
      <Select
        value={selected}
        options={provinces}
        onChange={option => {
          onChange(property.name, option ? option.value : null);
        }}
        placeholder={property.props?.placeholder}
        style={{ width: "100%" }}
      />
    </Box>
  );
};

export default AddressSelect;
