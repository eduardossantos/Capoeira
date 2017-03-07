package br.com.suic.vadiando;

import android.icu.text.LocaleDisplayNames;
import android.widget.EditText;

import br.com.suic.vadiando.models.Roda;

/**
 * Created by Icons4u TI on 07/03/2017.
 */

public class NovaRodaHelper {

    private final EditText campoFoto;
    private final EditText campoDescricao;
    private final EditText campoResponsavel;
    private final EditText campoLocal;
    private final EditText campoUf;
    private final EditText campoObservacoes;
    private final EditText campoDataHora;

    public NovaRodaHelper(NovaRodaActivity activity){
        campoFoto = (EditText) activity.findViewById(R.id.nova_roda_foto);
        campoDescricao = (EditText) activity.findViewById(R.id.nova_roda_descricao);
        campoLocal = (EditText) activity.findViewById(R.id.nova_roda_local);
        campoUf = (EditText) activity.findViewById(R.id.nova_roda_uf);
        campoResponsavel = (EditText) activity.findViewById(R.id.nova_roda_responsavel);
        campoObservacoes = (EditText) activity.findViewById(R.id.nova_roda_observacoes);
        campoDataHora = (EditText) activity.findViewById(R.id.nova_roda_data_Hora_inicio);
    }
    public Roda getRoda(){

        Roda roda = new Roda();
        roda.setUrlFoto(campoFoto.getText().toString());
        roda.setDescricao(campoDescricao.getText().toString());
        roda.setResponsavel(campoResponsavel.getText().toString());
        roda.setLocal(campoLocal.getText().toString());
        roda.setUf(campoUf.getText().toString());
        roda.setObservacoes(campoObservacoes.getText().toString());
        roda.setDataHora(campoDataHora.getText().toString());
        return roda;
    }
}
