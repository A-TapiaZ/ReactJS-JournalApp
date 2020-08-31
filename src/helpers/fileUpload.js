
export const fileUpload= async (file) => {
  
  const cloudUrl= `https://api.cloudinary.com/v1_1/dt9ip7rkj/upload`; 

  const formData= new FormData();
  formData.append(`upload_preset`, `react-journal`)
  formData.append(`file`, file)

  /**Como es muy posible que falle usaremos un tryCatch */

  try {
    const resp= await fetch( cloudUrl, {
      method:'POST',
      body: formData,
    });

    if (resp.ok) {
      const cloudResp= await resp.json();
      return cloudResp.secure_url;
    } else{
      throw await resp.json();
    }
  } catch (error) {
    throw await error.json();
  }


  // return url de la imagen
}
