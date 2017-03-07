package br.com.suic.vadiando;

/**
 * Created by Icons4u TI on 07/03/2017.
 */

public class NovoAquiHelper {

    private int id;
    private String apelido;
    private String email;
    private String senha;
    private String uf;
    private String sexo;
    private String nascimento;

    public NovoAquiHelper(NovoAquiActivity activity){
        campoApelido = activity.findViewById(R.id.apelido);
        campoEmail = activity.findViewById(R.id.email);
        campoSenha = activity.findViewById(R.id.senha);
        campoUf = activity.findViewById(R.id.uf);
        campoNascimento = activity.findViewById(R.id.novo_aqui_data_nascimento)
    }
}
