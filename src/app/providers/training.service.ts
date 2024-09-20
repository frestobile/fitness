import { Injectable } from '@angular/core';
// import { OdooService } from './odoo.service.ts';
import { DataService } from './data.service';
import { ApiService } from './api.service';
import { Single } from 'src/models/single';
import * as moment from 'moment';
import { TrainingPub } from 'src/models/pub';
import { Souscription } from 'src/models/souscription';
import { Settings } from 'src/models/settings-models';
import { SubPayment } from 'src/models/sub-payment';
import { PubPayment } from 'src/models/pub-payment';
import { Journal } from 'src/models/journal';
import { Session } from 'src/models/session';
import { TrainingOrder } from 'src/models/training-order';
import { BodySport } from 'src/models/body-sport';
import { BodyExercise } from 'src/models/body-exercise';
import { SessionPost } from 'src/models/session-post';
import { Exercise } from 'src/models/exercise';
import { BehaviorSubject } from 'rxjs';
import { SessionSchedule } from 'src/models/session-schedule';
import { SessionScheduleLine } from 'src/models/session-schedule-line';
import { ExerciseSchedule } from 'src/models/exercise-schedule';
import { ProgramScheduleLine } from 'src/models/program-schedule-line';
import { ProgramSchedule } from 'src/models/program-schedule';
import { Program } from 'src/models/program';

@Injectable({
  providedIn: 'root'
})

export class TrainingService {

  private readonly TRAINING_: string = 'training';
  private readonly PUB_: string = 'program_pub';
  private readonly SPORT_TYPE_: string = 'sport-type';
  private readonly SUB_: string = 'souscription';
  private readonly CONFIG_: string = 'configs';
  private readonly SUB_PAYMENT: string = 'sub-payment';
  private readonly PUB_PAYMENT: string = 'pub-payment';
  private readonly JOURNAL_PAYMENT: string = 'payment_journal';
  private readonly JOURNAL_METHOD: string = 'payment_method';
  private readonly BOOT_CAMP: string = 'bootcamp';
  private readonly ORDER_: string = 'training-order';
  private readonly BODY_: string = 'body-sport';
  private readonly BODY_EXO_: string = 'body-exercise';
  private readonly POST_: string = 'session-post';
  private readonly EXERCISE_: string = 'session-exercise';

  private obj_training$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    // private odooServ: OdooService,
    private dataServ: DataService,
    private apiServ: ApiService
  ) { }

  //This method is used to publish objet
  publishData(objet: any){
    this.obj_training$.next(objet);
  }

  //This method is used to get observable data
  getObservableData(){
    return this.obj_training$.asObservable();
  }

  /**
   * This method is used to get Subscription
   * @param filter any, filter to apply on request
   *
   * @returns Promise<Souscription[]>
   */
  getOnlineSubs(filter: any = null): Promise<Souscription[]>{

    return new Promise(async (resolve, reject)=>{

      // this.odooServ.requestObjectToOdoo(this.SUB_, filter).then((rep:any)=>{
      //   let results: Souscription[] = [];
      //   rep.forEach((elt: any) => results.push(new Souscription(elt)));
      //   resolve(results);

      // }).catch(err=>{
      //   reject(err);
      // });

    });
  }

  /**
   * This method is used to get settings models for package
   *
   * @param filter any, filter to apply on request
   *
   * @returns Promise<Settings[]>
   */
  getOnlineSettings(filter: any = null): Promise<Settings[]>{

    return new Promise(async (resolve, reject)=>{

      // this.odooServ.requestObjectToOdoo(this.CONFIG_, filter).then((rep:any)=>{
      //   let results: Settings[] = [];
      //   rep.forEach((elt: any) => results.push(new Settings(elt)));
      //   resolve(results);

      // }).catch(err=>{
      //   reject(err);
      // });

    });
  }

  /**
   * This method is used to get transactions
   *
   * @param type string, type of payment (sub | pub)
   * @param filter any, filter to apply on request
   *
   * @returns Promise<PubPayment[] | SubPayment[]>
   */
  getOnlinePayments(type: string, filter: any = null): Promise<SubPayment[] | PubPayment[]>{

    return new Promise(async (resolve, reject)=>{

      const table: string = type == "sub" ? this.SUB_PAYMENT : this.PUB_PAYMENT;
      // this.odooServ.requestObjectToOdoo(table, filter).then((rep:any)=>{
      //   let results: SubPayment[] | PubPayment[] = [];
      //   rep.forEach((elt: any) => {
      //     const objet = type == "sub" ? new SubPayment(elt) : new PubPayment(elt);
      //     results.push(objet);
      //   });
      //   resolve(results);

      // }).catch(err=>{
      //   reject(err);
      // });

    });
  }

  /**
   * This method is used to get training advert published by coach
   * @param filter any, filter to apply on request
   *
   * @returns Promise<TrainingPub[]>
   */
  getOnlineLListOfPub(filter: any = null): Promise<TrainingPub[]>{

    return new Promise(async (resolve, reject)=>{

      //const _res =  await this.dataServ.getItem('_ona_' + this.CONTRAVENTION + '_date');
      // this.odooServ.requestObjectToOdoo(this.PUB_, filter).then((rep:any)=>{
      //   let results: TrainingPub[] = [];
      //   rep.forEach((elt: any) => results.push(new TrainingPub(elt)));
      //   resolve(results);

      // }).catch(err=>{
      //   reject(err);
      // });

    });
  }

  /**
   * This method is used to get data according to the
   * model
   * @param name string, Can be ("session-stage", "sport-type", "training-tags")
   * @param filter any, filter to apply on request (By default null)
   *
   * @returns Promise<Single[]>
   */
  getOnlineTrainingData(name: string, filter: any = null): Promise<Single[]>{

    return new Promise(async (resolve, reject)=>{

      //const _res =  await this.dataServ.getItem('_ona_' + this.CONTRAVENTION + '_date');
      // this.odooServ.requestObjectToOdoo(name, filter).then((rep:any)=>{
      //   let results: Single[] = [];
      //   rep.forEach((elt: any) => results.push(new Single(elt)));
      //   resolve(results);

      // }).catch(err=>{
      //   reject(err);
      // });

    });
  }


  //Store List of data models
  storeTrainingData(name: string, data: Single[], options?: string){
    this.dataServ.mergeData('_ona_'+name, data, options);
    this.dataServ.setItem('_ona_' + name + '_date', moment().format('YYYY-MM-DD HH:mm'));
  }

  /**
   * This method is used to retrieve list of data
   * @param name string, model's name ("session-stage", "sport-type", "training-tags")
   * @returns Promise<Single[]>
   */
  getListTriggerings(name: string): Promise<Single[]>{
    return this.dataServ.getItem('_ona_'+name);
  }

  /**
   * This method is used to get journal list
   * @param filter any, filter to apply on request
   *
   * @returns Promise<Journal[]>
   */
  getOnlineJournals(filter: any = null): Promise<Journal[]>{

    return new Promise(async (resolve, reject)=>{

      //const _res =  await this.dataServ.getItem('_ona_' + this.CONTRAVENTION + '_date');
      // this.odooServ.requestObjectToOdoo(this.JOURNAL_PAYMENT, filter).then((rep:any)=>{
      //   let results: Journal[] = [];
      //   rep.forEach((elt: any) => results.push(new Journal(elt)));

      //   this.dataServ.setItem("_ona_"+this.JOURNAL_PAYMENT, results);
      //   resolve(results);

      // }).catch(err=>{
      //   reject(err);
      // });

    });
  }

  /**
   * This method is used to get payment methods list
   * @param filter any, filter to apply on request
   *
   * @returns Promise<Single[]>
   */
  getOnlineMethods(filter: any = null): Promise<Single[]>{

    return new Promise(async (resolve, reject)=>{

      //const _res =  await this.dataServ.getItem('_ona_' + this.CONTRAVENTION + '_date');
      // this.odooServ.requestObjectToOdoo(this.JOURNAL_METHOD, filter).then((rep:any)=>{
      //   let results: Single[] = [];
      //   rep.forEach((elt: any) => results.push(new Single(elt)));

      //   this.dataServ.setItem("_ona_"+this.JOURNAL_METHOD, results);
      //   resolve(results);

      // }).catch(err=>{
      //   reject(err);
      // });

    });
  }

  /**
   * This method is used to get sessions list
   * @param filter any, filter to apply on request
   *
   * @returns Promise<Bootcamp[]>
   */
  getOnlineSessions(filter: any = null): Promise<Session[]>{

    return new Promise(async (resolve, reject)=>{

      //const _res =  await this.dataServ.getItem('_ona_' + this.CONTRAVENTION + '_date');
      // this.odooServ.requestObjectToOdoo(this.BOOT_CAMP, filter).then((rep:any)=>{
      //   let results: Session[] = [];
      //   rep.forEach((elt: any) => results.push(new Session(elt)));

      //   this.dataServ.setItem("_ona_"+this.BOOT_CAMP, results);
      //   resolve(results);

      // }).catch(err=>{
      //   reject(err);
      // });

    });
  }

  /**
   * This method is used to get training order list bought by client
   * @param filter any, filter to apply on request
   *
   * @returns Promise<TrainingOrder[]>
   */
  getOnlineTrainingOrders(filter: any = null): Promise<TrainingOrder[]>{

    return new Promise(async (resolve, reject)=>{

      // this.odooServ.requestObjectToOdoo(this.ORDER_, filter).then((rep:any)=>{
      //   let results: TrainingOrder[] = [];
      //   rep.forEach((elt: any) => results.push(new TrainingOrder(elt)));

      //   //this.dataServ.setItem("_ona_"+this.ORDER_, results);
      //   resolve(results);

      // }).catch(err=>{
      //   reject(err);
      // });

    });
  }

  async getTrainingSessionSchedules(user_id: any): Promise<SessionScheduleLine[]> {
    const session_schedule_lines: SessionScheduleLine[] = [];
    const url = 'training/session/schedules/'+user_id;
    try {
      const res: any = await this.apiServ.get_private(url);
      if(res && res.data) {
        res.data.map((item: any)=>{
          const new_schedule = new SessionSchedule(item);
          item.session.schedules = this.getExerciseSchedules(item.session.schedules);
          const new_session = new Session(item.session);
          const new_session_schedule_line = new SessionScheduleLine({session_schedule: new_schedule, session: new_session});
          session_schedule_lines.push(new_session_schedule_line);
        });
        return session_schedule_lines;
      }
    } catch (error) {

    }
    return session_schedule_lines;
  }

  async getSessionScheduleDetail(schedule_id: any) : Promise<SessionSchedule> {
    return new Promise(async (resolve, reject)=>{
      const url = 'training/session/schedule-detail/' + schedule_id;
      this.apiServ.get_private(url).then((rep:any)=>{
        const session_schedule_data = rep.data;
        const newSessionSchedule = new SessionSchedule(session_schedule_data);
        resolve(newSessionSchedule);
      }).catch(err=>{
        reject(err);
      });

    });
  }

  async updateSessionScheduleStatus(data: any) : Promise<any> {
    return new Promise(async(resolve, reject)=>{
      const url = 'training/session/update-schedule-status';
      this.apiServ.post_private(url, data).then((res: any)=> {
        resolve(res.data);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  async getTrainingProgramSchedules(user_id: any): Promise<ProgramScheduleLine[]> {
    const program_schedule_lines: ProgramScheduleLine[] = [];
    const url = 'training/program/schedules/'+user_id;
    try {
      const res: any = await this.apiServ.get_private(url);
      if(res && res.data) {
        res.data.map((item: any)=>{
          const new_schedule = new ProgramSchedule(item);
          item.program.schedules = this.getExerciseSchedules(item.program.schedules);
          const new_program = new Program(item.program);
          const new_program_schedule_line = new ProgramScheduleLine({program_schedule: new_schedule, program: new_program});
          program_schedule_lines.push(new_program_schedule_line);
        });
        return program_schedule_lines;
      }
    } catch (error) {

    }
    return program_schedule_lines;
  }

  async getProgramScheduleDetail(schedule_id: any) : Promise<ProgramSchedule> {
    return new Promise(async (resolve, reject)=>{
      const url = 'training/program/schedule-detail/' + schedule_id;
      this.apiServ.get_private(url).then((rep:any)=>{
        const program_schedule_data = rep.data;
        const newProgramSchedule = new ProgramSchedule(program_schedule_data);
        resolve(newProgramSchedule);
      }).catch(err=>{
        reject(err);
      });

    });
  }

  async updateProgramScheduleStatus(data: any) : Promise<any> {
    return new Promise(async(resolve, reject)=>{
      const url = 'training/program/update-schedule-status';
      this.apiServ.post_private(url, data).then((res: any)=> {
        resolve(res.data);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  getExerciseSchedules(schedules_str: any) {
    const schedules_array = JSON.parse(schedules_str);
    let exerciseSchedules: ExerciseSchedule[] = [];
    if(schedules_array.length > 0) {
      schedules_array.map((scheduleData: any)=>{
        const new_schedule = new ExerciseSchedule(scheduleData);
        exerciseSchedules.push(new_schedule);
      });
    }
    return exerciseSchedules;
  }


  /**
   * This method is used to get Body Sport lines
   * @param filter any, filter to apply on request
   *
   * @returns Promise<BodySport[]>
   */
  getOnlineBodies(filter: any = null): Promise<BodySport[]>{

    return new Promise(async (resolve, reject)=>{

      // this.odooServ.requestObjectToOdoo(this.BODY_, filter).then((rep:any)=>{
      //   let results: BodySport[] = [];
      //   rep.forEach((elt: any) => results.push(new BodySport(elt)));

      //   resolve(results);

      // }).catch(err=>{
      //   reject(err);
      // });
    });
  }

  /**
   * This method is used to get Body Sport exercise lines
   * @param filter any, filter to apply on request
   *
   * @returns Promise<BodyExercise[]>
   */
  getOnlineBodyExercises(filter: any = null): Promise<BodyExercise[]>{

    return new Promise(async (resolve, reject)=>{

      // this.odooServ.requestObjectToOdoo(this.BODY_EXO_, filter).then((rep:any)=>{
      //   let results: BodyExercise[] = [];
      //   rep.forEach((elt: any) => results.push(new BodyExercise(elt)));

      //   resolve(results);

      // }).catch(err=>{
      //   reject(err);
      // });
    });
  }

  /**
   * This method is used to get post's session lines
   * @param filter any, filter to apply on request
   *
   * @returns Promise<SessionPost[]>
   */
  getOnlineSessionPosts(filter: any = null): Promise<SessionPost[]>{

    return new Promise(async (resolve, reject)=>{

      // this.odooServ.requestObjectToOdoo(this.POST_, filter).then((rep:any)=>{
      //   let results: SessionPost[] = [];
      //   rep.forEach((elt: any) => results.push(new SessionPost(elt)));
      //   resolve(results);

      // }).catch(err=>{
      //   reject(err);
      // });
    });
  }

  /**
   * This method is used to get exercise's session lines
   * @param filter any, filter to apply on request
   *
   * @returns Promise<SessionExerciseLine[]>
   */
  getOnlineSessionExercises(filter: any = null): Promise<SessionSchedule[]>{

    return new Promise(async (resolve, reject)=>{

      // this.odooServ.requestObjectToOdoo(this.EXERCISE_, filter).then((rep:any)=>{
      //   let results: SessionExerciseLine[] = [];
      //   rep.forEach((elt: any) => results.push(new SessionExerciseLine(elt)));
      //   resolve(results);

      // }).catch(err=>{
      //   reject(err);
      // });
    });
  }

  getSportslist(): Promise<Single[]> {
    return new Promise(async (resolve, reject)=>{
      const url = 'sports-list';
      this.apiServ.get_private(url).then((res:any)=>{
        let list: Single[] | PromiseLike<Single[]> = [];
        if(res.data.length > 0) {
          for(let i = 0; i < res.data.length; i++)
          {
            const new_sports = new Single(res.data[i]);
            list.push(new_sports);
          }
        }
        resolve(list);
      }).catch(err=>{
        reject(err);
      });
    })
  }

  getExercises(): Promise<Exercise[]>{
    return new Promise(async (resolve, reject)=>{
      const url = 'exercise-list';
      this.apiServ.get_private(url).then((res:any)=>{
        let list: Exercise[] | PromiseLike<Exercise[]> = [];
        if(res.data.length > 0) {
          for(let i = 0; i < res.data.length; i++)
          {
            const new_exercise = new Exercise(res.data[i]);
            list.push(new_exercise);
          }
        }
        resolve(list);
      }).catch(err=>{
        reject(err);
      });
    })
  }

  async getExerciseDetail(id: Number): Promise<Exercise | null> {
    const url = 'exercise-detail?id='+id;
    try {
      const res = await this.apiServ.get_private(url);
      if(res.data) {
        let body_parts: any[] = [];
        const body_parts_data = res.data.bodypart_name;
        if(body_parts_data.length > 0) {
          body_parts_data.map((part: any)=>{
            body_parts.push(part.title);
          });
        }
        let exec = new Exercise(res.data);
        exec.bodyparts = body_parts;
        return exec;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  createSession(sessionData: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const url = 'session/store';
      this.apiServ.post_private(url, sessionData).then((res:any)=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  updateSession(sessionData: any, session_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const url = 'session/update/' + session_id;
      this.apiServ.post_private(url, sessionData).then((res: any)=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  getCoachSessions(coach_id: any = null): Promise<any>{
    return new Promise(async (resolve, reject)=>{
      const url = "session/coach-sessions?coach_id=" + coach_id;
      this.apiServ.get_private(url).then((res: any)=>{
        resolve(res.data);
      }).catch(err=>{
        reject(err);
      })

    });
  }

  getClientSessions(client_id: any) : Promise<any> {
    return new Promise(async (resolve, reject)=>{
      const url = "session/client-sessions?client_id="+client_id;
      this.apiServ.get_private(url).then((res: any)=>{
        resolve(res.data);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  async getSessionDetail(session_id: any = null): Promise<any> {
    const url = "session/detail/" + session_id;
    try {
      const res = await this.apiServ.get_private(url);
      return res.data;
    } catch (error) {
      console.log("error: ", error);
    }
  }

  getMySessionDetail(session_id: any = null): Promise<any> {
    return new Promise(async (resolve, reject)=>{
      const url = "session/my-session-detail/" + session_id;
      this.apiServ.get_private(url).then((res: any)=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  async checkSessionPurchased(user_id: any, session_id: any = null): Promise<any> {
    const url = "session/purchased/" + session_id + "?user_id="+user_id;
    try {
      const res = await this.apiServ.get_private(url);
      return res.data;
    } catch (error) {
      console.log("error: ", error);
    }
  }

  getCoachPrograms(coach_id: any = null): Promise<any>{
    return new Promise(async (resolve, reject)=>{
      const url = "program/coach-programs?coach_id=" + coach_id;
      this.apiServ.get_private(url).then((res: any)=>{
        resolve(res.data);
      }).catch(err=>{
        reject(err);
      })

    });
  }

  getClientPrograms(client_id: any) : Promise<any> {
    return new Promise(async (resolve, reject)=>{
      const url = "program/client-programs?client_id="+client_id;
      this.apiServ.get_private(url).then((res: any)=>{
        resolve(res.data);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  createProgram(programData: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const url = 'program/store';
      this.apiServ.post_private(url, programData).then((res:any)=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  updateProgram(programData: any, program_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const url = 'program/update/' + program_id;
      this.apiServ.post_private(url, programData).then((res: any)=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  getProgramDetail(program_id: any = null): Promise<any> {
    return new Promise(async (resolve, reject)=>{
      const url = "program/detail/" + program_id;
      this.apiServ.get_private(url).then((res: any)=>{
        resolve(res.data);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  getMyProgramDetail(program_id: any = null): Promise<any> {
    return new Promise(async (resolve, reject)=>{
      const url = "program/my-program-detail/" + program_id;
      this.apiServ.get_private(url).then((res: any)=>{
        resolve(res);
      }).catch(err=>{
        reject(err);
      })
    })
  }

  async checkProgramPurchased(user_id: any, program_id: any = null): Promise<any> {
    const url = "program/purchased/" + program_id + "?user_id="+user_id;
    try {
      const res = await this.apiServ.get_private(url);
      return res.data;
    } catch (error) {
      console.log("error: ", error);
    }
  }

  getProgramSchedules(program_id: any = null) : Promise<any> {
    return new Promise(async(resolve, reject) => {
      const url = "program/program-schedules/" + program_id;
      this.apiServ.get_private(url).then((res: any) => {
        resolve(res.data);
      }).catch(err=> {
        reject(err);
      })
    })
  }
}
