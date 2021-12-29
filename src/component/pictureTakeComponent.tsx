import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd/lib/upload'

export type PicturesWall =Omit<UploadProps,"children"> & {
    setUrl: (val:any)=> void;
}
function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const PicturesWall = ({setUrl,...props}:PicturesWall) =>{
    const fill = props.fileList?.at(0)
    const [Param,setParams]=useState({
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        ishandle:false,
    })
    const [file,setFile] =useState({
      uid: '',
      name: '',
      status: '',
      length: 0,
    })


  const handleCancel = () => setParams({ ...Param,previewVisible: false });

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setParams({...Param,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

    const handleChange = async (File: any) => {
      setFile({uid:File.file.uid,name:File.file.name,status:File.file.status,length:File.fileList.length})
    console.log("File",File)
    setUrl(File.fileList[0].originFileObj)
    setParams({...Param,ishandle:true})
    };


  const uploadButton = ()=>{}
    <div>
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>

    return (
      <>
      <div>
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
      
        <Upload
          listType="picture-card"
          onChange={handleChange}
          onPreview={handlePreview}
        >
          {file.length===0?uploadButton:""}
        </Upload>
        <Modal
          visible={Param.previewVisible}
          title={Param.previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={Param.previewImage} />
        </Modal>
      </>
    );
  
}
export default PicturesWall
