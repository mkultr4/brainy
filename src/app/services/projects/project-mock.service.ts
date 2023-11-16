import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Project } from '../../models/projects/project';
import { PROJECTS } from '../../data/mock-projects';
import { Brand } from '../../models/brands/brand';
import { CORES } from '../../data/mock-cores';
import { WORKSPACE_ACCESSES } from '../../data/mock-workspace-accesses';

@Injectable({
  providedIn: 'root'
})
export class ProjectMockService extends BaseService {
  // Behavior subject
  private _projects: BehaviorSubject<Array<Project>> = new BehaviorSubject<Array<Project>>([]);
  public projects: Observable<Array<Project>>;
  // Data store
  private dataStore = {
    projects: []
  };
  constructor() {
    super();
    // Init
    this.dataStore.projects = [];
    this._projects = new BehaviorSubject<Array<Project>>([]);
    this.projects = this._projects.asObservable();
  }

  proccessRequest(event: string, data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  public findAll(workspaceId?: string): Observable<Project[]> {
    const observable: Observable<Project[]> = new Observable(observer => {
      observer.next(PROJECTS);
    });
    return observable;
  }
  /**
   * Load project by brand id
   * @param brandId
   */
  public loadByBrandId(brandId?: string): Observable<Project[]> {

    const observable = Observable.create((observer) => {
      const projects: Array<Project> = PROJECTS.filter(p => p.brand.id === brandId);
      this.dataStore.projects = projects;
      this.dataStore.projects.forEach((p: Project) => {
        const cores = CORES.filter(c => c.project.id === p.id);
        p.coresCount = cores.length;
        p.cores = cores;
      });
      this._projects.next(Object.assign([], this.dataStore).projects);
      observer.next(this.dataStore.projects);
    });
    return observable;

  }
  /**
   * Get project
   * @param id
   */
  public getProject(id: string): Observable<Project> {
    const observable = Observable.create((observer) => {
      const project = PROJECTS.filter(
        p => p.id === id)[0];
      if (project) {
        project.workspaceAccesses = [
          WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0],
          WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[2], WORKSPACE_ACCESSES[0],
          WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[3], WORKSPACE_ACCESSES[4]
        ];
        project.cores = CORES.filter(o => o.project.id === id);
      }
      observer.next(<Project>project);
    });
    return observable;
  }
  /**
   * Update project
   * @param project
   */
  public updateProject(project: Project) {

    const observable = Observable.create((observer) => {
      this.dataStore.projects.forEach((p, index) => {
        if (p.id === project.id) {
          this.dataStore.projects[index] = project;
        }
      });
      setTimeout(() => {
        this._projects.next(Object.assign([], this.dataStore).projects);
        observer.next(true);
      }, 1500);

    });
    return observable;

  }
  /**
   * Delete project
   * @param projectId
   */
  public deleteProject(projectId: string) {

    const observable = Observable.create((observer) => {
      this.dataStore.projects.forEach((p, index) => {
        if (p.id === projectId) {
          this.dataStore.projects.splice(index, 1);
        }
      });


      setTimeout(() => {
        this._projects.next(Object.assign([], this.dataStore).projects);
        observer.next(true);
      }, 1500);

    });
    return observable;

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

}
