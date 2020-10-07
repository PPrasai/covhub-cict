import { EventEmitter, Injectable } from '@angular/core';
import { Doc, ExistingDoc } from '../../@models/domain.model';
import { BulkAddResponse } from '../../@models/db/response.model';
import { DBService } from './db.service.interface';
import { Databases } from '../../@models/domain.model';
import { PouchDBService } from './pouchdb.service';
import { AllDocs } from '../../@models/db/all-docs.model';


@Injectable({
  providedIn: 'root'
})
export class ContactTracingDataSerivce implements DBService {

  private ctDB = Databases.contact_tracing;
  private ctHeaders_: string[][];

  constructor(private dbService: PouchDBService) {
    this.instance();
    this.remoteSync();
  }

  get headers(): string[][] { return this.ctHeaders_; }

  // Async functions to interface with the DB
  async getAll() {
    const requestQuery = {
      include_docs: true,
      limit: 80
    };

    const locAllDocs = await this.instance()?.allDocs(requestQuery) as AllDocs.Root;
    if (locAllDocs.rows.length != 0) return locAllDocs;
    const response = await this.dbService?.getRemoteDBInstance(this.ctDB)?.allDocs(requestQuery) as AllDocs.Root;
    return response;
  }

  async addAll(docs: Doc[]): Promise<BulkAddResponse | undefined> {
    console.log('CT: running async addAll()');
    console.log(docs);
    return this.dbService.addAll(this.ctDB, docs);
  }

  // Implementations for DBService
  instance(): PouchDB.Database<{}> {
    return this.dbService.instance(this.ctDB);
  }
  remoteSync?(): EventEmitter<any> {
    return this.dbService.remoteSync(this.ctDB);
  }
  getChangeListener?(): EventEmitter<any> {
    return this.dbService.getChangeListener(this.ctDB);
  }
  get(id: string): Promise<any> {
    return this.dbService.get(this.ctDB, id);
  }
  create?(doc: ExistingDoc): Promise<any> {
    return this.dbService.create(this.ctDB, doc);
  }

  update?(doc: ExistingDoc): Promise<any> {
    return this.dbService.update(this.ctDB, doc);
  }
  delete?(doc: ExistingDoc): Promise<any> {
    return this.dbService.delete(this.ctDB, doc);
  }
}
