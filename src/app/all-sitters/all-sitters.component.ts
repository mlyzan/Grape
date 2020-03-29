import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grape-all-sitters',
  templateUrl: './all-sitters.component.html',
  styleUrls: ['./all-sitters.component.scss']
})
export class AllSittersComponent implements OnInit {
  sitters$ = [
    {
      id:1,
      photo: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/12/01/09/happy-dog-owner.jpg?w968',
      name: 'Samanta',
      payment: 8,
      address: 'Lutsk',
      information: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid doloremque repellendus, ex sed neque nostrum.'
    },
    {
      id:2,
      photo: 'https://image.cnbcfm.com/api/v1/image/105254985-GettyImages-758304949.jpg?v=1534967644&w=740&h=416',
      name: 'Anastasia',
      payment: 10,
      address: 'Lviv',
      information: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid doloremque repellendus, ex sed neque nostrum.'
    },
    {
      id:3,
      photo: 'https://veterinary.planmeca.com/link/3e2f9a8371194832ab00510666453ce5.aspx',
      name: 'Viktoria',
      payment: 12,
      address: 'Lviv',
      information: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid doloremque repellendus, ex sed neque nostrum.'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
