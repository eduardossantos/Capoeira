package br.com.suic.vadiando;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.List;

import br.com.suic.vadiando.dao.UsuarioDAO;
import br.com.suic.vadiando.models.Roda;

public class ListaDeRodasActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lista_de_rodas);

        UsuarioDAO dao = new UsuarioDAO(this);
        List<Roda> rodas =  dao.buscaRodas();
        dao.close();

        ListView listaDeRodas = (ListView)findViewById(R.id.lista_de_rodas_lista);
        ArrayAdapter<Roda> adapter = new ArrayAdapter<Roda>(this,android.R.layout.simple_list_item_1,rodas);
        listaDeRodas.setAdapter(adapter);


    }
}
