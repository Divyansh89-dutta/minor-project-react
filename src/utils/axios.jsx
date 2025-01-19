
import React from 'react'
import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWQ4ZDllZGMyNjUwNjQ5N2Y0MjdmMDlhOTA3ZWMwZSIsIm5iZiI6MTczNjg2NDE4OC43ODQ5OTk4LCJzdWIiOiI2Nzg2NzFiY2JkNzkzYzAzNTQ0ZjAwMmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8zoBoUkXrQvPS6gXMuOqpPuDn_6WohG9avWqxlI4XlE'
      }
})
export default instance;
