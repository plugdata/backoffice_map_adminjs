import React, { useState, useEffect } from 'react';
import { Box, Select, Label, Text } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';

const api = new ApiClient();

const StatusSelect = ({ 
  value, 
  onChange, 
  placeholder = "เลือกสถานะ", 
  label = "สถานะ",
  disabled = false,
  required = false 
}) => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // เรียก API เพื่อดึงข้อมูล Status ทั้งหมด
        const response = await api.resourceAction({
          resourceId: 'Status',
          actionName: 'list',
          data: {
            page: 1,
            perPage: 100, // ดึงข้อมูลทั้งหมด
          }
        });

        if (response.data && response.data.records) {
          const statusOptions = response.data.records.map(status => ({
            value: status.params.id,
            label: status.params.name_titel
          }));
          setStatuses(statusOptions);
        } else {
          setStatuses([]);
        }
      } catch (err) {
        console.error('Error fetching statuses:', err);
        setError('ไม่สามารถโหลดข้อมูลสถานะได้');
        setStatuses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, []);

  const handleChange = (selectedValue) => {
    if (onChange) {
      onChange(selectedValue);
    }
  };

  if (loading) {
    return (
      <Box>
        {label && <Label>{label}</Label>}
        <Select
          disabled
          placeholder="กำลังโหลด..."
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        {label && <Label>{label}</Label>}
        <Text variant="sm" color="error">
          {error}
        </Text>
        <Select
          disabled
          placeholder="เกิดข้อผิดพลาด"
        />
      </Box>
    );
  }

  return (
    <Box>
      {label && (
        <Label>
          {label}
          {required && <Text as="span" color="error"> *</Text>}
        </Label>
      )}
      <Select
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        options={statuses}
      />
    </Box>
  );
};

export default StatusSelect;