const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDNAME = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;

export const sendCloudinary = async (
  file: File,
  progressCB: (progress: number) => any
): Promise<string> => {
  return new Promise((resolve) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET as string);

    const req = new XMLHttpRequest();
    req.open("POST", `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`);
    req.upload.addEventListener("progress", (e) => {
      progressCB((e.loaded / e.total) * 100);
    });

    req.addEventListener("load", () => {
      const res = JSON.parse(req.response);
      progressCB(0);
      resolve(res.url);
    });

    req.send(formData);
  });
};
