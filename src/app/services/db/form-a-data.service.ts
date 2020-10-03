import { EventEmitter, Injectable } from '@angular/core';
import { AllDocs } from '../../@models/db/all-docs.model';
import { BulkAddResponse } from '../../@models/db/response.model';
import { PSchema } from '../../@models/db/schema/pschema.model';
import { Databases, Doc, ExistingDoc } from '../../@models/domain.model';
import { DBService } from './db.service.interface';
import { PouchDBService } from './pouchdb.service';

@Injectable({
  providedIn: 'root',
})
export class FormADataService implements DBService {

  private formADB = Databases.form_a;
  private formAHeaders_: string[][];

  constructor(private dbService: PouchDBService) {
    this.instance();
    this.remoteSync();
  }

  get headers(): string[][] { return this.formAHeaders_; }

  // Async functions to interface with the DB
  async getAll() {
    console.log('running async getAll()');
    const requestQuery = {
      include_docs: true,
      limit: 80,
    };

    const locAllDocs = await this.instance()?.allDocs(requestQuery) as AllDocs.Root;
    if (locAllDocs.rows.length != 0) return locAllDocs;
    const response = await this.dbService?.getRemoteDBInstance(this.formADB)?.allDocs(requestQuery) as AllDocs.Root;
    return response
  }

  async addAll(docs: Doc[]): Promise<BulkAddResponse | undefined> {
    console.log('running async addAll()');
    return this.dbService.addAll(this.formADB, docs);
  }

  async getTableHeaders(current = 'pschema:form-a:0'): Promise<string[][]> {
    console.log('running async getTableHeaders()');
    if (this.formAHeaders_) return Promise.resolve(this.formAHeaders_);
    try {
      const response = await this.get(current) as PSchema;
      console.log('Got TableHeaders:');
      console.log(response.fields);
      return (this.formAHeaders_ = response.fields);
    } catch (error) {
      throw Error('Form A table headers could not be fetced');
    }
  }



  // Implementations for DBService
  instance(): PouchDB.Database<{}> | undefined{
    return this.dbService.instance(this.formADB);
  }

  remoteSync(): EventEmitter<any> | undefined {
    return this.dbService?.remoteSync(this.formADB);
  }

  getChangeListener(): EventEmitter<any> | undefined {
    return this.dbService?.getChangeListener(this.formADB);
  }

  get(id: string): Promise<any> | undefined {
    return this.dbService?.get(this.formADB, id);
  }

  create(doc: ExistingDoc): Promise<any> {
    return this.dbService.create(this.formADB, doc);
  }

  update(doc: ExistingDoc): Promise<any> {
    return this.dbService.update(this.formADB, doc);
  }

  delete(doc: ExistingDoc): Promise<any> {
    return this.dbService.delete(this.formADB, doc);
  }
}
