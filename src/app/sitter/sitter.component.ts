import { Component, OnInit, Input } from '@angular/core';
import { Sitter } from './sitter.service';

@Component({
  selector: 'app-sitter',
  templateUrl: './sitter.component.html',
  styleUrls: ['./sitter.component.scss']
})
export class SitterComponent implements OnInit {
  @Input() sitter: Sitter;
  constructor() { }

  ngOnInit(): void {
  }
  
}
