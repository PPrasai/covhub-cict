import { EventEmitter, Injectable } from "@angular/core";
import { AllDocs } from '../../@models/db/all-docs.model';
import { BulkAddResponse } from '../../@models/db/response.model';
import { PSchema } from '../../@models/db/schema/pschema.model';
import { Databases, Doc, ExistingDoc } from '../../@models/domain.model';
import { DBService } from './db.service.interface';
import { PouchDBService } from './pouchdb.service';

@Injectable({
  providedIn: 'root',
})
export class FormB1DataService implements DBService {
  private formB1DB = Databases.form_b1;
  private formB1Headers_: string[][];

  constructor(private dbService: PouchDBService) {
    this.instance();
    this.remoteSync();
  }

  get headers(): string[][] { return this.formB1Headers_; }

  // Async functions to interface with the DB
  async getAll() {
    const requestQuery = {
      include_docs: true,
      limit: 80,
    };

    const locAllDocs = await this.instance()?.allDocs(requestQuery) as AllDocs.Root;
    if (locAllDocs.rows.length != 0) return locAllDocs;
    const response = await this.dbService?.getRemoteDBInstance(this.formB1DB)?.allDocs(requestQuery) as AllDocs.Root;
    return response
  }

  async addAll(docs: Doc[]): Promise<BulkAddResponse | undefined> {
    console.log('running async addAll()');
    return this.dbService.addAll(this.formB1DB, docs);
  }

  async getTableHeaders(current = 'pschema:form-a'): Promise<string[][]> {
    console.log('running async getTableHeaders()');
    if (this.formB1Headers_) return Promise.resolve(this.formB1Headers_);
    try {
      const response = await this.get(current) as PSchema;
      console.log('Got TableHeaders:');
      console.log(response.fields);
      return (this.formB1Headers_ = response.fields);
    } catch (error) {
      throw Error('Form A table headers could not be fetced');
    }
  }

  // Implementations for DBService
  instance(): PouchDB.Database<{}> | undefined{
    return this.dbService.instance(this.formB1DB);
  }

  remoteSync(): EventEmitter<any> | undefined {
    return this.dbService?.remoteSync(this.formB1DB);
  }

  getChangeListener(): EventEmitter<any> | undefined {
    return this.dbService?.getChangeListener(this.formB1DB);
  }

  get(id: string): Promise<any> | undefined {
    return this.dbService?.get(this.formB1DB, id);
  }

  create(doc: ExistingDoc): Promise<any> {
    return this.dbService.create(this.formB1DB, doc);
  }

  update(doc: ExistingDoc): Promise<any> {
    return this.dbService.update(this.formB1DB, doc);
  }

  delete(doc: ExistingDoc): Promise<any> {
    return this.dbService.delete(this.formB1DB, doc);
  }
}
