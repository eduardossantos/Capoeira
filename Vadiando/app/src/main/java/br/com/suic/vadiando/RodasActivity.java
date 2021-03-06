package br.com.suic.vadiando;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class RodasActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_rodas);
        final Context contexto = this;

        Button novaRoda = (Button) findViewById(R.id.rodas_nova_roda);
        novaRoda.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(contexto,NovaRodaActivity.class);
                startActivity(intent);
            }
        });

        Button buscaRodas = (Button) findViewById(R.id.rodas_busca_rodas);
        buscaRodas.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(contexto,ListaDeRodasActivity.class);
                startActivity(intent);
                finish();
            }
        });
    }
}
