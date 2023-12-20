package com.dicoding.beasify.data

import retrofit2.Call

class ApiService {

    private val api: ApiEndpoint = RetrofitClient.instance.create(ApiEndpoint::class.java)

    fun getApi(): Call<Api> {
        return api.getApi()
    }
}