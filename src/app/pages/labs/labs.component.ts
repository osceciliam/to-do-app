import { Component, signal } from '@angular/core';

import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {

  welcome = 'hola';
  tasks = signal([
    'Instalar Angular',
    'Crear proyecto',
    'Crear componentes'
  ]);

  /* name = 'Osvaldo'; */
  name = signal('Osvaldo');
  age = 37;
  disabled = true;
  img = 'https://www.w3schools.com/howto/img_avatar.png';

  person = signal({
    name: 'Osvaldo',
    age: 5,
    avatar: 'https://www.w3schools.com/howto/img_avatar.png'
  });

  clickHandler(){
    alert('Hola');
  }

  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    console.log(input.value);
    this.name.set(newValue);
  }

  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);

  }
  changeAge(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    console.log(input.value);
    this.person.update(prevState => {
      return{
        ...prevState,
        age: parseInt(newValue, 10)
      }
    });

  }

  changeName(event: Event){
    const input = event.target as HTMLInputElement;
    const newName = input.value;
    console.log(input.value);
    this.person.update(prevState => {
      return{
        ...prevState,
        name: newName
      }
    });

  }

  colorCtrl = new FormControl();


  constructor(){
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value);
    })

  }

  widthCtrl = new FormControl(50, {
    nonNullable: true
  });

  nameCtrl = new FormControl(50,{
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });


}
