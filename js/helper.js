async function imageToBase64(image) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(image);
  });
}

function formDataToJson(formData) {
  const entries = formData.entries();
  const data = Object.fromEntries(entries);
  return data;
}
