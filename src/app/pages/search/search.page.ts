import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DAK } from 'src/models/contants.models';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  
  items: any[] = [];
  genders: { id: string; name: string; icon: string; icon_s: string; bg: string; checked: boolean; }[] = [];
  cities: { id: number; name: string; }[] = [];
  form: FormGroup = new FormGroup({
    selected :new FormControl(null)
  });

  constructor(
    private router: Router,
  ) { }



  ngOnInit() {
    this.initializeView();
  }

  async inputChange(event: any): Promise<void> {
    this.cities = DAK.getCity();
    const value = event.target.value;
    if(value.length<=0){
      this.items=[];
      return ;
    }
    const items = this.cities.filter(item=>item.name.toLowerCase().includes(value.toLowerCase()));
    this.items = items;
  }

  selected(item:any, input:any ):void {
    console.log('item-->', item);
    this.form.patchValue({selected: item});
    input.value = item.name;
    this.items = [];
  }
  //initialize view
  async initializeView() {
    // this.handleAuthFirebase();
    this.genders = DAK.getGenders().slice(0,2);
    this.selectGender(this.genders, 0);
  }

  //This method is used to select gender
  selectGender(obj: any, idx: number) {
    // console.log(obj);

    this.genders[idx].checked = !obj.checked;
    //this.current_user.sex = obj.id;
    for (let k = 0; k < this.genders.length; k++)
      if (k != idx) this.genders[k].checked = false;
  }
  
  disciplines = [
    {
      id: 1,
      name: 'Judo',
    },
    {
      id: 2,
      name: 'Natation',
    },
    {
      id: 3,
      name: 'gymnastique',
    },
  ];

  compareWith(o1:any, o2:any) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((o) => o.id === o1.id);
    }

    return o1.id === o2.id;
  }

  handleChange(ev:any) {
    console.log('Current value:', JSON.stringify(ev.target.value));
  }


  goToPage(route: string){
    this.router.navigate([route]);
  }

}
