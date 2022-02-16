export default class Logger {
    constructor() {  }

    get currentDateTime(): string {
        let date = new Date();
        return `${ date.getDay() < 10 ? '0' : '' }${date.getDay()}/${ date.getMonth() < 10 ? '0' : '' }${date.getMonth()}/${date.getFullYear()} ${ date.getHours() < 10 ? '0' : '' }${date.getHours()}:${ date.getMinutes() < 10 ? '0' : '' }${date.getMinutes()}:${ date.getSeconds() < 10 ? '0' : '' }${date.getSeconds()}`;
    }

    log(type: string, message: string, error?: Error): void {
        console.log(this.currentDateTime + ` (${type}) ${message}`)
        if (error) {
            console.log(this.currentDateTime + ` (${type}) ${error.stack}`);
        }
    }
}