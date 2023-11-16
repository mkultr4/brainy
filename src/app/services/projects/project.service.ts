import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Project } from '../../models/projects/project';
import { SocketService } from '../socket.service';
import { Brand } from '../../models/brands/brand';

@Injectable()
export class ProjectService extends SocketService {

  // Behavior subject
  private _projects: BehaviorSubject<Array<Project>>;
  public projects: Observable<Array<Project>>;

  // Data store
  private dataStore;

  constructor() {
    super(environment.urlSocketFeedback);

    this.dataStore = {
      projects: []
    };

    this._projects = new BehaviorSubject<Array<Project>>([]);
    this.projects = this._projects.asObservable();
   }
  public findAll(workspaceId?: string): Observable<Project[]> {
    console.log('into search project');
    const projects =  this.proccessRequest('findProjectByWorkspace', workspaceId);
    return projects;
  }

  public getProject(brandID: number) {
    const projects =  this.proccessRequest('getProject', brandID);
    return projects;
  }

  public saveProject(data: number) {
    const projects =  this.proccessRequest('saveProject', data);
    return projects;
  }

  public updateProject(data: number) {
    const projects =  this.proccessRequest('updateProject', data);
    return projects;
  }

  public deleteProject(brandID: number) {
    const projects =  this.proccessRequest('deleteProject', brandID);
    return projects;
  }

  public castArrayObject(projects: any, workspaceAccess) {
    const arrayProject = new Array<Project>();
      projects.forEach((element: any) => {
        const project = new Project();
        project.id = element.id;
        project.name = element.name;

        const brand = new Brand();
        brand.id = element.brand.id;
        brand.workspaceAccesses.push(workspaceAccess);
        brand.name = element.brand.name;
        project.brand = brand;

        arrayProject.push(project);
      });

      return arrayProject;
  }

  public loadByBrandId(brandId?: string): Observable<Project[]> {
      return Observable.create((observer) => {
      let projects;
      this.proccessRequest('findProjectByBrand', brandId).subscribe(async(p: Array<Project>) => {
        // console.log(`project by brand ${JSON.stringify(p, null, '\t')}`);
        projects = p;

        const auxProjectList = new Array<Project>();

        for (const pr of projects) {
          await this.proccessRequest('getCoreByProject', pr.id).subscribe((cores) => {
            pr.coresCount = cores.length;
            pr.cores = cores;
            console.log(`count:`);
            auxProjectList.push(pr);
          });
        }

        setTimeout(() => {
          // console.log(`projects in service: ${JSON.stringify(auxProjectList, null, '\t')}`);
          this.dataStore.projects = auxProjectList;
          this._projects.next(Object.assign([], this.dataStore).projects);
          observer.next(this.dataStore.projects);
        }, 100);
      });
    });

  }

}
