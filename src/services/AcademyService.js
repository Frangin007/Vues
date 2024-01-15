//eslint-disable-next-line
import Api from '@/services/Api'

export default {
    // Videos routes
    createVideos(payload) {
        return Api().post(`/academy/videos`, payload)
    },
    getAllVideos(page=0) {
        if (page != 0) {
            return Api().get(`/academy/videos?page=${page}`)
        }
        return Api().get(`/academy/videos`)
    },
    updateVideo(videoId, payload) {
        return Api().post(`/academy/videos/${videoId}`, payload)
    },
    publishVideo(videoId) {
        return Api().get(`/academy/videos/publish/${videoId}`)
    },
    // Serials routes
    createSerial(payload) {
        return Api().post(`/academy/serials`, payload)
    },
    getAllSerials() {
        return Api().get(`/academy/serials`)
    },
    // Trainers api
    createTrainer(payload) {
        return Api().post(`/academy/trainers`, payload)
    },
    getAllTrainers() {
        return Api().get(`/academy/trainers`)
    },

    // Academy Clients Routes

    getAllClients(page = 0) {
        if (page != 0) {
            return Api().get(`/academy/clients?page=${page}`)
        }
        return Api().get(`/academy/clients`)
    }
}