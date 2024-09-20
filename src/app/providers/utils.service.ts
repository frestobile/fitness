import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

    //Return the current date and time
    getDateNow(): string{
      return moment().format('YYYY-MM-DD HH:mm');
    }

    //Return the current date
    getOnlyDateNow(): string{
      return moment().format('YYYY-MM-DD');
    }
  
    //Return date according to a specific weeks
    getDeadline(days: number): string{
      return moment().add(days, 'days').format('YYYY-MM-DD');
    }

    //Return number of days
    computeDaysBetweenTwoDates(date1: string, date2: string){
      let obj_date1 = moment(date1);
      let obj_date2 = moment(date2);

      return obj_date1.diff(obj_date2, 'days');
    }

	//This method is used to convert to days, weeks or month
	convertToDaysWeekMonth(days: number): string{
		if(days<=7){
			return days + " jour(s)";
		}else if(days>7 && days<=30){
			return Math.floor(days/7) + " semaine(s)";
		}else{
			return Math.floor(days/30)  + " mois";
		}
	}

    /**
	 * This method is used to convert decimal to 
	 * time
	 * 
	 * @param minutes number, time in decimal
	 * @returns string
	 */
	decToTime(minutes: number): string{
		var sign = minutes < 0 ? "-" : "";
		var min = Math.floor(Math.abs(minutes));
		var sec = Math.floor((Math.abs(minutes) * 60) % 60);
		return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
	}

	//This method is used to convert time to decimal
	timeToDecimal(t: string) : number {
		const [h, m] = t.split(':');
		return parseFloat((+h + (+m/60)).toFixed(2));
	}

	/**
	 * This method is used to check if is 
	 * the current week
	 * @param selected_date string, selected date
	 * 
	 * @returns boolean
	 */
	isCurrentWeek(selected_date: string): boolean {
		
		let currentDate = moment();
		let weekStart = currentDate.clone().startOf('isoWeek');
		let current_day = moment(selected_date).format("YYYY-MM-DD");
	  
		for (var i = 0; i <= 6; i++) {
		  let dayWeek = moment(weekStart).add(i, 'days').format("YYYY-MM-DD");
		  if(current_day==dayWeek)
			return true;
		}

		return false;
	}

  	/**
	 * This method is used to check if is 
	 * the current month
	 * @param selected_date string, selected date
	 * 
	 * @returns boolean
	 */
	isCurrentMonth(selected_date: string): boolean {
		
		let currentDate = moment().format("YYYY-MM");
		// let weekStart = currentDate.clone().startOf('isoWeek');
		let current_day = moment(selected_date).format("YYYY-MM");
		return current_day == currentDate;
	}

	/**
	 * This method is used to check if is 
	 * the current year
	 * @param selected_date string, selected date
	 * 
	 * @returns boolean
	 */
	isCurrentYear(selected_date: string): boolean {
		
		let currentDate = moment().format("YYYY");
		// let weekStart = currentDate.clone().startOf('isoWeek');
		let current_day = moment(selected_date).format("YYYY");
		
		return current_day == currentDate;
	}
  
}
