import Api from '@/services/Api'

export default {
    getAllClients() {
        return Api().get(`/clients`)
    },
    getClientProgram(program, page=0) {
        if (page != 0) {
            return Api().get(`/clients/${program}?page=${page}`)
        }
        return Api().get(`/clients/${program}`)
    },
    getOrgClientProgram(program, page=0) {
        if (page != 0) {
            return Api().get(`/clients/org/${program}?page=${page}`)
        }
        return Api().get(`/clients/org/${program}`)
    },
    getOrgClientProgramData(orgId, page=0) {
        if (page != 0) {
            return Api().get(`/clients/org/${orgId}?page=${page}`)
        }
        return Api().get(`/clients/org/${orgId}`)
    },
    sendAssessmentLink(payload, clientId) {
        return Api().post(`/clients/test/${clientId}`, payload)
    },
    remindAssessment(clientId) {
        return Api().get(`/clients/remindTest/${clientId}`)
    },
    assessmentTaken(clientId) {
        return Api().get(`/clients/takenTest/${clientId}`)
    },
    generateProfile(payload) {
        return Api().post(`/clients/BrainProfile`, payload)
    },
    getProfileStatus(clientId) {
        return Api().get(`/clients/BrainStatus/${clientId}`)
    },
    sendPackageProfile(clientId) {
        return Api().get(`/clients/sendPackage/${clientId}`)
    },
    downloadPackageProfile(fileId) {
        //return Api().get(`${process.env.VUE_APP_LINK}clients/download/${fileId}`)
        return `${process.env.VUE_APP_URL}${process.env.VUE_APP_LINK}clients/download/${fileId}`
        //return `clients/download/${fileId}`
    },
    createClientOrg(payload) {
        return Api().post(`/clients/org`, payload)
    },
    createClient(payload) {
        return Api().post(`/clients`, payload)
    },

}