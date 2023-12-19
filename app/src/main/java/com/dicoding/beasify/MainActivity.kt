package com.dicoding.beasify

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.OpenableColumns
import android.provider.Settings
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import com.dicoding.beasify3.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private val PICK_FILE_REQUEST_CODE = 1001

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding  = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupAction()

        val buttonUploadFile: Button = findViewById(R.id.buttonUploadFile)
        buttonUploadFile.setOnClickListener {
            openFileManager()
        }
 main


        val toolbar: androidx.appcompat.widget.Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)

        toolbar.setOnMenuItemClickListener { item ->
            when (item.itemId) {
                R.id.about -> {
                    startActivity(Intent(this, SettingActivity::class.java))
                    true
                }
                else -> super.onOptionsItemSelected(item)
            }
        }
 main
    }

    private fun setupAction() {
        binding.settingImageView.setOnClickListener {
            startActivity(Intent(Settings.ACTION_LOCALE_SETTINGS))
        }
    }

    private fun openFileManager() {
        val intent = Intent(Intent.ACTION_GET_CONTENT)
        intent.type = "*/*" // Memilih semua jenis file
        startActivityForResult(intent, PICK_FILE_REQUEST_CODE)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == PICK_FILE_REQUEST_CODE && resultCode == RESULT_OK) {
            if (data != null) {
                val selectedFileUri: Uri? = data.data
                selectedFileUri?.let {
                    val fileName = getFileName(it)
                    val textViewFileName: TextView = findViewById(R.id.textViewFileName)
                    textViewFileName.text = "File yang dipilih: $fileName"
                    Toast.makeText(this, "File yang dipilih: $fileName", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    private fun getFileName(uri: Uri): String {
        var result: String? = null
        if (uri.scheme == "content") {
            contentResolver.query(uri, null, null, null, null)?.use { cursor ->
                if (cursor.moveToFirst()) {
                    result = cursor.getString(cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME))
                }
            }
        }
        if (result == null) {
            result = uri.path
            val cut = result?.lastIndexOf('/')
            if (cut != -1) {
                result = result?.substring(cut!! + 1)
            }
        }
        return result ?: "Unknown"
    }

}
