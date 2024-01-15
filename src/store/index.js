import { createStore } from "vuex";
import authenticationService from '@/services/AuthService';
export default createStore({
    state: {
        url : process.env.VUE_APP_URL,
        currentRoute : '',
        tempObj : null,
        asset_url : process.env.VUE_APP_ASSET_URL,
        academy_asset_url : process.env.VUE_APP_ACADEMY_ASSET_URL
    },
    getters: {
        getRoute : (state)=> {
            return state.currentRoute
        },
        getObj : (state) => {
            return state.tempObj
        },
        getAssetUrl : (state) => {
            return state.asset_url
        },
        getAcademyAssetUrl : (state) => {
            return state.academy_asset_url
        },
    },
    mutations: {
        SET_ROUTE(state, route) {
            if (route) {
                state.route = route
            }
        },
        SET_OBJ (state, obj, count) {
            if (obj.length != 0) {
                state.tempObj = {value : obj, count : count}
            }
        }
    },
    actions: {},
    modules: {
        auth : {
            state : {
                token: sessionStorage.getItem('token') || null,
                userAdmin: sessionStorage.getItem('userAdmin') || null,
                isUserLoggedIn: ((sessionStorage.getItem('token') && sessionStorage.getItem('userAdmin') ? true : false )) || false,
                //stateUpdate : false,
                imgUrl : process.env.VUE_APP_IMG_URL || null
        
            },
            getters : {
                getUrl:(state) => {
                    return state.url
                },
                getImgUrl:(state) => {
                    return state.imgUrl
                },
                isAuthenticated:(state) => {
                    return state.isUserLoggedIn
                },
                getToken:(state) => {
                    return state.token
                },
                currentUser:(state) => {
                    return state.userAdmin
                },
            
            },
            mutations : {
                SET_TOKEN(state, token) {
                    state.token = token
                    if (token) {
                        state.isUserLoggedIn = true
                    } else {
                        state.isUserLoggedIn = false
                    }
                },
                SET_USER_DATA(state, data) {
                    state.userAdmin = data
                },
                CLEAR_AUTH(state) {
                    state.token = null
                    state.userAdmin = null
                    state.isUserLoggedIn = false
                },

            },
            actions : {
                signIn({ commit }, credentials) {
                    return new Promise((resolve, reject) => {
                        authenticationService.signIn(credentials)
                        .then(({ data }) => {
                            console.log(data);
                            if (data.error) {
                                resolve(data);
                                return;
                            }
                            sessionStorage.setItem('token', data.token)
                            commit('SET_TOKEN', data.token)
                            sessionStorage.setItem('userAdmin', JSON.stringify(data.data))
                            commit('SET_USER_DATA', JSON.stringify(data.data))
                            //commit('SET_USER_DATA', data.data)
                            resolve(data)
                        })
                        .catch((err) => reject(err))
                    })
                },
                getCurrentUser({ commit }, credentials) {
                    return new Promise((resolve, reject) => {
                        authenticationService.me(credentials)
                        .then(({ data }) => {
                            console.log(data);
                            sessionStorage.setItem('userAdmin', JSON.stringify(data.data))

                            commit('SET_USER_DATA', JSON.stringify(data.data))
                            //commit('SET_USER_DATA', data.data)

                            resolve(data)
                        })
                        .catch((err) => reject(err))
                    })
                },
                signOut({ commit }) {
                    sessionStorage.removeItem('token')
                    sessionStorage.removeItem('userAdmin')
                    sessionStorage.clear()
                    commit('CLEAR_AUTH')
                    return true;
                },
            
            }
        }
    },
});
