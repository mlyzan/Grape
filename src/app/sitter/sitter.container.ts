import { Component, OnInit } from '@angular/core';
import { Sitter, SitterService } from './sitter.service';

@Component({
  selector: 'container-sitter',
  templateUrl: './sitter.container.html',
  styleUrls: ['./sitter.component.scss']
})

export class SitterContainer implements OnInit {
    sitter: Sitter;
    
    constructor(private appService: SitterService){}

  ngOnInit(): void {
    this.sitter = this.appService.getSitter();
  }


}
