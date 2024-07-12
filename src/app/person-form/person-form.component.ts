import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PersonService } from '../person.service';

interface Account {
  type: string;
  address: string;
}

interface PersonModel {
  id?: number;
  firstName: string;
  lastName: string;
  skills?: string[];
  accounts?: Account[];
}

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss',
  providers: [PersonService]
})
export class PersonFormComponent implements OnInit{
  personfirstname: string = '';
  personlastname: string = '';
  personSkills: string[] = [''];
  personAccounts: Account[] = []; 

  persons: PersonModel[] = [] ;

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  // Show all persons
  loadPersons(): void {
    this.personService.getPersons().subscribe(
      thepersons => {
        this.persons = thepersons;
      },
      error => {
        console.error('Error loading persons:', error);
      }
    );
  }


  // Send form data to API
  onSubmit(): void {
    if (this.personfirstname && this.personlastname) {
      // Create new person
      const newPerson: PersonModel = { firstName: this.personfirstname, lastName: this.personlastname}; //, skills: this.personSkills };
      // newPerson.firstName = this.personfirstname ;
      // newPerson.lastName = this.personlastname ;
      newPerson.skills = this.personSkills ;
      newPerson.accounts = this.personAccounts;

      this.personService.addPerson(newPerson).subscribe(theperson => {
        this.persons.push(theperson);
        // Clear local data
        this.personfirstname = '';
        this.personlastname = '';
        this.personSkills = [''];
        this.personAccounts = [];

      },
      error => {
        console.error('Error adding name:', error); // Log any errors
      });
    }  
  }

  // Add an extra input field for Skills
  addInput() : void {
    if (this.personSkills.length < 5) {
      this.personSkills.push('') ;
    }
  }
  // Remove an extra input fields for Skills
  remInput() : void {
    this.personSkills.pop() ;
  }

  // Add an extra input field for Accounts
  addInput2() : void {
    if (this.personSkills.length < 5) {
    const newaccount: Account = { type: "", address: ""};
      this.personAccounts.push(newaccount) ;
    }
  }
  // Remove an extra input field for Accounts
  remInput2() : void {
    this.personAccounts.pop() ;
  }
 
}
