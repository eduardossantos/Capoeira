package br.com.suic.vadiando.dao;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import java.util.ArrayList;
import java.util.List;

import br.com.suic.vadiando.models.Roda;
import br.com.suic.vadiando.models.Usuario;

/**
 * Created by Icons4u TI on 07/03/2017.
 */

public class UsuarioDAO extends SQLiteOpenHelper{
    public UsuarioDAO(Context context) {
        super(context, "Vadiando", null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String sql = "CREATE TABLE Roda(id INTEGER PRIMARY KEY , local TEXT, responsavel TEXT, dataHora TEXT,uf TEXT, foto TEXT,descricao TEXT,observacoes TEXT);";
        db.execSQL(sql);

    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        String sql = "DROP TABLE IF EXISTS Usuario;" +
                     "DROP TABLE IF EXISTS Roda;" +
                     "DROP TABLE IF EXISTS Confirmados;";
        onCreate(db);

    }

    public void inserir(Usuario usuario) {
        SQLiteDatabase db = getWritableDatabase();
        ContentValues dados = new ContentValues();
        dados.put("email",usuario.getEmail());
        dados.put("apelido",usuario.getApelido());
        dados.put("senha",usuario.getSenha());
        dados.put("uf",usuario.getUf());
        dados.put("sexo",usuario.getSexo());
        dados.put("nascimento",usuario.getNascimento());
        db.insert("Usuario",null,dados);
    }

    public void inserirRoda(Roda roda){
        SQLiteDatabase db = getWritableDatabase();
        ContentValues dados = new ContentValues();
        dados.put("local",roda.getLocal());
        dados.put("responsavel",roda.getResponsavel());
        dados.put("dataHora",roda.getDataHora());
        dados.put("uf",roda.getUf());
        dados.put("foto",roda.getfoto());
        dados.put("descricao",roda.getDescricao());
        dados.put("observacoes",roda.getObservacoes());
        db.insert("Roda",null,dados);

    }

    public List<Roda> buscaRodas() {
        String sql = "SELECT * FROM Roda;";
        SQLiteDatabase db = getReadableDatabase();
         Cursor c = db.rawQuery(sql,null);
        ArrayList<Roda> rodas = new ArrayList<Roda>();
        while (c.moveToNext()){
            Roda roda = new Roda();
            roda.setId(c.getLong(c.getColumnIndex("id")));
            roda.setfoto(c.getString(c.getColumnIndex("foto")));
            roda.setDescricao(c.getString(c.getColumnIndex("descricao")));
            roda.setLocal(c.getString(c.getColumnIndex("local")));
            roda.setUf(c.getString(c.getColumnIndex("uf")));
            roda.setResponsavel(c.getString(c.getColumnIndex("responsavel")));
            roda.setDataHora(c.getString(c.getColumnIndex("dataHora")));
            roda.setObservacoes(c.getString(c.getColumnIndex("observacoes")));
            rodas.add(roda);
        }
        c.close();


        return rodas;

    }
}
