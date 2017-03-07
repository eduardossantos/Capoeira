package br.com.suic.vadiando;

import android.widget.EditText;

import br.com.suic.vadiando.models.Usuario;

/**
 * Created by Icons4u TI on 07/03/2017.
 */

public class NovoAquiHelper {


    private final EditText campoApelido;
    private final EditText campoEmail;
    private final EditText campoSenha;
    private final EditText campoUf;
    private final EditText campoNascimento;


    public NovoAquiHelper(NovoAquiActivity activity){
        campoApelido = (EditText) activity.findViewById(R.id.novo_aqui_apelido);
        campoEmail = (EditText) activity.findViewById(R.id.novo_aqui_email);
        campoSenha = (EditText) activity.findViewById(R.id.novo_aqui_senha);
        campoUf = (EditText) activity.findViewById(R.id.novo_aqui_uf);
        campoNascimento = (EditText) activity.findViewById(R.id.novo_aqui_data_nascimento);
    }

    public Usuario getUsuario(){

        Usuario usuario = new Usuario();
        usuario.setApelido(campoApelido.getText().toString());
        usuario.setEmail(campoEmail.getText().toString());
        usuario.setSenha(campoSenha.getText().toString());
        usuario.setUf(campoUf.getText().toString());
        usuario.setNascimento(campoNascimento.getText().toString());
        return usuario;

    }
}
