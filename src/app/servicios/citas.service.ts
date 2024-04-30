import { Injectable } from "@angular/core";

import {SQLiteConnection, CapacitorSQLite, SQLiteDBConnection} from "@capacitor-community/sqlite";
import {Capacitor} from "@capacitor/core";



@Injectable({
  providedIn: "root",
})
export class CitasService {

  sqlite:SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  db!: SQLiteDBConnection;

  plataforma: string      = ""

  DB_NAME: string         = "listado_citas";
  DB_ENCRIPTADA: boolean  = false;
  DB_MODE: string         = "no-encryption";
  DB_VERSION: number      = 1;
  DB_READ_ONLY: boolean   = false;
  TABLE_NAME: string      = "listado_citas";
  DB_SQL_TABLAS: string   = `
    CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      frase TEXT NOT NULL,
      autor TEXT
    );
  `;

  constructor() {

  }

  async init(): Promise<void> {
    await this.iniciarPlugin().catch((err) => console.error(err));
  }

  private async _iniciarPluginWeb(): Promise<void> {
    await customElements.whenDefined('jeep-sqlite')
    const jeepSqliteEl = document.querySelector('jeep-sqlite')
    if (jeepSqliteEl != null) {
      await this.sqlite.initWebStore()
    }
  }

  async iniciarPlugin() {
    this.plataforma = Capacitor.getPlatform()
    if( this.plataforma == "web") {
      await this._iniciarPluginWeb()
    }
    await this.abrirConexion()
    await this.db.execute(this.DB_SQL_TABLAS)
  }

  async abrirConexion() {
    const ret = await this.sqlite.checkConnectionsConsistency()
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result
    if(ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY)
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      )
    }
    await this.db.open()
  }

  async obtenerTodasLasCitas() {
    const res = await this.db.query(`SELECT * FROM ${this.TABLE_NAME}`);
    return res.values;
  }

  async agregarCitas(cita: { frase: string; autor: string }): Promise<void> {
    const sql = `INSERT INTO ${this.TABLE_NAME} (frase, autor) VALUES (?, ?)`;
    await this.db.run(sql, [cita.frase, cita.autor]);
  }

  async eliminarCita(id: number): Promise<void> {
    const sql = `DELETE FROM ${this.TABLE_NAME} WHERE id = ?`;
    await this.db.run(sql, [id]);
  }

  async obtenerCitasAleatorias(): Promise<any> {
    const res = await this.db.query(`SELECT * FROM ${this.TABLE_NAME} ORDER BY RANDOM() LIMIT 1`);
    return res && res.values && res.values.length > 0 ? res.values[0] : null;
  }
}
