import { pschema_form_a_0 } from './pschema-form-a-0';
import { pschema_form_a_1a } from './pschema-form-a-1a';
import { pschema_form_a_1 } from './pschema-form-a-1';

export const pschema_form_a = {
  _id: 'pschema:form_a',
  fields: pschema_form_a_0.fields
    .concat(
      pschema_form_a_1.fields
    )
    .concat(
      pschema_form_a_1a.fields
    )
}
