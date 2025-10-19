import React from 'react'
import { Box } from '@adminjs/design-system'
import { useEffect } from 'react'
const SetUploadFile = ({ record, onChange }) => {
  //const { params } = record?.params
  
  useEffect(() => {
    console.log('🧭 testparams', record?.params?.id)
  }, [record])

}

const UploadFile = ({ record }) => {
  return <SetUploadFile record={record} />
}


export default UploadFile