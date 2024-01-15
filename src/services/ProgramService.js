import Api from '@/services/Api';
export default {
    getAllProgram() {
        return Api().get(`/program`)
    },
    /*getClientProgram(program) {
        return Api().get(`${process.env.VUE_APP_URL}/clients/${program}`)
    },*/
    // Package Routes
    getAllPackage() {
        return Api().get(`/package`)
    },
}