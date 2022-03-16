import {http} from "../utils"

export default async function uploadFile(username: string, studentId: string, file: any) {
    let from_data = new FormData()
    from_data.append("username", username)
    from_data.append('studentId',studentId)
    from_data.append('file',file)

    const data = await http.post("upload_file", from_data)

    return data


}