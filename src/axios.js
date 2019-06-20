import axios from 'axios'

const instance = axios.create({
    baseURL:'https://to-do-list-299ec.firebaseio.com/'
})

export default instance