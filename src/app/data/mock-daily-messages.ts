import { DailyMessage } from "../models/daily-message/daily-message";
import * as uuid from 'uuid/v4';
// Dashboard
export const DAILY_MESSAGES_DASHBOARD = [
    <DailyMessage>{
        id:uuid(),
        message:`Aprobación pendiente  “Nespresso”`,
        active:true
    },
    <DailyMessage>{
        id:uuid(),
        message:`5 mensajes nuevos sin leer.`,
        active:false
    },
    <DailyMessage>{
        id:uuid(),
        message:`15 comentarios de proyectos.`,
        active:false
    },
    <DailyMessage>{
        id:uuid(),
        message:`Te han invitado a una nueva marca y proyecto.`,
        active:false
    }
]

// Pitch
export const DAILY_MESSAGES_PITCH = [
    <DailyMessage>{
        id:uuid(),
        message:`Aprobación pendiente  “Nespresso”`,
        active:false
    },
    <DailyMessage>{
        id:uuid(),
        message:`5 mensajes nuevos sin leer.`,
        active:false
    },
    <DailyMessage>{
        id:uuid(),
        message:`15 comentarios de proyectos.`,
        active:false
    },
    <DailyMessage>{
        id:uuid(),
        message:`Te han invitado a una nueva marca y proyecto.`,
        active:false
    },
    <DailyMessage>{
        id:uuid(),
        message:`Eres prefinalista en una propuesta de brief`,
        active:true
    }
];

// Pitch
export const DAILY_MESSAGES_PITCH_FINALIST = [
    <DailyMessage>{
        id:uuid(),
        message:`Aprobación pendiente  “Nespresso”`,
        active:false
    },
    <DailyMessage>{
        id:uuid(),
        message:`5 mensajes nuevos sin leer.`,
        active:false
    },
    <DailyMessage>{
        id:uuid(),
        message:`15 comentarios de proyectos.`,
        active:false
    },
    <DailyMessage>{
        id:uuid(),
        message:`Te han invitado a una nueva marca y proyecto.`,
        active:false
    },
    <DailyMessage>{
        id:uuid(),
        message:`Felicidades eres el ganador de un pitch`,
        active:true
    }
];
export const DAILY_MESSAGES_PITCH_DISCARDED= [
    <DailyMessage>{
        id:uuid(),
        message:`Aprobación pendiente  “Nespresso”`,
        active:false
    },
    <DailyMessage>{
        id:uuid(),
        message:`5 mensajes nuevos sin leer.`,
        active:false
    },
    <DailyMessage>{
        id:uuid(),
        message:`15 comentarios de proyectos.`,
        active:false
    },
    <DailyMessage>{
        id:uuid(),
        message:`Te han invitado a una nueva marca y proyecto.`,
        active:false
    },
    <DailyMessage>{
        id:uuid(),
        message:`Tu propuesta para brief no fue seleccionada.`,
        active:false
    }
];


