package br.com.suic.vadiando.dao;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

/**
 * Created by Icons4u TI on 07/03/2017.
 */

public class UsuarioDAO extends SQLiteOpenHelper{
    public UsuarioDAO(Context context) {
        super(context, "Vadiando", null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String sql = "CREATE TABLE Usuario(id INTEGER PRIMARY KEY, email TEXT, senha TEXT, nome TEXT, uf TEXT, sexo INTEGER, nascimento TEXT);" +
                "CREATE TABLE Roda(id INTEGER PRIMARY KEY, local TEXT, responsavel TEXT, data TEXT, hora TEXT, observacoes TEXT, foto TEXT,descricao TEXT);" +
                "CREATE TABLE Confirmados(idUsuario INTEGER ,idRoda INTEGER," +
                "FOREIGN KEY(idUsuario) REFERENCES Usuario(id)," +
                "FOREIGN KEY(idRoda) REFERENCES Roda(id));";
        db.execSQL(sql);

    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        String sql = "DROP TABLE IF EXISTS Usuario;" +
                     "DROP TABLE IF EXISTS Roda;" +
                     "DROP TABLE IF EXISTS Confirmados;";
        onCreate(db);

    }
}
