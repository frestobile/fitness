// import { PackageState } from "./ipackage";

export const Constants = {
    TOKEN_KEY: 'auth-token',
    KEY_DEFAULT_LANGUAGE: 'fitness_l',
    KEY_LOGIN_PARTNER: 'partner_login',
    LAST_UPDATED_DATE: 'last_updated',
    REFRESHTOKEN_KEY: 'auth-refreshtoken',
    USER_KEY: 'auth-user',
    USER_DATA: 'user-data',
    STORED_EXERCISE: 'exos-data',
    PREFIX_BASE64: 'data:image/jpg;base64,',
    CURRENT_USER: 'current-user',
    HOSTING: 'server',
    USER_LOGIN: 'login-user',
    CURRENT_CREDENTIALS: 'current-credentials',
    DATE_FORMAT: 'dd-MM-YYYY HH:mm:ss',
    ODOO_CONF: "conf_fitness",
    KEY_SERVICE_PENDING: "SERVICE_PENDING",
    SETTINGS: "settings_costs"
}

export const Serveur = {
    active: true,
    application: "Fitness App",
    customer: "One Square",
    database: "dev",
    logo: "assets/imgs/logo.png",
    login: "user.api",
    passswd: "demo",
    port: "",
    url: "http://localhost:8000",
}

export const Parameters: any = {
    annual_cost_subscription: 120,
    cost_daily_pub: 5,
    currency_id: {id: 21, name: 'AUD'},
    display_name: "Settings",
    id: 21,
    journal_id: {id: 16, name: 'Banque'},
    monthly_cost_subscription: 25
}

export const Credentials = {
    email: '', password: ''
}

export class DAK {

    static getGenders(txtLang?: any) {

        return [
            { id: "male", name: "Homme", icon: "assets/icon/man.png", icon_s: "assets/icon/man_selected.png", bg: "assets/icon/bg", checked: false },
            { id: "female", name: "Femme", icon: "assets/icon/woman.png", icon_s: "assets/icon/woman_selected.png", bg: "assets/icon/bg", checked: false },
            { id: "other", name: "Autre", icon: "assets/icon/other.png", icon_s: "assets/icon/other_selected.png", bg: "assets/icon/bg", checked: false },
        ];
    }

    static getDay(txtLang?: any) {

        return [
            { id: 1, name: "Dim", fr_name: "Dimanche", en_name: "Sunday", bg: "assets/icon/circle", checked: false },
            { id: 2, name: "Lun", fr_name: "Lundi", en_name: "Monday", bg: "assets/icon/circle", checked: false },
            { id: 3, name: "Mar", fr_name: "Mardi", en_name: "Tuesday", bg: "assets/icon/circle", checked: false },
            { id: 4, name: "Mer", fr_name: "Mercredi", en_name: "Wednesday", bg: "assets/icon/circle", checked: false },
            { id: 5, name: "Jeu", fr_name: "Jeudi", en_name: "Thursday", bg: "assets/icon/circle", checked: false },
            { id: 6, name: "Ven", fr_name: "Vendredi", en_name: "Friday ", bg: "assets/icon/circle", checked: false },
            { id: 7, name: "Sam", fr_name: "Samedi", en_name: "Saturday", bg: "assets/icon/circle", checked: false },
        ];
    }


    static getCity(txtLang?: any) {

        return [
            { id: 1, name: "Douala"},
            { id: 2, name: "Yaoundé"},
            { id: 3, name: "Paris"},
            { id: 4, name: "Marseille"},
            { id: 5, name: "Lille"},
            { id: 6, name: "Bafoussam"},
            { id: 7, name: "Limbe"},
            { id: 8, name: "Kribi"},
            { id: 9, name: "Buea"},
            { id: 10, name: "Barcelone"},
            { id: 11, name: "Bordeaux"},
            { id: 12, name: "Strasbourd"},
            { id: 13, name: "Bouda"},
            { id: 14, name: "Badjoun"},
        ];
    }
    static getUserTypes(txtLang?: any) {

        return [
            { id: "client", name: "Particulier", checked: false, active: true },
            { id: "coach", name: "Coach", checked: false, active: true }
        ];
    }

    static getUserLevels(txtLang?: any) {

        return [
            { id: "beginner", name: "Débutant", checked: false, color: "vert-soft", decalage: 10 },
            { id: "intermediate", name: "Intermédiaire", checked: false, color: "orange", decalage: 20 },
            { id: "sporty", name: "Sportif", checked: false, color: "rouge", decalage: 30 }
        ];
    }

    static getRegimeOrNot(txtLang?: any) {

        return [
            { id: "yes", name: "Oui", checked: false, color: "vert-soft", decalage: 10 },
            { id: "no", name: "Non", checked: false, color: "orange", decalage: 20 },
        ];
    }


    static getProgramOptions(txtLang?: any) {
        return [
            // { id: "show-programmes", name: "Programmes sur mesure", usage: 'importation-de-fichiers.svg', active: true },
            // { id: "create-programme", name: "Nouvelle séance", usage: 'importation-de-fichiers.svg', active: true },
            // { id: "summary-execice", name: "Récapitulatif des exercices", usage: 'construction-de-maison.svg', active: true },
            { id: "log-book", name: "Log Book", usage: 'fichier-fermeture-eclair.svg', active: true },
            //{ id: "exos-cible", name: "Exercices ciblés", usage: 'exclamation-de-fichier.svg', active: false },
            { id: "import-health-data", name: "Importer de mon phone", usage: 'verification-de-lutilisateur.svg', active: false },
        ];
    }

    //Options for coach
    static getProgramCoachOptions(txtLang?: any){
        return [
            { id: "coaching-programmes", name: "Demandes de coaching", usage: 'importation-de-fichiers.svg', active: true },
            { id: "create-programme", name: "Nouvelle séance", usage: 'importation-de-fichiers.svg', active: true },
            //{ id: "exos-cible", name: "Exercices ciblés", usage: 'exclamation-de-fichier.svg' },
            //{ id: "log-book", name: "Log Book", usage: 'fichier-fermeture-eclair.svg', active: true },
            //{ id: "summary-execice", name: "Récapitulatif des exos", usage: 'construction-de-maison.svg' },
            //{ id: "import-health-data", name: "Importer de mon phone", usage: 'verification-de-lutilisateur.svg' },
        ];
    }

    static listOfColors(): string[]{
        return ['green-soft', 'blue-medium', 'blue-sky', 'yellow-soft', 'vert-soft'];
    }

    static getSportType(txtLang?: any) {
        return [
            { id: "musculation", name: "Musculation", usage: 'green-soft',
              histories: [
                    {
                        date: "2023-09-12",
                        data: [
                            { id:"musculation", name: "Nombre de séries", value: 5 },
                            { id:"repetition", name: "Les répétitions", value: 2 },
                            { id:"poids", name: "Poids", value: 70 },
                            { id:"timer", name: "Temps de repos", value: 5 },
                        ]
                    },
                    {
                        date: "2023-09-15",
                        data: [
                            { id:"musculation", name: "Nombre de séries", value: 5 },
                            { id:"repetition", name: "Les répétitions", value: 2 },
                            { id:"poids", name: "Poids", value: 70, unit: "Kg" },
                            { id:"timer", name: "Temps de repos", value: 5, unit: "min" },
                        ]
                    },
                ]
            },
            { id: "running", name: "Running", usage: 'blue-medium',
                histories: [
                    {
                        date: "2023-09-12",
                        data: [
                            { id:"timer", name: "Temps moyen", value: 5, unit: "min" },
                            { id:"distance", name: "Distance", value: 2, unit: "Km" },
                            { id:"allure", name: "Allure", value: 0, unit: "Km/h" },
                            { id:"calories", name: "Calories", value: 5, unit: "Kcal" },
                        ]
                    },
                    {
                        date: "2023-09-15",
                        data: [
                            { id:"timer", name: "Temps moyen", value: 5, unit: "min" },
                            { id:"distance", name: "Distance", value: 2, unit: "Km" },
                            { id:"allure", name: "Allure", value: 0, unit: "Km/h" },
                            { id:"calories", name: "Calories", value: 5, unit: "Kcal" },
                        ]
                    },
                ]
            },
            { id: "cycling", name: "Cycling", usage: 'blue-sky',
                histories: [
                    {
                        date: "2023-09-12",
                        data: [
                            { id:"timer", name: "Temps moyen", value: 5, unit: "min" },
                            { id:"distance", name: "Distance", value: 2, unit: "Km" },
                            { id:"allure", name: "Allure", value: 0, unit: "Km/h" },
                            { id:"calories", name: "Calories", value: 5, unit: "Kcal" },
                        ]
                    },
                    {
                        date: "2023-09-15",
                        data: [
                            { id:"timer", name: "Temps moyen", value: 5, unit: "min" },
                            { id:"distance", name: "Distance", value: 2, unit: "Km" },
                            { id:"allure", name: "Allure", value: 0, unit: "Km/h" },
                            { id:"calories", name: "Calories", value: 5, unit: "Kcal" },
                        ]
                    },
                ]
            },
            { id: "swimming", name: "Swimming", usage: 'yellow-soft',
                histories: [
                    {
                        date: "2023-09-12",
                        data: [
                            { id:"timer", name: "Temps moyen", value: 5, unit: "min" },
                            { id:"distance", name: "Distance", value: 2, unit: "Km" },
                            { id:"allure", name: "Allure", value: 0, unit: "Km/h" },
                            { id:"calories", name: "Calories", value: 5, unit: "Kcal" },
                        ]
                    },
                    {
                        date: "2023-09-15",
                        data: [
                            { id:"timer", name: "Temps moyen", value: 5, unit: "min" },
                            { id:"distance", name: "Distance", value: 2, unit: "Km" },
                            { id:"allure", name: "Allure", value: 0, unit: "Km/h" },
                            { id:"calories", name: "Calories", value: 5, unit: "Kcal" },
                        ]
                    },
                ]
            },
            { id: "calisthenic", name: "Calisthenic", usage: 'vert-soft',
                histories: [
                    {
                        date: "2023-09-12",
                        data: [
                            { id:"musculation", name: "Nombre de séries", value: 5 },
                            { id:"repetition", name: "Les répétitions", value: 2 },
                            { id:"timer", name: "Temps de repos", value: 5 },
                        ]
                    },
                    {
                        date: "2023-09-15",
                        data: [
                            { id:"musculation", name: "Nombre de séries", value: 5 },
                            { id:"repetition", name: "Les répétitions", value: 2 },
                            { id:"timer", name: "Temps de repos", value: 5, unit: "min" },
                        ]
                    },
                ]
            },
        ];
    }

    static getStatus(txtLang?: any) {
        return [
            { id: "pending", name: "Non commencé", usage: 'danger' },
            { id: "progress", name: "En cours", usage: 'warning' },
            { id: "finished", name: "Terminé", usage: 'vert' },
            { id: "cancel", name: "Annulé", usage: 'violet' },
        ];
    }


}
