import {http} from "../utils"

export default async function historySearch(username: string, studentId: string) {
    let from_data = new FormData()
    from_data.append("username", username)
    from_data.append('studentId',studentId)

    const data = await http.post("history_search", from_data)

    return data


}