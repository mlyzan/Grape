import { Injectable } from '@angular/core';

export interface Sitter {
    id: number,
    name: string,
    email: string,
    photo: string,
    years: string,
    pets: string,
    payment: number,
    location: string,
    description: string
}

@Injectable({
  providedIn: 'root',
})

export class SitterService {
    sitter: Sitter = {
        id: 1,
        name: 'Alan',
        email: 'alan@mail.com',
        years: '25',
        photo: 'https://www.petsit.com/stuff/contentmgr/files/0/884b1fb69d6413f97b81a120eee3402e/image/hp_petsitterresources_2018_as_man.jpg',
        payment: 20,
        pets: 'Dogs, Cats',
        location: 'Lviv',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem magni ipsum eum laboriosam rem porro quas eius expedita saepe? Ipsum inventore quis quibusdam ratione laudantium ipsam iure nobis officia suscipit error, qui cupiditate culpa exercitationem, dolor rem, nisi voluptatibus mollitia.'
    };

    getSitter(): Sitter {
        return this.sitter
    }

}
  