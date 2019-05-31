import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input() posts;
  @Input() identity;
  @Input() url;

  @Output() delete = new EventEmitter<number>();


  constructor() { }

  ngOnInit() {
  }

  deletePost(postId) {
    this.delete.emit(postId);
  }



}
