import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { userLoggedIn } from "../authSlice"



const USER_API = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/`



export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:USER_API,
        credentials:"include"
    }),
    endpoints:(builder)=>({
        registerUser: builder.mutation({ // for posting data we use mutation, for fetching data we use query
            query: (inputData)=>({
                url:"register",        // endpoint + route
                method:"POST",
                body:inputData                
            })
        }),
        loginUser: builder.mutation({
            query: (inputData)=>({
                url:"login",
                method:"POST",
                body:inputData                
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}){ // no use of arg so "_"
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}))
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        loadUser: builder.query({
            query: ()=>({
                url:"profile",
                method:"GET"
            })
        }),
        updateUser: builder.mutation({
            query: (formData)=>({
                url:"profile/update",
                method:"PUT",
                body:formData,
                credentials:"include"
            })
        })
    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation
} = authApi