package com.dicoding.beasify.data

import retrofit2.Call
import retrofit2.http.GET

interface ApiEndpoint {
    @GET("/posts/1")
    fun getApi(): Call<Api>
}