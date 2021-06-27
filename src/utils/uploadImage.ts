import Swal from 'sweetalert2';

export const uploadImage = async (files: any, storeUrl: any, id: string | null) => {
  const formData = new FormData();

  formData.append('file', files as any);
  formData.append(
    'upload_preset',
    process.env.REACT_APP_CLOUDINARY_PRESET as string
  );
  formData.append(
    'cloud_name',
    process.env.REACT_APP_CLOUDINARY_NAME as string
  );

  const cloudinaryResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
    {
      method: 'post',
      body: formData,
    }
  );

  const data = await cloudinaryResponse.json();

  if (!data.secure_url) {
    Swal.fire({
      icon: 'error',
      title: 'Error uploading image',
    });
    return;
  }

  const response = await storeUrl({ url: data.secure_url }, id);

  if (response?.message) {
    Swal.fire({
      icon: 'success',
      title: 'Image Upload successful',
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error uploading image',
    });
  }
};
