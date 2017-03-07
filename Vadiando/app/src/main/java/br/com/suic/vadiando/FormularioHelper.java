package br.com.suic.vadiando;

import android.app.Activity;
import android.widget.EditText;

/**
 * Created by Icons4u TI on 06/03/2017.
 */

public class FormularioHelper {
    EditText userMail;
    EditText userSenha;

    public FormularioHelper(FormularioActivity activity){
         userMail = (EditText) activity.findViewById(R.id.emailLogin);
         userSenha = (EditText) activity.findViewById(R.id.senhaLogin);
    }

    public String getEmail() {
       String email =  userMail.getText().toString();
        return  email;

    }

    public String getSenha() {
        String senha= userSenha.getText().toString();
        return senha;
    }
}
