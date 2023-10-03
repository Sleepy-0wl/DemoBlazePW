export class Generators {

    usernameGenerator(length: number){
        let username = Math.random().toString(36).slice(2, 2+length);
        return username;
    }                                                 //iako oba generatora rade istu stvar, mislim da ih nije loše imati odvojeno za moguće buduće preinake
    passwordGenerator(length: number){
        let password = Math.random().toString(36).slice(2, 2+length);
        return password;
    }
}