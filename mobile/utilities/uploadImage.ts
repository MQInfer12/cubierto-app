import * as ImagePicker from 'expo-image-picker';

const UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUDNAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUDNAME;

export const sendCloudinary = async (
  val: ImagePicker.ImagePickerAsset, 
  progressCB: (progress: number) => any
): Promise<string> => {
  return new Promise((resolve) => {
    const formData = new FormData();
    const fileToSend: any = {
      uri: val.uri,
      type: `test/${val.uri.split('.')[1]}`,
      name: `test.${val.uri.split(".")[1]}`
    };
    formData.append("file", fileToSend);
    formData.append("upload_preset", UPLOAD_PRESET as string);

    const req = new XMLHttpRequest();
    req.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`);
    req.upload.addEventListener('progress', (e) => {
      progressCB((e.loaded / e.total) * 100);
    });

    req.addEventListener('load', () => {
      const res = JSON.parse(req.response);
      progressCB(0);
      resolve(res.url);
    });

    req.send(formData);
  })
}