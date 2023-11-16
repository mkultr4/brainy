import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { CATEGORIES, BRIEF_TEMPLATES, BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES, TABLE_CELL_TYPES, BRIEF_CATEGORIES, BRIEF_AUDIT, AREAS, PITCH_PROPOSALS, TYPES_TEMPLATE } from 'src/app/data/mock-brief';
import { BriefTemplate } from 'src/app/models/brief/brief-template';
import { Brief } from 'src/app/models/brief/brief';
import { BriefCategory } from 'src/app/models/brief/brief-category';
import { CORES, CORE_STATUSES } from 'src/app/data/mock-cores';
import * as uuid from 'uuid/v4';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { CategoryItemFile } from 'src/app/models/brief/category-item-file';
import { BriefCategoryItemType } from 'src/app/models/brief/brief-category-item-type';
import * as _ from 'lodash';
import { ALL_TEAM } from 'src/app/data/mock-team';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { Giveback } from 'src/app/models/brief/giveback';
import { WORKSPACE_ACCESSES } from 'src/app/data/mock-workspace-accesses';
import { Invitation } from 'src/app/models/invitations/invitation';
import * as moment from 'moment';
import { Proposal } from 'src/app/models/brief/proposal';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { TypeTemplate } from 'src/app/models/brief/type-template';
@Injectable()
export class BriefMockService extends BaseService {
  // To design purpose
  public categoryEditionLogs = [];
  // Store
  private dataStore;
  // Brief
  private _brief;
  public brief: Observable<Brief>;
  // Categories
  private _categories;
  public categories: Observable<BriefCategory[]>;

  // Categories Items
  private _categoriesItems;
  public categoriesItems: Observable<BriefCategoryItem[]>;
  //  Templates
  private _templates;
  public templates: Observable<BriefTemplate[]>;
  // Purposes
  private _proposals;
  public proposals: Observable<Proposal[]>;


  constructor() {
    super()
    this.dataStore = {
      brief: null,
      categories: [],
      categoriesItems: [],
      templates: [],
      proposals: []
    }

    // Brief
    this._brief = new BehaviorSubject<Brief>(new Brief());
    this.brief = this._brief.asObservable();
    // Categories
    this._categories = new Subject<BriefCategory[]>();
    this.categories = this._categories.asObservable();
    // Categories Items
    this._categoriesItems = new Subject<BriefCategoryItem[]>();
    this.categoriesItems = this._categoriesItems.asObservable();
    // Templates 
    this._templates = new BehaviorSubject<BriefTemplate[]>([]);
    this.templates = this._templates.asObservable();
    // Proposals
    this._proposals = new BehaviorSubject<Proposal[]>([]);
    this.proposals = this._proposals.asObservable();
  }

  proccessRequest(event: string, data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  /**
   * Load core by id
   * @param id
   */
  loadById(id, type = 'project', statusKey, dates?) {
    const observable = new Observable(observer => {
      let status = CORE_STATUSES.filter(s => s.key === 'process')[0];
      if (statusKey) {
        status = CORE_STATUSES.filter(s => s.key === statusKey)[0];
      }
      if (type === 'project') {
        this.dataStore.brief = Object.assign(new Brief(), CORES.filter(c => c.type.key === 'brief')[0]);
        this.dataStore.brief.status = status;
        this.dataStore.brief.template = BRIEF_TEMPLATES[0];
        if (dates) {
          let dateOf = new Date();
          dateOf = moment(dateOf).add(5, 'days').toDate();
          if (dates.dateOfGivebacks) {
            this.dataStore.brief.dateOfGivebacks = dateOf;
          }
          if (dates.dateOfProposals) {
            this.dataStore.brief.dateOfProposals = dateOf;
          }
          if (dates.dateOfResults) {
            this.dataStore.brief.dateOfResults = dateOf;
          }
        }
        setTimeout(() => {
          this._brief.next(Object.assign({}, this.dataStore).brief);
          observer.next(this.dataStore.brief);
        });
      } else if (type === 'template') {
        this.dataStore.brief = Object.assign(new BriefTemplate(), BRIEF_TEMPLATES[0]);
        this.dataStore.brief.status = status;
        this.dataStore.brief.owner = WORKSPACE_ACCESSES[0].user;
        this.dataStore.brief.workspace = WORKSPACE_ACCESSES[0].workspace;
        this.dataStore.brief.typeTemplate = TYPES_TEMPLATE[0];
        setTimeout(() => {
          this._brief.next(Object.assign({}, this.dataStore).brief);
          observer.next(this.dataStore.brief);
        });
      } else if (type === 'pitch-template') {
        this.dataStore.brief = Object.assign(new BriefTemplate(), BRIEF_TEMPLATES[0]);
        this.dataStore.brief.status = status;
        this.dataStore.brief.typeTemplate = TYPES_TEMPLATE[1];
        this.dataStore.brief.owner = WORKSPACE_ACCESSES[0].user;
        this.dataStore.brief.workspace = WORKSPACE_ACCESSES[0].workspace;
        setTimeout(() => {
          this._brief.next(Object.assign({}, this.dataStore).brief);
          observer.next(this.dataStore.brief);
        });
      }

    });
    return observable;
  }
  /**
   * Load brief categories
   * @param id 
   */
  loadCategories(id, empty = false, autoFillResponse = false, addGiveback = false, addGivebackResponse = false, type = 'project') {
    const observable = new Observable(observer => {
      this.dataStore.categories = [];
      this.dataStore.categories = _.cloneDeep(BRIEF_CATEGORIES);
      if (empty) {
        this.dataStore.categories = [];
      }
      if (autoFillResponse) {
        this.dataStore.categories.forEach((category: BriefCategory) => {
          category.items.forEach((item: BriefCategoryItem) => {
            if (item.type === BriefCategoryItemType.QUESTION) {
              this.autoFillResponse(item)
            }
          });
        });


      }
      // Add giveback
      if (addGiveback) {
        if (type === 'project') {
          const question = this.dataStore.categories[0].items[4];
          question.giveback = new Giveback();
          question.giveback.id = uuid();
          question.giveback.message = `Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae.`;
          const createdBy = ALL_TEAM.filter(w => w.id === '14')[0];
          createdBy.groupReference = 'editor';
          question.giveback.createdBy = createdBy;
          question.giveback.createdAt = new Date();
          question.giveback.modifiedAt = new Date();
          // Relationship
          question.giveback.briefCategoryId = this.dataStore.categories[0].id;
          question.giveback.briefCategoryItemId = question.id;
        } else if (type === 'pitch') {
          this.addGivebacksPitch();
        }

      }
      // Add giveback
      if (addGivebackResponse) {
        const question = this.dataStore.categories[0].items[4];
        question.giveback.reply = `Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae.`;
        const answeredBy = ALL_TEAM.filter(w => w.id === '17')[0];
        answeredBy.groupReference = 'approver';
        question.giveback.answeredBy = answeredBy;
        question.giveback.answeredAt = new Date();
        question.giveback.modifiedAt = new Date();
        question.giveback.addToBrief = true;
        // Relationship
        question.giveback.briefCategoryId = this.dataStore.categories[0].id;
        question.giveback.briefCategoryItemId = question.id;
      }
      if (this.dataStore.categories.length === 0) {
        const emptyCategory = new BriefCategory();
        emptyCategory.id = uuid();
        emptyCategory.order = 1;
        this.dataStore.categories.push(emptyCategory);
      }
      console.log(this.dataStore.categories);
      this._categories.next(Object.assign([], this.dataStore).categories);
      observer.next(this.dataStore.categories);
    });
    return observable;
  }

  private addGivebacksPitch() {
    // Gibeback 1
    const question = this.dataStore.categories[0].items[4];
    question.giveback = new Giveback();
    question.giveback.id = uuid();
    question.giveback.message = `Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum.`;
    const createdBy = ALL_TEAM.filter(w => w.id === '14')[0];
    createdBy.groupReference = 'editor';
    question.giveback.createdBy = createdBy;
    question.giveback.createdAt = new Date();
    question.giveback.modifiedAt = new Date();
    // Relationship
    question.giveback.briefCategoryId = this.dataStore.categories[0].id;
    question.giveback.briefCategoryItemId = question.id;

    // Gibeback 2
    const question2 = this.dataStore.categories[0].items[1];
    question2.giveback = new Giveback();
    question2.giveback.id = uuid();
    question2.giveback.message = `Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum.`;
    const createdBy2 = ALL_TEAM.filter(w => w.id === '19')[0];
    createdBy.groupReference = 'editor';
    question2.giveback.createdBy = createdBy2;
    question2.giveback.createdAt = new Date();
    question2.giveback.modifiedAt = new Date();
    // Relationship
    question2.giveback.briefCategoryId = this.dataStore.categories[0].id;
    question2.giveback.briefCategoryItemId = question2.id;

    // Gibeback 3
    const question3 = this.dataStore.categories[0].items[7];
    question3.giveback = new Giveback();
    question3.giveback.id = uuid();
    question3.giveback.message = `Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum.`;
    const createdBy3 = ALL_TEAM.filter(w => w.id === '18')[0];
    createdBy.groupReference = 'editor';
    question3.giveback.createdBy = createdBy3;
    question3.giveback.createdAt = new Date();
    question3.giveback.modifiedAt = new Date();
    // Relationship
    question3.giveback.briefCategoryId = this.dataStore.categories[0].id;
    question3.giveback.briefCategoryItemId = question3.id;

  }
  // To design purposes
  private autoFillResponse(item: BriefCategoryItem) {
    if (item.responseType.key === 'text') {
      item.responseContent.text = 'Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Donec viverra eleifend lacus, vitae ullamcorper.';
    } else if (item.responseType.key === 'text-large') {
      item.responseContent.text = `Synth polaroid bitters chillwave pickled. Vegan disrupt tousled, Portland keffiyeh aesthetic food truck sriracha cornhole single-origin coffee church-key roof party. Leggings ethical McSweeney's, normcore you probably haven't heard of them Marfa organic squid. Slow-carb 90's ennui Godard pug asymmetrical, narwhal VHS Tonx High Life. Retro dreamcatcher synth Godard pickled Etsy jean shorts beard, pour-over fanny pack mumblecore. Quinoa retr`;
    } else if (item.responseType.key === 'list') {
      item.responseSettings.options.forEach(option => {
        option.value = `Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Donec viverra eleifend lacus, vitae ullamcorper.`;
      });
    } else if (item.responseType.key === 'ascendent') {
      item.responseSettings.options.forEach(option => {
        option.value = `Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse `;
      });
    }

    else if (item.responseType.key === 'checkbox' || item.responseType.key === 'radio' ||
      item.responseType.key === 'yes-no' || item.responseType.key === 'assessment'
    ) {
      item.responseContent.options.push(item.responseSettings.options[0])
    } else if (item.responseType.key === 'date') {
      item.responseSettings.options.forEach(option => {
        if (option.type === 'date') {
          option.value = '12/01/1988'
        }
        else if (option.type === 'time') {
          option.value = '06 : 18 am'
        }
      });
    } else if (item.responseType.key === 'quantity') {
      item.responseContent.quantity = 1500;

    }
    // Workspace access fill response
    item.fillAnswerBy = ALL_TEAM.filter(w => w.rol.key === 'guest')[1];
    item.fillAnswerBy.groupReference = 'approver';

  }
  // unload categories
  unloadCategories() {
    this.dataStore.categories = [];

    this._categories.next(Object.assign([], this.dataStore).categories);
  }
  /**
   * Get brief category
   * @param id 
   */
  getBriefCategory(id) {
    const observable = Observable.create((observer) => {
      let briefCategory;
      this.dataStore.categories.forEach(c => {
        if (c.id === id) {
          briefCategory = c;
        }
      });

      observer.next(Object.assign(new BriefCategory(), briefCategory));
    });
    return observable;

  }
  /**
   * Find Areas
   */
  findAreas() {
    return of(AREAS);
  }
  /**
   * Find categories
   */
  findCategories() {
    return of(CATEGORIES);
  }
  /**
   * Find types templates
   */
  findTypesTemplates() {
    return of(TYPES_TEMPLATE);
  }
  /**
   * Update order categories
   * @param topics
   */
  updateOrderCategories(categories: Array<BriefCategory>) {
    const observable = Observable.create((observer) => {
      observer.next(true);
    });
    return observable;
  }
  // Add category
  addCategory(briefId: any) {
    const observable = Observable.create((observer) => {
      const category = new BriefCategory();
      category.id = uuid();
      category.order = this.dataStore.categories.length + 1;
      //  topic.title = 'Tema sin título';
      this.dataStore.categories.push(category);
      this._categories.next(Object.assign([], this.dataStore).categories);
      observer.next(category);
    });
    return observable;
  }

  /**
   * Update store to make functional layout
   * @param briedCategory 
   * @param items 
   */
  updateStoreCategory(briedCategory: BriefCategory, items: BriefCategoryItem[]) {
    this.dataStore.categories.forEach((category, index) => {
      if (category.id === briedCategory.id) {
        this.dataStore.categories[index].items = Object.assign([], items);
      }
    });
    this._categories.next(Object.assign([], this.dataStore).categories);
  }
  /* Update brief category title
  * @param topicId
  * @param title
  */
  updateCategoryTitle(categoryId, title: string, emptyDefault = true) {
    const observable = Observable.create((observer) => {
      let category;
      if (emptyDefault && (!title || title.length === 0)) {
        title = 'Categoría sin título';
      }
      this.dataStore.categories.forEach((c, i) => {
        if (c.id === categoryId) {
          this.dataStore.categories[i].title = title;
          this.dataStore.categories[i].saved = true;
          category = this.dataStore.categories[i];

        }
      });
      this._categories.next(Object.assign([], this.dataStore).categories);
      observer.next(category);
    });
    return observable;
  }
  /**
 * Update store comment threads
 * @param topic
 */
  updateBriefCategoryCommentThread(briefCategory: BriefCategory) {

    this.dataStore.categories.forEach((c, i) => {
      if (c.id === briefCategory.id) {
        this.dataStore.categories[i].commentThreads = Object.assign([], briefCategory.commentThreads);
      }
    });

    this._categories.next(Object.assign([], this.dataStore).categories);
  }
  /**
 * Update briefCategory list title
 * @param briefCategories
 */
  updateBriefCategoryListTitle(briefCategories: BriefCategory[]) {
    const observable = Observable.create((observer) => {
      briefCategories.forEach((t, i) => {
        const index = this.dataStore.categories.indexOf(t);
        if (t.title.length === 0) {
          this.dataStore.categories[index].title = 'Categoría sin título';
          this.dataStore.categories[index].saved = true;
        } else {
          this.dataStore.categories[index].categories = t.title;
          this.dataStore.categories[index].categories = true;
        }

      });
      this._categories.next(Object.assign([], this.dataStore).topics);
      observer.next(this.dataStore.topics);
    });
    return observable;
  }
  /**
   * Remove brief category
   * @param briefCategoryId 
   */
  removeBriefCategory(briefCategoryId: any) {
    const observable = Observable.create((observer) => {
      this.dataStore.categories.forEach((c, index) => {
        if (c.id === briefCategoryId) {
          this.dataStore.categories.splice(index, 1);
        }
      });
      if (this.dataStore.categories.length === 0) {
        const emptyTopic = new BriefCategory();
        emptyTopic.id = uuid();
        emptyTopic.order = 1;
        this.dataStore.categories.push(emptyTopic);
      }
      this._categories.next(Object.assign([], this.dataStore).categories);
      observer.next(this.dataStore.categories);
    });
    return observable;
  }
  /**
   * load templates
   *
   */
  loadTemplates(withoutLibraries = false) {
    const observable = new Observable(observer => {
      this.dataStore.templates = _.cloneDeep(BRIEF_TEMPLATES);
      if (withoutLibraries) {
        this.dataStore.templates.forEach(t => {
          t.isLibrary = false;
        });
        const index = this.dataStore.templates.findIndex(t => t.systemTemplat === false);
        this.dataStore.templates.splice(index, 1);
      }
      this._templates.next(Object.assign([], this.dataStore).templates);
      observer.next(this.dataStore.templates);
      // observer.complete();
    });
    return observable;
  }
  /**
   * Get template
   * @param templateId 
   */
  getTemplate(templateId) {
    return of(BRIEF_TEMPLATES.filter(t => t.id === templateId)[0]);
  }
  /**
   * Make library template
   * @param briefTemplate 
   * @param isLibrary 
   */
  makeLibraryTemplate(briefTemplateId, isLibrary) {
    const observable = new Observable(observer => {
      let briefTemplate;
      this.dataStore.templates.forEach((t, index) => {
        if (t.id === briefTemplateId) {
          this.dataStore.templates[index].isLibrary = isLibrary;
          briefTemplate = this.dataStore.templates[index];
        }
      });
      this._templates.next(Object.assign([], this.dataStore).templates);
      observer.next(briefTemplate);
      // observer.complete();
    });
    return observable;
  }
  /**
   * Create template
   * @param briefTemplate 
   */
  createTemplate(briefTemplate: BriefTemplate) {
    briefTemplate.id = 1;
    return of(briefTemplate);
  }
  // Check is ready to approve
  checkIsReadyToApprove() {
    return of(true);
  }
  // Check brief status
  checkBriefStatus() {
    // alert('asd');
    return of(true);
  }

  // #region Category items
  // Load All
  loadAllBriefCategoryItems(briefCategoryId: any, items: Array<BriefCategoryItem>) {

    const observable = new Observable((observer) => {

      this.dataStore.categoriesItems = [];
      if (items && items.length > 0) {
        this.dataStore.categoriesItems = items;
        this.removeClassWrapper(this.dataStore.categoriesItems);
      }
      this._categoriesItems.next(Object.assign([], this.dataStore).categoriesItems);
      observer.next(this.dataStore.categoriesItems);
    });
    return observable;
  }
  /**
   * Remove class wrapper
   */
  removeClassWrapper(items: BriefCategoryItem[]) {
    items.forEach(i => {
      i.title = i.title.replace('active', '').replace('active-sidenav', '');
      i.description = i.description.replace('active', '').replace('active-sidenav', '');

    });

  }
  // Find all response types
  findAllReponseTypes() {
    return of(BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES);
  }
  // Find all cell types
  findAllTableCellTypes() {
    return of(TABLE_CELL_TYPES);
  }
  /**
   * Add category item
   * @param briefCategoryItem 
   */
  addBriefCategoryItem(briefCategoryItem: BriefCategoryItem) {
    const observable = new Observable((observer) => {
      this.dataStore.categoriesItems.push(briefCategoryItem);
      this._categoriesItems.next(Object.assign([], this.dataStore).categoriesItems);
      observer.next(briefCategoryItem);
    });
    return observable;
  }
  /**
   * Remove category item
   * @param briefCategoryItemId 
   */
  removeBriefCategoryItem(briefCategoryItemId: any) {
    const observable = new Observable((observer) => {
      let itemRemove;
      this.dataStore.categoriesItems.forEach((item, index) => {
        if (item.id === briefCategoryItemId) {
          itemRemove = item;
          this.dataStore.categoriesItems.splice(index, 1);
        }
      });
      this._categoriesItems.next(Object.assign([], this.dataStore).categoriesItems);
      observer.next(itemRemove);
    });
    return observable;
  }
  /**
   * Update category item
   * @param briefCategoryItem
   */
  updateBriefCategoryItem(briefCategoryItem: BriefCategoryItem) {
    const observable = new Observable((observer) => {

      this.dataStore.categoriesItems.forEach((item, index) => {
        if (item.id === briefCategoryItem.id) {
          this.dataStore.categoriesItems[index] = Object.assign({}, briefCategoryItem);
        }
      });
      this._categoriesItems.next(Object.assign([], this.dataStore).categoriesItems);
      observer.next(briefCategoryItem);
    });
    return observable;
  }

  /**
   * Order items
   * @param items 
   */
  updateBriefCategoryItemsOrder(items: BriefCategoryItem[]) {
    const observable = new Observable((observer) => {

      this.dataStore.categoriesItems = Object.assign([], items);
      this._categoriesItems.next(Object.assign({}, this.dataStore).categoriesItems);
      observer.next(items);
    });
    return observable;
  }

  /**
   * Upload image
   * @param file 
   */
  uploadImage(file: File, briefCategoryItemId) {
    const observable = Observable.create((observer) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        const img = document.createElement('img');
        img.src = url;
        img.onload = (event) => {
          // console.log(event);
          const w = img.width;
          const h = img.height;

          const categoryItemFile = new CategoryItemFile();
          categoryItemFile.id = uuid();
          categoryItemFile.url = url;
          categoryItemFile.setting = { naturalWidth: w, naturalHeight: h }
          categoryItemFile.name = file.name;
          categoryItemFile.idBriefCategoryItem = briefCategoryItemId;
          img.remove();
          observer.next(categoryItemFile);
        };

      });
    });
    return observable;
  }
  /**
   * Upload file
   * @param file 
   * @param briefCategoryItemId 
   */
  uploadFile(file: File, briefCategoryItemId) {
    const observable = Observable.create((observer) => {
      const url = URL.createObjectURL(file);
      const categoryItemFile = new CategoryItemFile();
      categoryItemFile.id = uuid();
      categoryItemFile.url = url;
      categoryItemFile.name = file.name;
      categoryItemFile.idBriefCategoryItem = briefCategoryItemId;
      observer.next(categoryItemFile);

    });
    return observable;
  }

  /**
 * Update image gallery
 * @param topicFile
 * @param file
 */
  updateImage(categoryItemFile: CategoryItemFile, file: File) {
    const observable = Observable.create((observer) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        const img = document.createElement('img');
        img.src = url;
        img.onload = (event) => {
          // console.log(event);
          const w = img.width;
          const h = img.height;

          //  topicFile.id = uuid();
          categoryItemFile.url = url;
          categoryItemFile.setting = { naturalWidth: w, naturalHeight: h }
          categoryItemFile.name = file.name;
          img.remove();
          observer.next(categoryItemFile);
        };

      });
    });
    return observable;
  }

  /**
   * Update  brief category items
   * @param topic 
   * @param descriptionItems 
   */
  updateBriefCategoryItems(briefCategoryId: any, items) {
    const observable = Observable.create((observer) => {
      this.dataStore.categories.forEach((c, index) => {
        if (c.id === briefCategoryId) {
          this.dataStore.categories[index].items = Object.assign([], items);
          // console.log(this.dataStore.topics[index].descriptionItems);
        }
      });
      this._categories.next(Object.assign([], this.dataStore).categories);
      observer.next(items);
    });
    return observable;
  }

  /**
   * Get subcatecory and subcatecory content
   * @param topicId 
   * @param subtopicId 
   */
  getSubCategoryContent(briefCategoryId: any, subCategoryId: any) {
    const observable = Observable.create((observer) => {
      let items = [];
      this.dataStore.categories.forEach((c, index) => {
        if (c.id === briefCategoryId) {
          items = this.dataStore.categories[index].items.filter(i => i.id === subCategoryId || i.idParent === subCategoryId);

        }
      });
      console.log(items);
      observer.next(items);
    });
    return observable;
  }

  /**
 * Remove subcategory content
 * @param topicId 
 * @param subTopicId 
 */
  removeSubCategoryContent(briefCategoryId: any, subCategoryId: any) {
    const observable = Observable.create((observer) => {
      this.dataStore.categories.forEach((c, index) => {
        if (c.id === briefCategoryId) {
          this.dataStore.categories[index].items =
            Object.assign([], this.dataStore.categories[index]
              .items.filter(i => i.id !== subCategoryId && i.idParent !== subCategoryId));
          // console.log(this.dataStore.topics[index].descriptionItems);
        }
      });
      this._categories.next(Object.assign([], this.dataStore).categories);
      observer.next(briefCategoryId);
    });
    return observable;
  }

  // #endregion

  // #region Givebacks

  /**
 * Add give back to brief category item
 * @param briefCategoryItem
 */
  addGiveback(briefCategoryItem: BriefCategoryItem, cratedBy: WorkspaceAccess) {
    const observable = new Observable((observer) => {
      briefCategoryItem.giveback.id = uuid();
      briefCategoryItem.giveback.createdBy = cratedBy;
      briefCategoryItem.giveback.createdAt = new Date();
      briefCategoryItem.giveback.modifiedAt = new Date();
      this.dataStore.categoriesItems.forEach((item, index) => {
        if (item.id === briefCategoryItem.id) {
          this.dataStore.categoriesItems[index] = Object.assign({}, briefCategoryItem);
        }
      });
      this._categoriesItems.next(Object.assign([], this.dataStore).categoriesItems);
      observer.next(briefCategoryItem);
    });
    return observable;
  }

  /**
 * Update give back to brief category item
 * @param briefCategoryItem
 */
  updateGiveback(briefCategoryItem: BriefCategoryItem, modifiedBy: WorkspaceAccess) {
    const observable = new Observable((observer) => {
      briefCategoryItem.giveback.edited = true;
      briefCategoryItem.giveback.modifiedAt = new Date();
      this.dataStore.categoriesItems.forEach((item, index) => {
        if (item.id === briefCategoryItem.id) {
          this.dataStore.categoriesItems[index] = Object.assign({}, briefCategoryItem);
        }
      });
      this._categoriesItems.next(Object.assign([], this.dataStore).categoriesItems);
      observer.next(briefCategoryItem);
    });
    return observable;
  }
  /**
 * Delete giveback to brief category item
 * @param briefCategoryItem
 */
  deleteGiveback(giveback: Giveback) {
    const observable = new Observable((observer) => {

      this.dataStore.categoriesItems.forEach((item, index) => {
        if (item.id === giveback.briefCategoryItemId) {
          this.dataStore.categoriesItems[index].giveback = new Giveback();
        }
      });
      this._categoriesItems.next(Object.assign([], this.dataStore).categoriesItems);
      observer.next(giveback);
    });
    return observable;
  }

  /**
   * Reply giveback
   * @param briefCategoryItem 
   * @param answeredBy 
   */
  replyGiveback(briefCategoryItem: BriefCategoryItem, answeredBy: WorkspaceAccess) {
    const observable = new Observable((observer) => {
      briefCategoryItem.giveback.answeredAt = new Date();
      briefCategoryItem.giveback.modifiedAt = new Date();
      briefCategoryItem.giveback.answeredBy = answeredBy;
      this.dataStore.categoriesItems.forEach((item, index) => {
        if (item.id === briefCategoryItem.id) {
          this.dataStore.categoriesItems[index] = Object.assign({}, briefCategoryItem);
        }
      });
      this._categoriesItems.next(Object.assign([], this.dataStore).categoriesItems);
      observer.next(briefCategoryItem);
    });
    return observable;
  }
  /**
   * Update reply giveback
   * @param briefCategoryItem 
   * @param modifiedBy 
   */
  updateReplyGiveback(briefCategoryItem: BriefCategoryItem, modifiedBy: WorkspaceAccess) {
    const observable = new Observable((observer) => {
      briefCategoryItem.giveback.editedReply = true;
      briefCategoryItem.giveback.modifiedAt = new Date();
      this.dataStore.categoriesItems.forEach((item, index) => {
        if (item.id === briefCategoryItem.id) {
          this.dataStore.categoriesItems[index] = Object.assign({}, briefCategoryItem);
        }
      });
      this._categoriesItems.next(Object.assign([], this.dataStore).categoriesItems);
      observer.next(briefCategoryItem);
    });
    return observable;
  }
  /**
   * Delete reply giveback
   * @param giveback 
   */
  deleteReplyGiveback(giveback: Giveback) {
    const observable = new Observable((observer) => {
      giveback.reply = '';
      giveback.answeredBy = undefined;
      this.dataStore.categoriesItems.forEach((item, index) => {
        if (item.id === giveback.briefCategoryItemId) {
          this.dataStore.categoriesItems[index].giveback = new Giveback();
        }
      });
      this._categoriesItems.next(Object.assign([], this.dataStore).categoriesItems);
      observer.next(giveback);
    });
    return observable;
  }

  hasRepliesNews(has) {
    const observable = new Observable((observer) => {
      observer.next(has);
    });
    return observable;
  }

  // #endregion

  // #region Approval flow  

  // Get comments unresolved
  getCommentsUnresolved() {
    const observable = Observable.create((observer) => {
      let commentPendings = [];
      if (this.dataStore.categories.length > 0) {
        this.dataStore.categories.forEach((category: BriefCategory) => {
          commentPendings = commentPendings.concat(category.commentThreads.filter(c => c.status.key !== 'resolved'));
        });
      }
      observer.next(commentPendings);
    });
    return observable;
  }
  // #endrefion

  // #region Close
  /**
   * Get brief close by id
   * @param id 
   */
  getBriefCloseById(id: any, type = 'brief') {
    const observable = Observable.create(async (observer) => {
      const brief = Object.assign(new Brief(), CORES.filter(c => c.type.key === 'brief')[0]);
      brief.owner = WORKSPACE_ACCESSES[0].user;
      brief.ownerRol = WORKSPACE_ACCESSES[0].rol;
      brief.status = CORE_STATUSES.filter(s => s.key === 'approved')[0];
      brief.approvedDate = new Date();
      brief.approvedBy = <Invitation>{ workspaceAccess: WORKSPACE_ACCESSES[2] };
      brief.approvedBy.groupReference = 'approver';
      if (type === 'brief') {
        brief.template = new BriefTemplate();
        brief.template.name = 'Mi template'
        brief.template = new BriefTemplate();
        brief.template.typeTemplate = TYPES_TEMPLATE.filter(t => t.key === 'brief')[0];

      }
      else if (type === 'pitch') {
        brief.template = new BriefTemplate();
        brief.template.name = 'Mi template';
        brief.template.typeTemplate = TYPES_TEMPLATE.filter(t => t.key === 'pitch')[0];

      }
      console.log(brief);
      observer.next(brief);
    });
    return observable;
  }

  /**
   * Find categories
   * @param id 
   */
  findCategoriesClose(id: any) {
    const observable = new Observable(observer => {
      this.dataStore.categories = [];
      this.dataStore.categories = _.cloneDeep(BRIEF_CATEGORIES);

      this.dataStore.categories.forEach((category: BriefCategory) => {
        category.items.forEach((item: BriefCategoryItem) => {
          if (item.type === BriefCategoryItemType.QUESTION) {
            this.autoFillResponse(item)
          }
        });
      });
      if (this.dataStore.categories.length === 0) {
        const emptyCategory = new BriefCategory();
        emptyCategory.id = uuid();
        emptyCategory.order = 1;
        this.dataStore.categories.push(emptyCategory);
      }
      observer.next(this.dataStore.categories);
    });
    return observable;
  }
  // #endregion
  findGivebacksClose(id: any) {
    const observable = new Observable(observer => {
      this.dataStore.categories = _.cloneDeep(BRIEF_CATEGORIES);
      // Gibeback 1
      const question = this.dataStore.categories[0].items[4];
      const giveback = new Giveback();
      giveback.id = uuid();
      giveback.categoryTitle = 'Antecedentes';
      giveback.subCategoryTitle = 'Contexto';
      giveback.briefCategoryItemTitle = '¿Qué sucede en el mercado? Mencionar tendencias importantes. ';
      giveback.message = `Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum.`;
      const createdBy = ALL_TEAM.filter(w => w.id === '14')[0];
      createdBy.groupReference = 'editor';
      giveback.createdBy = createdBy;
      giveback.createdAt = new Date();
      giveback.modifiedAt = new Date();
      // Relationship
      giveback.briefCategoryId = this.dataStore.categories[0].id;
      giveback.briefCategoryItemId = question.id;

  
      observer.next([giveback]);
    });
    return observable;
  }
  /**
   * Find proposal winner close view
   * @param id 
   */
  findProposalsWinnersClose(id: any) {
    const observable = new Observable(observer => {
      const proposal = <Proposal> _.cloneDeep(PITCH_PROPOSALS[0]);
      proposal.status = 'finalist';
  
      observer.next([proposal]);
    });
    return observable;
  }

  // Get audit of Brief
  getAudit(briefId, withAuditory = false) {
    const observable = Observable.create((observer) => {
      let auditory = [];
      if (withAuditory) {
        auditory = Object.assign([], BRIEF_AUDIT);
      }
      observer.next(auditory);
    });
    return observable;
  }
  // Get category edition log
  getUpdatesCategories(categoryId: any) {

    const observable = Observable.create((observer) => {
      const category = this.dataStore.categories.filter(t => t.id === categoryId)[0];
      // Topic Line edition
      const updateItem = <BriefCategoryItem>category.items[1];
      updateItem.title = `<span class="category-line-edited-wrapper" id="${'category-line-edited-1'}">${updateItem.title}</span>`
      // Return updates
      observer.next({ updateItems: [updateItem], addedLines: [], removeItems: [] });
    });
    return observable;
  }
  // Get topic edition log
  findCategoryEditionLog(categoryId: any) {

    return of(this.categoryEditionLogs.filter(t => t.idCategory === categoryId));
  }

  /**
   * Update dates of pitch brief
   * @param dateOfGivebacks 
   * @param dateOfProposals 
   * @param dateOfResults 
   */
  updateDates(
    dateOfGivebacks,
    dateOfProposals,
    dateOfResults
  ) {

    const observable = new Observable(observer => {
      if (dateOfGivebacks) {
        this.dataStore.brief.dateOfGivebacks = dateOfGivebacks;
      }
      if (dateOfProposals) {
        this.dataStore.brief.dateOfProposals = dateOfProposals;
      }
      if (dateOfResults) {
        this.dataStore.brief.dateOfResults = dateOfResults;
      }
      setTimeout(() => {
        this._brief.next(Object.assign({}, this.dataStore).brief);
        observer.next(this.dataStore.brief);
      });


    });
    return observable;

  }
  // #region Proposals
  /**
   * Load proposals
   * @param id 
   * @param empty 
   * @param proposals 
   */
  loadProposals(id, empty = false, finalist = false) {
    const observable = new Observable(observer => {
      this.dataStore.proposals = [];
      this.dataStore.proposals = _.cloneDeep(PITCH_PROPOSALS);
      if (empty) {
        this.dataStore.proposals = [];
      }
      if(finalist){
        if(this.dataStore.proposals.length > 0){
          this.dataStore.proposals[0].status = 'finalist';
        }
      }

      this._proposals.next(Object.assign([], this.dataStore).proposals);
      observer.next(this.dataStore._proposals);
    });
    return observable;
  }
  /**
   * Get the proposal of current user 
   * @param workspaceAccesId 
   */
  getProposalOfWorkspaceAccess(workspaceAccesId) {
    const observable = new Observable(observer => {
      observer.next(new Proposal());
    });
    return observable;
  }

  /**
   * Add proposal
   * @param proposal 
   */
  addProposal(proposal: Proposal) {
    const observable = Observable.create((observer) => {
      proposal.id = uuid();
      this.dataStore.proposals.push(proposal);
      this._proposals.next(Object.assign([], this.dataStore).proposals);
      observer.next(proposal);
    });
    return observable;
  }
  /**
 * Add proposal
 * @param proposal 
 */
  updateProposal(proposal: Proposal) {
    const observable = Observable.create((observer) => {
      this.dataStore.proposals.forEach((p, i) => {
        if (p.id === proposal.id) {
          this.dataStore.proposals[i] = Object.assign(new Proposal(), proposal);
        }
      });
      this._proposals.next(Object.assign([], this.dataStore).proposals);
      observer.next(proposal);
    });
    return observable;
  }


  /**
  * Add proposal
  * @param proposal 
  */
  removeProposal(proposalId) {
    const observable = Observable.create((observer) => {
      this.dataStore.proposals.forEach((p, i) => {
        if (p.id === proposalId) {
          this.dataStore.proposals.splice(i, 1)
        }
      });
      this._proposals.next(Object.assign([], this.dataStore).proposals);
      observer.next(proposalId);
    });
    return observable;
  }
}
