/*
     all the client- server requst
*/

import axios from "axios";
import { async } from "q";



axios.post('http://localhost:4000/users/create', 3)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ name: '', email: '' })
    