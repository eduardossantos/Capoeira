package br.com.suic.vadiando;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

import static br.com.suic.vadiando.R.id.senha;

public class FormularioActivity extends AppCompatActivity {
    final Context contexto = this;
    FormularioHelper  helper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_formulario);
         helper = new FormularioHelper(this);

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_formulario,menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        switch (item.getItemId()){
            case R.id.menu_formulario_ok:


                Intent intent = new Intent(contexto,RodasActivity.class);
                intent.putExtra(helper.getEmail(),true);
                intent.putExtra(helper.getSenha(),true);
                startActivity(intent);
                finish();
                break;
        }


        return super.onOptionsItemSelected(item);
    }
}
