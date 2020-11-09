<!-- covdbs couch, couch potato, pay blockdb -->
# Dashboard for tracking COVID-19 stats in Nepal

## Key features

- Supports a very wide range of different kinds of dashboard panels for COVID-19 status monitoring
- Integrates different map data and various COVID-19 data collection efforts into a unified database and dashboard
- Allows secured form-based and file-upload based data entry
- Interactive maps and filters
- Extensive data import/export/analysis pipelines behind the scenes

- Inherent data anonymization by design and protected emergency access for viewing individual identifying information
- Offline first and resilience + continued smooth usage despite bad or no network conditions
- Background live updates and sync with remote servers when the user has connection
- Data change and deletion reviews for high level admins/auditors and transparency
- Data access and usage monitoring dashboards 

### What's included

- Angular 9+ & Typescript
- Bootstrap 4+ & SCSS
- Responsive layout

### Project details
#### General workflow
- Users with the role of `admin` can create new users
- Users can have one (or more) of the following roles; `admin`, `coordinator`, `case_investigator`, `contact_tracer`, `followup_personnel`
- A `coordinator` identifies and creates new cases to be investigated. The `coordinator` will also assign a `case_investigator` to the case. This will result in a new case appearing on the `active-case` component's table view.
- All users will be able to see the newly created case. A specific `case_investigator`, whom the the case is assigned to, will see a button to open `form-a` component. *Form A* is then filled up by the assigned `case_investigator`. *Form A* ends with curating a list of people who are potentially exposed to the virus from the case. The `case_investigator` also assigns a `contact-tracer` to this list of people.
- The list of potentially exposed individuals show up in the `contact-tracing` component's, table view. One specific `contact_tracer`, whom the contacts are assigned to, will see a button to open `form-b1`. The `contact_tracer` communicates with each assigned contact and fills the *Form B1*. The `contact-tracer` also assigns a `followup_personnel` to each contact.
- After certain (well specified) days of filling the *Form B1*, a specific `followup_personnel` will be able to access `form-b2`. This form will need to be filled multiple times over a period of following weeks. When the last follow up is complete, the case can be marked as `complete`.

#### User roles
- Mayor / Admin in charge (1 user)
      Creates new users and assigns roles

- Coordinator (1-2 users)
      Creates cases and assigns case investigators to the cases

- Case Investigators (1-15 users)
      Fills Form A and curates a list of people who are potentially exposed
      Assigns contact tracers to the list of exposed people

- Contact tracers (1-15 users)
      Contacts the people in list assigned by case investigators and fills Form B1
      Assigns follow-up personnels for people in Form B1s

- Contact follow-up personnels (1-30 users)
      Follows up with the people with data in Form B1 and incrementally fill Form B2s

- Lab users (any number of users)
      Can read Forms A, B1 and B2 but cannot write anything

#### Further requirements
- All user categories share the same dashboard view (read-only for all, role based write access) for workflow transparency and to see distribution of workload. 
- Form should be printable
- Should be able to see all active/closed cases for any date
- Should have a label alongside all entries (active tasks) showing how many hours have elapsed since it's creation

#### TODO
- Forms validation
- Conditional form element loading
- User module
- Role based access control
- Refactor authentication
- Resolve some bugs introduced by improper reactivity implementation

## Repo Stats
```Bash
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
JSON                            20             19              0          30648
TypeScript                     644           4399            258          26503
HTML                           124            707             87           4859
Sass                            70            591             28           3068
Markdown                         9             78              0            275
SVG                              4              0              0            196
YAML                             2              6              0             52
JavaScript                       2              3              2             47
CSS                              4              0              0              4
-------------------------------------------------------------------------------
SUM:                           879           5803            375          65652
-------------------------------------------------------------------------------
```
