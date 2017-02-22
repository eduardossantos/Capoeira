package br.com.suic.vadiando;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class NovoAquiActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_novo_aqui);
        final Context contexto = this;

        Button enviar = (Button)(findViewById(R.id.novoAquiEnviar));
        enviar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(contexto,RodasActivity.class);
                startActivity(intent);
            }
        });
    }
}
