package com.dicoding.beasify.ui

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.dicoding.beasify.R

class AboutActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_about)
    }

//    private fun showProgressBar(isLoading: Boolean) {
//        binding.progressBar.visibility = if (isLoading) View.VISIBLE else View.GONE
//    }
}