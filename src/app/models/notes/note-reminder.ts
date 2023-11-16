export class NoteReminder {
    public id:string;
    public date:Date;
    public hour:string;
    public notificationValue:number = 30;
    public notificationType:string = 'minutes';

    getHourDate(){
        let hourSplit = this.hour.split(":");
        return new Date().setHours(parseInt(hourSplit[0]),parseInt(hourSplit[1]),0,0)
    }
}
