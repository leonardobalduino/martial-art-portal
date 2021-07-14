import http from "components/Upload/http-common.js";

class UploadFilesService {
  upload(id, file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return http.put(`/v1/persons/${id}/profile-image/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }
}

export default new UploadFilesService();
