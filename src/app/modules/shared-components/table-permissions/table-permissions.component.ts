import { Component, OnInit } from '@angular/core';
import { ROLES_PERMISSIONS } from '../../../data/mock-roles';


@Component({
  selector: 'app-table-permissions,[app-table-permissions]',
  templateUrl: './table-permissions.component.html',
  styleUrls: ['./table-permissions.component.scss']
})
export class TablePermissionsComponent implements OnInit {
  public mapPermissions;
  constructor() {

    this.mapPermissions = [
      {
        permission: ROLES_PERMISSIONS[0],
        myTeam: [{ permission: true }, { permission: true }, { permission: true }],
        guests: [{ permission: true }],
        specialFunctions: [{ permission: false }, { permission: false }],
      },
      {
        permission: ROLES_PERMISSIONS[1],
        myTeam: [{ permission: true }, { permission: true }, { permission: false }],
        guests: [{ permission: false }],
        specialFunctions: [{ permission: false }, { permission: false }],
      },
      {
        permission: ROLES_PERMISSIONS[2],
        myTeam: [{ permission: true }, { permission: true }, { permission: false }],
        guests: [{ permission: false }],
        specialFunctions: [{ permission: true }, { permission: false }]
      },
      {
        permission: ROLES_PERMISSIONS[3],
        myTeam: [{ permission: true }, { permission: true }, { permission: false }],
        guests: [{ permission: false }],
        specialFunctions: [{ permission: true }, { permission: false }]
      },
      {
        permission: ROLES_PERMISSIONS[4],
        myTeam: [{ permission: true }, { permission: true }, { permission: false }],
        guests: [{ permission: false }],
        specialFunctions: [{ permission: true }, { permission: false }]
      },
      {
        permission: ROLES_PERMISSIONS[5],
        myTeam: [{ permission: false }, { permission: false }, { permission: false }],
        guests: [{ permission: false }],
        specialFunctions: [{ permission: false }, { permission: true }]
      },
      {
        permission: ROLES_PERMISSIONS[6],
        myTeam: [{ permission: true }, { permission: true }, { permission: false }],
        guests: [{ permission: false }],
        specialFunctions: [{ permission: false }, { permission: false }],
      }
    ];
  }

  ngOnInit() {
  }

}
