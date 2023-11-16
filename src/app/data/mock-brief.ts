import { BriefTemplate } from "../models/brief/brief-template";
import { Category } from "../models/brief/category";
import { ResponseType } from "../models/brief/response-type";
import * as uuid from 'uuid/v4';
import { TableCellType } from "../models/brief/table-cell-type";
import { BriefCategory } from "../models/brief/brief-category";
import { BriefCategoryItem } from "../models/brief/brief-category-item";
import { BriefCategoryItemType } from "../models/brief/brief-category-item-type";
import { Option } from "../models/brief/option";
import { ICONS } from "./mock-icons";
import * as moment from 'moment';
import { Table } from "../models/brief/table";
import { TableColumn } from "../models/brief/table-column";
import { TableRow } from "../models/brief/table-row";
import { TableCell } from "../models/brief/table-cell";
import { CORE_TYPES } from "./mock-cores";
import { BriefAudit } from "../models/brief/brief-audit";
import { CategoryEditionLog } from "../models/brief/category-edition-log";
import { Area } from "../models/brief/area";
import { Proposal } from "../models/brief/proposal";
import { ProposalFile } from "../models/brief/proposal-file";
import { Settings } from "http2";
import { GUESTS } from "./mock-team";
import { TypeTemplate } from "../models/brief/type-template";
import { DynamicContent } from "../models/brief/dynamic-content";
// Dates
let $today = new Date();
$today = moment($today).subtract(1, 'hour').toDate();
const $yesterday = moment().subtract(1, 'days').toDate();
const $beforeYesterday = moment().subtract(2, 'days').toDate();
// Cores 
const briefTemplateType = CORE_TYPES.filter(t => t.key === 'brief-template')[0];
// Mask
export const MASK_PERCENTAGE = '0000';
// Categories
export const AREAS = [
  <Area>{ id: uuid(), key: 'architecture', name: 'Arquitectura' },
  <Area>{ id: uuid(), key: 'administration', name: 'Administración' },
  <Area>{ id: uuid(), key: 'marketing', name: 'Marketing' },
  <Area>{ id: uuid(), key: 'politics', name: 'Política' },
  <Area>{ id: uuid(), key: 'legal', name: 'Legales' },
  <Area>{ id: uuid(), key: 'science', name: 'Ciencia' },
  <Area>{ id: uuid(), key: 'physical', name: 'Física' },
  <Area>{ id: uuid(), key: 'production', name: 'Producción' }

];
// Categories
export const CATEGORIES = [
  <Category>{ id: uuid(), key: 'strategy', name: 'Estrategico & Creativo' ,area:AREAS[2]},
  <Category>{ id: uuid(), key: 'social', name: 'Social media',area:AREAS[2]},
  <Category>{ id: uuid(), key: 'media', name: 'Media',area:AREAS[2]},
  <Category>{ id: uuid(), key: 'campaign', name: 'Campaña',area:AREAS[2]},
  <Category>{ id: uuid(), key: 'branding', name: 'Branding',area:AREAS[2]}

];
export const TYPES_TEMPLATE = [
  <TypeTemplate>{ id: uuid(), key: 'brief', name: 'Template brief' },
  <TypeTemplate>{ id: uuid(), key: 'pitch', name: 'Template pitch' }
  

];
// Brief Categories items response types
export const BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES = [
  <ResponseType>{
    id: '1',
    enabled: true,
    text: 'Cortas',
    key: 'text',
    iconSmall: 'assets/img/brief/response-types/small/ico_small_answer_short.svg',
    icon: 'assets/img/brief/response-types/ico_answer_short.svg'
  },
  <ResponseType>{
    id: '2', enabled: true, text: 'Largas', key: 'text-large',
    iconSmall: 'assets/img/brief/response-types/small/ico_small_answer_long.svg',
    icon: 'assets/img/brief/response-types/ico_answer_long.svg',
  },
  <ResponseType>{
    id: '3', enabled: true, text: 'Casillas', key: 'checkbox',
    iconSmall: 'assets/img/brief/response-types/small/ico_small_checkbox.svg',
    icon: 'assets/img/brief/response-types/ico_checkbox.svg'
  },
  <ResponseType>{
    id: '4', enabled: true, text: 'Selección', key: 'radio',
    iconSmall: 'assets/img/brief/response-types/small/ico_small_radio.svg', icon: 'assets/img/brief/response-types/ico_radio.svg'
  },
  <ResponseType>{
    id: '5', enabled: true, text: 'Desplegable', key: 'select',
    iconSmall: 'assets/img/brief/response-types/small/ico_small_select.svg', icon: 'assets/img/brief/response-types/ico_select.svg'
  },
  <ResponseType>{
    id: '6', enabled: true, text: 'Listas', key: 'list',
    iconSmall: 'assets/img/brief/response-types/small/ico_small_list.svg', icon: 'assets/img/brief/response-types/ico_list.svg'
  },
  <ResponseType>{
    id: '7', enabled: true, text: 'Si / No', key: 'yes-no',
    iconSmall: 'assets/img/brief/response-types/small/ico_small_yes_not.svg', icon: 'assets/img/brief/response-types/ico_yes_not.svg'
  },
  <ResponseType>{
    id: '8', enabled: true, text: 'Ascendente', key: 'ascendent',
    iconSmall: 'assets/img/brief/response-types/small/ico_small_upward.svg', icon: 'assets/img/brief/response-types/ico_upward.svg'
  },
  <ResponseType>{
    id: '9', enabled: true, text: 'Tabla', key: 'table',
    iconSmall: 'assets/img/brief/response-types/small/ico_small_table.svg', icon: 'assets/img/brief/response-types/ico_table.svg'
  },
  <ResponseType>{
    id: '10', enabled: true, text: 'Fecha y hora', key: 'date',
    iconSmall: 'assets/img/brief/response-types/small/ico_small_date.svg', icon: 'assets/img/brief/response-types/ico_date.svg'
  },
  <ResponseType>{
    id: '11', enabled: true, text: 'Cantidad', key: 'quantity',
    iconSmall: 'assets/img/brief/response-types/small/ico_small_quantity.svg', icon: 'assets/img/brief/response-types/ico_quantity.svg'
  },
  <ResponseType>{
    id: '14', enabled: true, text: 'Valoración', key: 'assessment',
    iconSmall: 'assets/img/brief/response-types/small/ico_small_assessment.svg',
    icon: 'assets/img/brief/response-types/ico_assessment.svg'
  }
];
// Table
export const TABLE_CELL_TYPES = [
  <TableCellType>{ id: 1, enabled: true, text: 'Texto', key: 'text', icon: 'assets/img/brief/response-types/table/ico_text_table.svg' },
  <TableCellType>{ id: 2, enabled: true, text: 'Porcentaje', key: 'percentage', icon: 'assets/img/brief/response-types/table/ico_percentage_table.svg' },
  <TableCellType>{ id: 3, enabled: true, text: 'Fecha', key: 'date', icon: 'assets/img/brief/response-types/table/ico_date_table.svg' },
  <TableCellType>{ id: 4, enabled: true, text: 'Cantidad', key: 'quantity', icon: 'assets/img/brief/response-types/table/ico_quantity_table.svg' },
  <TableCellType>{ id: 5, enabled: true, text: 'Desplegable', key: 'select', icon: 'assets/img/brief/response-types/table/ico_select_table.svg' }

];
// Quantity Configuration

export const QUANTITY_TYPES = [
  { type: 'number', mask: '0*', placeholder: '00000' },
  { type: 'percentage', mask: '000', placeholder: '000' },
  { type: 'currency', mask: '0*.00', placeholder: '000.00' }
]
function generateTableNew() {
  const cellTypeText = TABLE_CELL_TYPES.filter(t => t.key === 'date')[0];
  //Table Default
  const tableDefault: Table = {
    id: uuid(),
    isNew: true,
    columns: <TableColumn[]>[
      <TableColumn>{ id: uuid(), label: 'Texto', width: 0 },
      <TableColumn>{ id: uuid(), label: 'Texto', width: 0 },
      <TableColumn>{ id: uuid(), label: 'Texto', width: 0 },
      <TableColumn>{ id: uuid(), label: 'Texto', width: 0 }
    ],
    rows: <TableRow[]>[
      <TableRow>{
        id: uuid(), label: 'Texto',
        cells: <TableCell[]>[
          <TableCell>{ id: uuid(), type: cellTypeText, value: "", options: [], isNew: true },
          <TableCell>{ id: uuid(), type: cellTypeText, value: "", options: [], isNew: true },
          <TableCell>{ id: uuid(), type: cellTypeText, value: "", options: [], isNew: true }
        ]
      },
      <TableRow>{
        id: uuid(), label: 'Texto',
        cells: <TableCell[]>[
          <TableCell>{ id: uuid(), type: cellTypeText, value: "", options: [], isNew: true },
          <TableCell>{ id: uuid(), type: cellTypeText, value: "", options: [], isNew: true },
          <TableCell>{ id: uuid(), type: cellTypeText, value: "", options: [], isNew: true }
        ]
      }
    ]
  };
  return tableDefault;
}
// Templates
export const BRIEF_TEMPLATES = [
  Object.assign(new BriefTemplate(), <BriefTemplate>({
    id: '1',
    type: briefTemplateType,
    title: 'Agencia',
    category: CATEGORIES[0],
    img: 'assets/img/brief/templates/1.jpg',
    cover: 'assets/img/brief/templates/bg/1.png',
    text: 'It all begins with your idea Following best practices, we help you gain.',
    isLibrary: true,
    typeTemplate:TYPES_TEMPLATE[0],
    modified: $today,

  })),
  Object.assign(new BriefTemplate(), <BriefTemplate>({
    id: '2',
    type: briefTemplateType,
    title: 'Estrategico & Creativo',
    category: CATEGORIES[0],
    img: 'assets/img/brief/templates/2.png',
    cover: 'assets/img/brief/templates/bg/1.png',
    text: 'It all begins with your idea Following best practices, we help you gain.',
    isLibrary: true,
    typeTemplate:TYPES_TEMPLATE[1],
    withResponses:true,
    modified: $yesterday

  })),
  Object.assign(new BriefTemplate(), <BriefTemplate>({
    id: "3",
    type: briefTemplateType,
    title: 'Social Media',
    category: CATEGORIES[0],
    img: 'assets/img/brief/templates/3.jpg',
    cover: 'assets/img/brief/templates/bg/1.png',
    text: 'It all begins with your idea Following best practices, we help you gain.',
    isLibrary: true,
    typeTemplate:TYPES_TEMPLATE[0],
    modified: $beforeYesterday

  })),
  Object.assign(new BriefTemplate(), <BriefTemplate>({
    id: "4",
    type: briefTemplateType,
    title: 'Media',
    category: CATEGORIES[0],
    img: 'assets/img/brief/templates/4.jpg',
    cover: 'assets/img/brief/templates/bg/1.png',
    text: 'It all begins with your idea Following best practices, we help you gain.',
    isLibrary: true,
    typeTemplate:TYPES_TEMPLATE[0],
    modified: $today
  })),
  Object.assign(new BriefTemplate(), <BriefTemplate>({
    id: "5",
    type: briefTemplateType,
    title: 'Campaña',
    category: CATEGORIES[0],
    img: 'assets/img/brief/templates/5.jpg',
    cover: 'assets/img/brief/templates/bg/1.png',
    text: 'It all begins with your idea Following best practices, we help you gain.',
    isLibrary: true,
    typeTemplate:TYPES_TEMPLATE[0],
    modified: $yesterday
  })),
  Object.assign(new BriefTemplate(), <BriefTemplate>({
    id: "6",
    type: briefTemplateType,
    title: 'Branding',
    category: CATEGORIES[0],
    img: 'assets/img/brief/templates/6.jpg',
    cover: 'assets/img/brief/templates/bg/1.png',
    text: 'It all begins with your idea Following best practices, we help you gain.',
    isLibrary: false,
    typeTemplate:TYPES_TEMPLATE[0],
    modified: $beforeYesterday
  })),
  Object.assign(new BriefTemplate(), <BriefTemplate>({
    id: "7",
    type: briefTemplateType,
    title: 'Digital',
    category: CATEGORIES[0],
    img: 'assets/img/brief/templates/7.jpg',
    cover: 'assets/img/brief/templates/bg/1.png',
    text: 'It all begins with your idea Following best practices, we help you gain.',
    isLibrary: false,
    typeTemplate:TYPES_TEMPLATE[0],
    modified: $today
  })),
  Object.assign(new BriefTemplate(), <BriefTemplate>({
    id: "8",
    type: briefTemplateType,
    title: 'Evento',
    category: CATEGORIES[0],
    img: 'assets/img/brief/templates/8.jpg',
    cover: 'assets/img/brief/templates/bg/1.png',
    text: 'It all begins with your idea Following best practices, we help you gain.',
    isLibrary: false,
    typeTemplate:TYPES_TEMPLATE[0],
    modified: $yesterday
  })),
  Object.assign(new BriefTemplate(), <BriefTemplate>({
    id: "9",
    type: briefTemplateType,
    title: 'BTL',
    category: CATEGORIES[0],
    img: 'assets/img/brief/templates/9.jpg',
    cover: 'assets/img/brief/templates/bg/1.png',
    text: 'It all begins with your idea Following best practices, we help you gain.',
    isLibrary: false,
    typeTemplate:TYPES_TEMPLATE[0],
    modified: $yesterday
  })),
  Object.assign(new BriefTemplate(), <BriefTemplate>({
    id: "10",
    type: briefTemplateType,
    title: 'ATL',
    category: CATEGORIES[0],
    img: 'assets/img/brief/templates/10.jpg',
    cover: 'assets/img/brief/templates/bg/1.png',
    text: 'It all begins with your idea Following best practices, we help you gain.',
    typeTemplate:TYPES_TEMPLATE[1],
    withResponses:true,
    modified: $beforeYesterday
  })),

];
// Antecedentes
export const ANTECEDENTES_ITEMS = [
  // ####Antecedentes
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: 'antecedentes',
    order: 1,
    idBriefCategory: 'antecedentes',
    type: BriefCategoryItemType.SUB_CATEGORY,
    title: 'Antecedentes'
  }),


  // Question 1
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: uuid(),
    order: 2,
    idParent: 'antecedentes',
    idBriefCategory: 'antecedentes',
    type: BriefCategoryItemType.QUESTION,
    title: ' Descripción del proyecto.',
    description: 'Describa brevemente el proyecto en una o dos frases.',
    responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'text')[0],
    responseContent: Object.assign({}, {
      text: '',
      files: {
        video: undefined,
        image: undefined,
        file: undefined,
        audio: undefined,
        link: undefined
      }
    }),
    responseSettings: { maxLength: 300, acceptFiles: { video: false, image: false, file: false, audio: false, link: false } }
  }),
  // ####Contexto
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: 'contexto',
    order: 3,
    idBriefCategory: 'antecedentes',
    type: BriefCategoryItemType.SUB_CATEGORY,
    title: 'Contexto'
  }),
  // Question 1
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: uuid(),
    order: 4,
    idParent: 'contexto',
    idBriefCategory: 'antecedentes',
    type: BriefCategoryItemType.QUESTION,
    title: ' Contexto.',
    description: `Describa brevemente cualquier antecedente de este proyecto que sea útil para la agencia y conteste dentro de la descripción: ¿Por qué estás haciendo este proyecto? ¿Es parte de o conectado a algo más? Es decir, es un lanzamiento de nuevos productos para nuestra empresa, pero hay dos competidores en el mercado; O hemos tenido este producto por años y hemos decidido invertir en la comercialización mejor.`,
    responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'text-large')[0],
    responseContent: {
      text: '',
      files: {
        video: undefined,
        image: undefined,
        file: undefined,
        audio: undefined,
        link: undefined
      }
    },
    responseSettings: { maxLength: 500, acceptFiles: { video: false, image: false, file: false, audio: false, link: false } }
  }),
  // Question 2
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: uuid(),
    order: 5,
    idParent: 'contexto',
    idBriefCategory: 'antecedentes',
    type: BriefCategoryItemType.QUESTION,
    title: ' ¿Qué sucede en el mercado? Mencionar tendencias importantes.?',
    description: '',
    responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'text-large')[0],
    responseContent: {
      text: '',
      files: {
        video: undefined,
        image: undefined,
        file: undefined,
        audio: undefined,
        link: undefined
      }
    },
    responseSettings: { maxLength: 500, acceptFiles: { video: false, image: false, file: false, audio: false, link: false } }
  }),
  // Question 3
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: uuid(),
    order: 6,
    idParent: 'contexto',
    idBriefCategory: 'antecedentes',
    type: BriefCategoryItemType.QUESTION,
    title: ' ¿Qué están haciendo los competidores?',
    description: '',
    responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'text-large')[0],
    responseContent: {
      text: '',
      files: {
        video: undefined,
        image: undefined,
        file: undefined,
        audio: undefined,
        link: undefined
      }
    },
    responseSettings: { maxLength: 500, acceptFiles: { video: false, image: false, file: false, audio: false, link: false } }
  }),
  // ####Ventaja competitiva
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: 'ventaja',
    order: 7,
    idBriefCategory: 'antecedentes',
    type: BriefCategoryItemType.SUB_CATEGORY,
    title: 'Ventaja competitiva'
  }),
  // Question 1
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: uuid(),
    order: 8,
    idParent: 'ventaja',
    idBriefCategory: 'antecedentes',
    type: BriefCategoryItemType.QUESTION,
    title: 'Enumeración de ventaja competitiva.',
    description: 'Al igual que un análisis FODA trate de identificar sus ventajas que podría usar a su favor.',
    responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'list')[0],
    responseContent: {
      text: '',
      files: {
        video: undefined,
        image: undefined,
        file: undefined,
        audio: undefined,
        link: undefined
      }
    },
    responseSettings: {
      options: [
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'list',
          order: 1
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'list',
          order: 1
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'list',
          order: 1
        }),
      ],
      acceptFiles: { video: false, image: false, file: true, audio: false, link: false }
    }
  }),

]
// Audiencia
export const AUDIENCIA_ITEMS = [
  // ####Antecedentes
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: 'publico',
    order: 1,
    idBriefCategory: 'audiencia',
    type: BriefCategoryItemType.SUB_CATEGORY,
    title: 'Público objetivo o target'
  }),
  // Question 1
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: 'audiencia-segmentos',
    order: 2,
    idParent: 'publico',
    idBriefCategory: 'audiencia',
    type: BriefCategoryItemType.QUESTION,
    title: 'Elija el o los segmentos de edad a los que desea llegar.',
    description: '',
    responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'checkbox')[0],
    responseContent: {
      options: [],
      files: {
        video: undefined,
        image: undefined,
        file: undefined,
        audio: undefined,
        link: undefined
      }
    },
    responseSettings: {
      options: [
        Object.assign(new Option, <Option>{
          id: 'audiencia-segmentos-opcion-1',
          icon: ICONS[0],
          type: 'checkbox',
          label: '7 -14 años',
          order: 1
        }),
        Object.assign(new Option, <Option>{
          id: 'audiencia-segmentos-opcion-2',
          type: 'checkbox',
          icon: ICONS[0],
          label: '14 - 18 años',
          order: 2
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'checkbox',
          icon: ICONS[0],
          label: '18 - 24 años',
          order: 3
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'checkbox',
          icon: ICONS[0],
          label: '24 - 34 años',
          order: 4
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'checkbox',
          icon: ICONS[0],
          label: '34 -45 años',
          order: 5
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'checkbox',
          icon: ICONS[0],
          label: '45 - 65 años',
          order: 6
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'checkbox',
          icon: ICONS[0],
          label: '+65 años',
          order: 7
        }),
      ],
      acceptFiles: { video: false, image: false, file: false, audio: false, link: false }
    },
    childs: [
      Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
        id: uuid(),
        order: 1,
        idQuestionParent: 'audiencia-segmentos',
        idBriefCategory: 'audiencia',
        type: BriefCategoryItemType.QUESTION,
        title: ' Descripción del proyecto.',
        description: 'Describa brevemente el proyecto en una o dos frases.',
        responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'text')[0],
        optionParent: Object.assign(new Option, <Option>{
          id: 'audiencia-segmentos-opcion-1',
          icon: ICONS[0],
          type: 'checkbox',
          label: '7 -14 años',
          order: 1
        }),
        responseContent: Object.assign({}, {
          text: '',
          files: {
            video: undefined,
            image: undefined,
            file: undefined,
            audio: undefined,
            link: undefined
          }
        }),
        responseSettings: { maxLength: 300, acceptFiles: { video: false, image: false, file: false, audio: false, link: false } }

      }),
      Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
        id: uuid(),
        order: 2,
        idQuestionParent: 'audiencia-segmentos',
        idBriefCategory: 'audiencia',
        type: BriefCategoryItemType.QUESTION,
        title: ' Descripción del proyecto.',
        description: 'Describa brevemente el proyecto en una o dos frases.',
        responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'text')[0],
        optionParent: Object.assign(new Option, <Option>{
          id: 'audiencia-segmentos-opcion-2',
          type: 'checkbox',
          icon: ICONS[0],
          label: '14 - 18 años',
          order: 2
        }),
        responseContent: Object.assign({}, {
          text: '',
          files: {
            video: undefined,
            image: undefined,
            file: undefined,
            audio: undefined,
            link: undefined
          }
        }),
        responseSettings: { maxLength: 300, acceptFiles: { video: false, image: false, file: false, audio: false, link: false } }
      }),
    ]

  }),
  // Question 2
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: uuid(),
    order: 3,
    idParent: 'publico',
    idBriefCategory: 'audiencia',
    type: BriefCategoryItemType.QUESTION,
    title: 'Género',
    description: '',
    responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'checkbox')[0],
    responseContent: {
      options: [],
      files: {
        video: undefined,
        image: undefined,
        file: undefined,
        audio: undefined,
        link: undefined
      }
    },
    responseSettings: {
      options: [
        Object.assign(new Option, <Option>{
          id: uuid(),
          icon: ICONS[0],
          type: 'checkbox',
          label: 'Hombre',
          order: 1
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'checkbox',
          icon: ICONS[0],
          label: 'Mujer',
          order: 2
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'checkbox',
          icon: ICONS[0],
          label: 'Ambos',
          order: 3
        }),

      ],
      acceptFiles: { video: false, image: false, file: false, audio: false, link: false }
    }
  }),
  // Question 3
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: uuid(),
    order: 4,
    idParent: 'publico',
    idBriefCategory: 'audiencia',
    type: BriefCategoryItemType.QUESTION,
    title: '¿Usan mesajería?',
    description: '',
    responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'radio')[0],
    responseContent: {
      options: [],
      files: {
        video: undefined,
        image: undefined,
        file: undefined,
        audio: undefined,
        link: undefined
      }
    },
    responseSettings: {
      options: [
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'radio',
          label: 'A+',
          order: 1
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'radio',
          label: 'A',
          order: 2
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'radio',
          label: 'A-',
          order: 3
        }),
        // B
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'radio',
          label: 'B+',
          order: 4
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'radio',
          label: 'B',
          order: 5
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'radio',
          label: 'B-',
          order: 6
        }),
        // C
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'radio',
          label: 'C+',
          order: 7
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'radio',
          label: 'C',
          order: 8
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'radio',
          label: 'C-',
          order: 9
        }),
        // D
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'radio',
          label: 'D',
          order: 10
        }),



      ],
      acceptFiles: { video: false, image: false, file: false, audio: false, link: false }
    }
  }),
  // Question 4
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: uuid(),
    order: 5,
    idParent: 'publico',
    idBriefCategory: 'audiencia',
    type: BriefCategoryItemType.QUESTION,
    title: '¿Usan mesajería?',
    description: '',
    responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'yes-no')[0],
    responseContent: {
      options: [],
      files: {
        video: undefined,
        image: undefined,
        file: undefined,
        audio: undefined,
        link: undefined
      }
    },
    responseSettings: {
      options: [
        Object.assign(new Option, <Option>{
          id: uuid(),
          icon: ICONS[0],
          type: 'yes-no',
          label: 'Si',
          order: 1
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'yes-no',
          icon: ICONS[0],
          label: 'No',
          order: 2
        }),

      ],
      acceptFiles: { video: false, image: false, file: false, audio: false, link: false }
    }
  }),
  // Question 5
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: uuid(),
    order: 6,
    idParent: 'publico',
    idBriefCategory: 'audiencia',
    type: BriefCategoryItemType.QUESTION,
    title: '¿Qué redes sociales visitan? ',
    description: '',
    responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'checkbox')[0],
    responseContent: {
      options: [],
      files: {
        video: undefined,
        image: undefined,
        file: undefined,
        audio: undefined,
        link: undefined
      }
    },
    responseSettings: {
      options: [
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'checkbox',
          icon: ICONS.filter(i => i.value === 'ion-logo-snapchat')[0],
          label: 'Snapchat',
          order: 1
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'checkbox',
          icon: ICONS.filter(i => i.value === 'ion-logo-twitter')[0],
          label: 'Twitter',
          order: 2
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'checkbox',
          icon: ICONS.filter(i => i.value === 'ion-logo-facebook')[0],
          label: 'Facebook',
          order: 3
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'Instagram',
          icon: ICONS.filter(i => i.value === 'ion-logo-instagram')[0],
          label: 'No',
          order: 4
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'Linkedin',
          icon: ICONS.filter(i => i.value === 'ion-logo-linkedin')[0],
          label: 'No',
          order: 5
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'checkbox',
          icon: ICONS.filter(i => i.value === 'ion-ios-desktop')[0],
          label: 'Otros',
          order: 6
        })

      ],
      acceptFiles: { video: false, image: false, file: false, audio: false, link: false }
    }
  }),
]

// Estrategia items
export const ESTRATEGIA_ITEMS = [
  // ####Antecedentes
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: 'estrategia',
    order: 1,
    idBriefCategory: 'estrategia',
    type: BriefCategoryItemType.SUB_CATEGORY,
    title: 'Base estratégica de la propuesta.'
  }),
  // Question 1
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: uuid(),
    order: 2,
    idParent: 'estrategia',
    idBriefCategory: 'estrategia',
    type: BriefCategoryItemType.QUESTION,
    title: 'Plan estratégico.',
    description: ``,
    responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'text-large')[0],
    responseContent: {
      text: `Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis vitae. Donec sagittis faucibus lacus eget blandit. Mauris vitae ultricies metus, at condimentum nulla. Donec quis ornare lacus. Etiam gravida mollis tortor quis porttitor. Venenatis facilisis dolor. In feugiat orci odio, sed lacinia sem elementum quis. Aliquam consectetur, eros et vulputate euismod, nunc leo tempor lacus.`,
      files: {
        video: undefined,
        image: undefined,
        file: undefined,
        audio: undefined,
        link: undefined
      }
    },
    responseSettings: {
      maxLength: 500,
      acceptFiles: { video: true, image: true, file: true, audio: true, link: true }
    }
  }),
  // Question 2
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: uuid(),
    order: 3,
    idParent: 'estrategia',
    idBriefCategory: 'estrategia',
    type: BriefCategoryItemType.QUESTION,
    title: 'Respuesta deseada.',
    description: `¿Cuál es el resultado deseado de la publicidad, la comunicación o el objetivo social? ¿Una acción? ¿Una percepción? Crear una lista numerada. Organizar la lista por orden de prioridad. Recuerde, cuanto más objetivos tengamos más diluido será el esfuerzo. Grandes campañas tienden a centrarse en un objetivo claro y tienen un mensaje clave. Dilo y muéstralo.`,
    responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'text-large')[0],
    responseContent: {
      text: '',
      files: {
        video: undefined,
        image: undefined,
        file: undefined,
        audio: undefined,
        link: undefined
      }
    },
    responseSettings: { maxLength: 500, acceptFiles: { video: false, image: false, file: false, audio: false, link: false } }
  }),
]

// Media items
export const MEDIA_ITEMS = [
  // ####Antecedentes
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: 'media',
    order: 1,
    idBriefCategory: 'media',
    type: BriefCategoryItemType.SUB_CATEGORY,
    title: 'Descripción del plan media.'
  }),
  // Question 1
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: uuid(),
    order: 2,
    idParent: 'media',
    idBriefCategory: 'media',
    type: BriefCategoryItemType.QUESTION,
    title: 'Descripción del proyecto.',
    description: `Si sabe qué medios va a utilizar para otros elementos de la campaña, describa todo lo que pueda aquí. Ayudará a su agencia a desarrollar una ejecución más holística para usted (una que se relaciona con el resto de su plan y, por lo tanto, tiene un efecto de marketing más potente).`,
    responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'text-large')[0],
    responseContent: {
      text: ``,
      files: {
        video: undefined,
        image: undefined,
        file: undefined,
        audio: undefined,
        link: undefined
      }
    },
    responseSettings: {
      maxLength: 500,
      acceptFiles: { video: false, image: false, file: false, audio: false, link: false }
    }
  }),

]
// mandatorios Items
export const MANDATARIOS_ITEMS = [
  // ####mandatorios
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: 'mandatorios',
    order: 1,
    idBriefCategory: 'mandatorios',
    type: BriefCategoryItemType.SUB_CATEGORY,
    title: 'Puntos más importantes a tener en cuenta.'
  }),
  // Question 1
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: uuid(),
    order: 2,
    idParent: 'mandatorios',
    idBriefCategory: 'mandatorios',
    type: BriefCategoryItemType.QUESTION,
    title: 'Obligatorios.',
    description: `Enumere los elementos obligatorios. Tenga cuidado aquí no poner demasiados artículos como usted atará las manos de su agencia en cuanto a los conceptos o los diseños van. Idealmente, usted quiere darles libertad para ser lo más creativos posible. Los elementos potenciales obligatorios pueden incluir: un logotipo, una etiqueta, una URL de sitio web. Poniendo artículos en esta lista usted está diciendo "no nos muestre ninguna creativa que no tenga estas cosas en ella."`,
    responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'ascendent')[0],
    responseContent: {
      options: [],
      files: {
        video: undefined,
        image: undefined,
        file: undefined,
        audio: undefined,
        link: undefined
      }
    },
    responseSettings: {
      options: [
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'ascendent',
          order: 1
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'ascendent',
          order: 2
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'ascendent',
          order: 3
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'ascendent',
          order: 4
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'ascendent',
          order: 5
        }),
      ],
      acceptFiles: { video: false, image: false, file: false, audio: false, link: false }
    }
  }),
  // Question 2
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: uuid(),
    order: 3,
    idParent: 'mandatorios',
    idBriefCategory: 'mandatorios',
    type: BriefCategoryItemType.QUESTION,
    title: 'Elija el o los segmentos de edad a los que desea llegar.',
    description: ``,
    responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'checkbox')[0],
    responseContent: {
      options: [],
      files: {
        video: undefined,
        image: undefined,
        file: undefined,
        audio: undefined,
        link: undefined
      }
    },
    responseSettings: {
      options: [
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'checkbox',
          label: 'Campaña integral',
          icon: ICONS[0],
          order: 1
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'checkbox',
          label: 'Digital',
          icon: ICONS[0],
          order: 2
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'checkbox',
          label: 'ATL',
          icon: ICONS[0],
          order: 3
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'checkbox',
          label: 'BTL',
          icon: ICONS[0],
          order: 4
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'checkbox',
          label: 'Media',
          icon: ICONS[0],
          order: 5
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'checkbox',
          label: 'Social media',
          icon: ICONS[0],
          order: 6
        }),
      ],
      acceptFiles: { video: false, image: false, file: false, audio: false, link: false }
    }
  }),
  // Question 3
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: uuid(),
    order: 4,
    idParent: 'mandatorios',
    idBriefCategory: 'mandatorios',
    type: BriefCategoryItemType.QUESTION,
    title: 'Entregables.',
    description: `¿Cuáles son los productos finales? ¿Qué le proporcionará la agencia en realidad? Un folleto impreso, un sitio web en funcionamiento, un anuncio de radio, un cartel, un portal de internet, una campaña integral.`,
    responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'list')[0],
    responseContent: {
      options: [],
      files: {
        video: undefined,
        image: undefined,
        file: undefined,
        audio: undefined,
        link: undefined
      }
    },
    responseSettings: {
      options: [
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'list',
          order: 1
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'list',
          order: 2
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'list',
          order: 3
        }),

      ],
      acceptFiles: { video: false, image: false, file: false, audio: false, link: false }
    }
  }),


]
// Consideraciones Items
export const CONSIDERACIONES_ITEMS = [
  // ####mandatorios
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: 'consideraciones',
    order: 1,
    idBriefCategory: 'consideraciones',
    type: BriefCategoryItemType.SUB_CATEGORY,
    title: 'Temas a considerar.'
  }),
  // Question 1
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: uuid(),
    order: 2,
    idParent: 'consideraciones',
    idBriefCategory: 'consideraciones',
    type: BriefCategoryItemType.QUESTION,
    title: 'Presupuesto.',
    description: `¿Cuál es el presupuesto para este proyecto?`,
    responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'quantity')[0],
    responseContent: {
      quantity: '',
      files: {
        video: undefined,
        image: undefined,
        file: undefined,
        audio: undefined,
        link: undefined
      }
    },
    responseSettings: {
      quantity: QUANTITY_TYPES[2],
      acceptFiles: { video: false, image: false, file: false, audio: false, link: false }
    }
  }),
  // Question 2
  Object.assign(new BriefCategoryItem(), <BriefCategoryItem>{
    id: uuid(),
    order: 2,
    idParent: 'consideraciones',
    idBriefCategory: 'consideraciones',
    type: BriefCategoryItemType.QUESTION,
    title: 'Presupuesto.',
    description: `¿Cuál es el presupuesto para este proyecto?`,
    responseType: BRIEF_CATEGORIES_ITEMS_RESPONSE_TYPES.filter(t => t.key === 'date')[0],
    responseContent: {
      options: [],
      files: {
        video: undefined,
        image: undefined,
        file: undefined,
        audio: undefined,
        link: undefined
      }
    },
    responseSettings: {
      options: [
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'date',
          order: 1
        }),
        Object.assign(new Option, <Option>{
          id: uuid(),
          type: 'time',
          order: 2
        }),
      ],
      acceptFiles: { video: false, image: false, file: false, audio: false, link: false }
    }
  }),
];
// Categories
export const BRIEF_CATEGORIES = [
  // Antecedentes
  Object.assign(new BriefCategory(), <BriefCategory>{
    id: 'antecedentes',
    title: 'Antecedentes',
    order: 1,
    items: ANTECEDENTES_ITEMS,

  }),
  // Audiencia
  Object.assign(new BriefCategory(), <BriefCategory>{
    id: 'audiencia',
    title: 'Audiencia',
    order: 2,
    items: Object.assign([], AUDIENCIA_ITEMS),

  }),
  // Estrategia
  Object.assign(new BriefCategory(), <BriefCategory>{
    id: 'estrategia',
    title: 'Estrategía',
    order: 3,
    items: Object.assign([], ESTRATEGIA_ITEMS)

  }),
  // Media
  Object.assign(new BriefCategory(), <BriefCategory>{
    id: 'media',
    title: 'Media',
    order: 4,
    items: Object.assign([], MEDIA_ITEMS),

  }),
  // Mandatorios
  Object.assign(new BriefCategory(), <BriefCategory>{
    id: 'mandatorios',
    title: 'Mandatorios',
    order: 5,
    items: Object.assign([], MANDATARIOS_ITEMS),

  }),
  // Consideraciones
  Object.assign(new BriefCategory(), <BriefCategory>{
    id: 'consideraciones',
    title: 'Consideraciones finales',
    order: 6,
    items: Object.assign([], CONSIDERACIONES_ITEMS),

  })
];
// Brief Audit
export const BRIEF_AUDIT = [
  <BriefAudit>{
    id: uuid(),
    text: `Se agregó una nueva categoría “Estudios”`,
  },
  <BriefAudit>{
    id: uuid(),
    text: `Se edito la pregunta de Antecedentes en la subcategoría “empresas”`,
  },
  <BriefAudit>{
    id: uuid(),
    text: `Se  edito una respuesta en Presupuesto`,
  },
  <BriefAudit>{
    id: uuid(),
    text: `Se realizaron 5 nuevos comentarios en la categoría “Competidores”`,
  }
]


// Topic Edition log
export const CATEGORIES_EDITION_LOG = [
  <CategoryEditionLog>{
    id: '1',
    idCategoryItem: 'idCategoryItem',
    idCategory: 'antecedentes'
  }
];

export const PITCH_PROPOSALS =[
  Object.assign(new Proposal(),<Proposal>{
    id:uuid(),
    message: `Synth polaroid bitters chillwave pickled. Vegan disrupt tousled, Portland keffiyeh aesthetic food truck sriracha cornhole single-origin coffee church-key roof party. Leggings ethical.`,
    files:[
      <ProposalFile>{
        id:uuid(),
        name:'propuesta_1.png',
        // File
        url: '/assets/img/feedback/examples/piece_1_v2.jpg',
        // setting
        setting:<Settings>{},
        created: new Date(),
        modified: new Date()
      },
      <ProposalFile>{
        id:uuid(),
        name:'propuesta_2.png',
        // File
        url: '/assets/img/feedback/examples/piece_1.jpg',
        // setting
        setting:<Settings>{},
        created: new Date(),
        modified: new Date()
      },
      <ProposalFile>{
        id:uuid(),
        name:'propuesta_3.png',
        // File
        url: '/assets/img/feedback/examples/piece_3.jpg',
        // setting
        setting:<Settings>{},
        created: new Date(),
        modified: new Date()
      }
    ],
    createdBy:GUESTS[0],
    created:new Date(),
    modified:new Date()
  }),
  Object.assign(new Proposal(),<Proposal>{
    id:uuid(),
    message: `Synth polaroid bitters chillwave pickled. Vegan disrupt tousled, Portland keffiyeh aesthetic food truck sriracha cornhole single-origin coffee church-key roof party. Leggings ethical.`,
    files:[
      <ProposalFile>{
        id:uuid(),
        name:'propuesta_1.png',
        // File
        url: '/assets/img/feedback/examples/piece_1_v2.jpg',
        // setting
        setting:<Settings>{},
        created: new Date(),
        modified: new Date()
      },
      <ProposalFile>{
        id:uuid(),
        name:'propuesta_2.png',
        // File
        url: '/assets/img/feedback/examples/piece_1.jpg',
        // setting
        setting:<Settings>{},
        created: new Date(),
        modified: new Date()
      },
      <ProposalFile>{
        id:uuid(),
        name:'propuesta_3.png',
        // File
        url: '/assets/img/feedback/examples/piece_3.jpg',
        // setting
        setting:<Settings>{},
        created: new Date(),
        modified: new Date()
      },
      <ProposalFile>{
        id:uuid(),
        name:'propuesta_4.png',
        // File
        url: '/assets/img/feedback/examples/piece_1_v2.jpg',
        // setting
        setting:<Settings>{},
        created: new Date(),
        modified: new Date()
      },
      <ProposalFile>{
        id:uuid(),
        name:'propuesta_5.png',
        // File
        url: '/assets/img/feedback/examples/piece_1.jpg',
        // setting
        setting:<Settings>{},
        created: new Date(),
        modified: new Date()
      }
    ],
    createdBy:GUESTS[2],
    created:new Date(),
    modified:new Date()
  }),
  Object.assign(new Proposal(),<Proposal>{
    id:uuid(),
    message: undefined,
    files:[
      <ProposalFile>{
        id:uuid(),
        name:'propuesta_1.png',
        // File
        url: '/assets/img/feedback/examples/piece_1_v2.jpg',
        // setting
        setting:<Settings>{},
        created: new Date(),
        modified: new Date()
      },
      <ProposalFile>{
        id:uuid(),
        name:'propuesta_2.png',
        // File
        url: '/assets/img/feedback/examples/piece_1.jpg',
        // setting
        setting:<Settings>{},
        created: new Date(),
        modified: new Date()
      }
   
  
    ],
    createdBy:GUESTS[3],
    created:new Date(),
    modified:new Date()
  })
]