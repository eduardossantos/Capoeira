package br.com.suic.vadiando;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import java.util.List;

import br.com.suic.vadiando.dao.UsuarioDAO;
import br.com.suic.vadiando.models.Roda;

public class ListaDeRodasActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lista_de_rodas);
        UsuarioDAO dao = new UsuarioDAO(this);
        List<Roda> listaDeRodas =  dao.buscaRodas();


    }
}
