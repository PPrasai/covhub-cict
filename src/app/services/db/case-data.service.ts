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
export class CaseDataService implements DBService {

  private newCaseDB = Databases.new_case;
  private newCaseHeaders_: string[][];

  constructor(private dbService: PouchDBService) {
    this.instance();
    this.remoteSync();
  }

  get headers(): string[][] { return this.newCaseHeaders_; }

  // Async functions to interface with the DB
  async getAll() {
    const requestQuery = {
      include_docs: true,
      limit: 80,
    };

    const locAllDocs = await this.instance()?.allDocs(requestQuery) as AllDocs.Root;
    if (locAllDocs.rows.length != 0) return locAllDocs;
    const response = await this.dbService?.getRemoteDBInstance(this.newCaseDB)?.allDocs(requestQuery) as AllDocs.Root;
    return response
  }

  async addAll(docs: Doc[]): Promise<BulkAddResponse | undefined> {
    console.log('running async addAll()');
    return this.dbService.addAll(this.newCaseDB, docs);
  }

  async getTableHeaders(current = 'pschema:form-a'): Promise<string[][]> {
    console.log('running async getTableHeaders()');
    if (this.newCaseHeaders_) return Promise.resolve(this.newCaseHeaders_);
    try {
      const response = await this.get(current) as PSchema;
      console.log('Got TableHeaders:');
      console.log(response.fields);
      return (this.newCaseHeaders_ = response.fields);
    } catch (error) {
      throw Error('Form A table headers could not be fetced');
    }
  }

  // Implementations for DBService
  instance(): PouchDB.Database<{}> {
    return this.dbService.instance(this.newCaseDB);
  }

  remoteSync?(): EventEmitter<any> {
    return this.dbService.remoteSync(this.newCaseDB);
  }

  getChangeListener?(): EventEmitter<any> {
    return this.dbService.getChangeListener(this.newCaseDB);
  }

  get(id: string): Promise<any> {
    return this.dbService.get(this.newCaseDB, id);
  }

  create?(doc: ExistingDoc): Promise<any> {
    return this.dbService.create(this.newCaseDB, doc);
  }

  update?(doc: ExistingDoc): Promise<any> {
    return this.dbService.update(this.newCaseDB, doc);
  }

  delete?(doc: ExistingDoc): Promise<any> {
    return this.dbService.delete(this.newCaseDB,doc);
  }

}
