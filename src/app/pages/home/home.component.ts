import { Component, computed, input, signal, effect, inject, Injector} from '@angular/core';

import { Title } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from './../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal<Task[]>([
/*     {
      id: Date.now(),
      title: 'ejemplo tarea',
      completed: false
    },
    {
      id: Date.now(),
      title: 'ejemplo tarea2',
      completed: false
    },
    {
      id: Date.now(),
      title: 'ejemplo tarea3',
      completed: false
    }, */
  ]);

  /* changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
  } */

  addTask(title: string){
    const newTask:Task ={
      id: Date.now(),
      title: title,
      completed: false
    };

    this.tasks.update((tasks)=> [...tasks, newTask]);

  }

  deleteTask(index: number){
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));    
  }

  updateTask(index: number){
    this.tasks.update((tasks)=> {
      return tasks.map((task, position) => {
        if(position === index){
          return {
            ...task,
            completed: !task.completed
          }          
        }
        return task;
      })
    })
  }

  newTaskCtrl = new FormControl('',{
    nonNullable: true,
    validators:[
      Validators.required
    ]
  });

  changeHandler(){
    if(this.newTaskCtrl.valid){
      /* const value = this.newTaskCtrl.value; */
      const value = this.newTaskCtrl.value.trim();
      if(value !=''){
        this.addTask(value);        
      }
      this.newTaskCtrl.setValue('');
    }
  }

  updateTaskEditingMode(index: number){
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index){
          return{
            ...task,
            editing:true
          }
        }
        return {
          ...task,
          editing:false
        }
      })
    })
  }

  updateTaskText(index: number, event: Event){
    const input = event.target as HTMLInputElement;
    this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index){
          return{
            ...task,
            title:input.value,
            editing: false
          }
        }
        return task;
      })
    })
  }


  filter = signal<'all' | 'pending' | 'completed'>('all');
  
  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter);

  }

  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if(filter === 'pending'){
      return tasks.filter(task => !task.completed);
    }
    if(filter === 'completed'){
      return tasks.filter(task => task.completed);
    }
    return tasks;
  });

  /*constructor(){
     effect(() => {
      const tasks = this.tasks();
      console.log('run effect')
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    EN CASO DE QUE NO SE ACTUALICE CON EL INJECTOR DE DEPENDENCIAS
     
  }*/

  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if(storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }

  injector = inject(Injector);

  trackTasks(){
    effect(() => {
      const tasks = this.tasks();
      console.log('run effect')
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, {injector: this.injector});
  }





}
