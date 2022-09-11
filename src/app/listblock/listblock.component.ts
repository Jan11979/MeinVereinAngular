import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-listblock',
  templateUrl: './listblock.component.html',
  styleUrls: ['./listblock.component.css']
})



export class ListblockComponent implements OnInit{
  @Output() newItemEvent = new EventEmitter<number>();

  dummyUser: [id:number, name:string][] = [];

  constructor() { }

  OnEdit(id: number) {
    this.newItemEvent.emit(id);
  }


/*  OnEdit(dataId: number, guiId: number): void {

    console.log("User ID(", dataId, ") is Edit = ", guiId);
  }*/

  async getData() {
    const rawResponse = await fetch(`https://dummyjson.com/users`, {
      method: 'GET',
    });
    let response = await rawResponse.json();
    let results = response.users

    let new_results_size = Object.keys(results).length
    for(let i = 0; i < new_results_size; i++) {
      let nameString:string = results[i].firstName;
      nameString += ", " + results[i].lastName
      nameString += ", " + results[i].email
      let tmpUser:[number, string] = [results[i].id, nameString];
      this.dummyUser.push(tmpUser);
    }

  }
  RemoveElementFromObjectArray(key: number) {
    this.dummyUser.forEach((value,index)=>{
      if(index==key) this.dummyUser.splice(index,1);
    });
  }

  async FetchDelete(id: number) {
    const rawResponse = await fetch(`https://dummyjson.com/users/` + id, {
      method: 'DELETE',
    });
    let response = await rawResponse.json();
    console.log("User ID(", id, ") is Deleted = ", response);
  }

  OnDelete(dataId: number, guiId: number): void {
    this.RemoveElementFromObjectArray(guiId);
    this.FetchDelete( dataId );
  }



  ngOnInit(): void {
    this.getData()
  }




}
function SetVisible(arg0: boolean) {
    throw new Error('Function not implemented.');
}

function SetVisibleEditBox() {
    throw new Error('Function not implemented.');
}

