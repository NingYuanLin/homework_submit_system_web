import {http} from "../utils"

export default async function uploadFile(username: string, studentId: string, file: any, file_params: any) {
    let from_data = new FormData()
    from_data.append("username", username)
    from_data.append('studentId', studentId)
    from_data.append('file', file)

    console.log(file_params)

    const onUploadProgress = (progressEvent: any) => {
        let num = progressEvent.loaded / progressEvent.total * 100 | 0;  //百分比
        file_params.onProgress({percent: num})     //进度条
    }

    const data = await http.postWithOnUploadProgress("upload_file", onUploadProgress, from_data)

    return data


}