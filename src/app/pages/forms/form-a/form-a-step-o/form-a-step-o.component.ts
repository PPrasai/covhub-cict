import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

import { FormGroup, FormControl } from '@angular/forms';

import { TranslationServiceEn } from '../../../../services/i18n/translation-gen.service';
import { FormAService } from '../form-a.service';

export enum YNU {
  ho = 'ho',
  hoina = 'hoina',
  thahaChhaina = 'thahaChhaina',
}

@Component({
  selector: 'cov-form-a-step-o',
  templateUrl: './form-a-step-o.component.html',
  styleUrls: ['./form-a-step-o.component.scss']
})
export class FormAStepOComponent implements OnInit {

  caseStatus: string;

  ynus = Object.values(YNU);
  ynuSelected = YNU.thahaChhaina.toString();

  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  hoHoinaThahaChaina = {
    ho: true,
    hoina: false,
    thahaChhaina: null
  };

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    testAgency: new FormControl(''),
    reportedDate: new FormControl(''),
    nameOfPoEOrQuarantine: new FormControl(''),
    discoveredOnPoEOrQuarantine: new FormControl(null),
    ifYesDate: new FormControl('')
  });

  constructor(
    public t: TranslationServiceEn,
    public formAService: FormAService) {
      this.formAService.newFormFlag$.subscribe(flag => {
        if (flag) {
          console.log("STEP 0: prepare data instruction received");
          this.formAService.aggregateFormData(this.form);
        }
      });
    }

  ngOnInit(): void {
  }

  changeCaseStatus(event: any) {
    this.caseStatus = event as string;
  }


  onChange(event: any) {
    const falsify = (ynu: YNU, check: boolean) => {
      switch (ynu) {
        case YNU.ho:
          this.hoHoinaThahaChaina.ho = checked;
          this.hoHoinaThahaChaina.hoina = !checked;
          this.hoHoinaThahaChaina.thahaChhaina = !checked;
          break;
        case YNU.hoina:
          this.hoHoinaThahaChaina.hoina = checked;
          this.hoHoinaThahaChaina.ho = !checked;
          this.hoHoinaThahaChaina.thahaChhaina = !checked;
          break;
        default:
          this.hoHoinaThahaChaina.hoina = !checked;
          this.hoHoinaThahaChaina.ho = !checked;
          this.hoHoinaThahaChaina.thahaChhaina = checked;
          break;
      }
    };

    const idMapper = (idx: 'ho' | 'hoina' | 'thahaChhaina' | string, checker: boolean) => {
      switch (idx) {
        case YNU.ho:
          falsify(YNU.ho, checker);
          break;
        case YNU.hoina:
          falsify(YNU.hoina, checker);
          break;
        case YNU.thahaChhaina:
        default:
          falsify(YNU.thahaChhaina, checker);
          break;
      }
    };
    const { checked, id } = event.source;
    idMapper(id, checked);
  }
}
