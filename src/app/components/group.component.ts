import { Component, OnInit, ViewContainerRef, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { GroupCreateModalContext, GroupCreateModal } from '../components/modal/group-create-modal';
import { GroupService } from '../service/group.service';
import { Group } from '../model/group';
import { GroupCategory } from '../model/category';

@Component({
  selector: 'sp-group',
  templateUrl: 'group.component.html',
  styleUrls: ['group.component.css']
})
export class GroupComponent implements OnInit {
  categories:GroupCategory[];
  groups:Group[];
  selectedGroup:Group;
  constructor(
    private router: Router, public modal: Modal,
    private groupService:GroupService
    ) {}

  ngOnInit() {
    this.groupService.getGroupCategories().then(categories =>{
      this.categories = categories;
      this.groupService.getGroups().then(groups => {
        this.groups = groups;
      })
    })
  }

  createGroup(){
    
    return this.modal.open(GroupCreateModal,  overlayConfigFactory({ num1: 2, num2: 3, categories:this.categories }, BSModalContext));
  }

  openGroupDetailModal(group){
    this.selectedGroup = group;
    var modal = document.getElementById('groupDetailModal');
    modal.style.display = "block";
  }

  closeGroupDetailModal(){
    var modal = document.getElementById('groupDetailModal');
    modal.style.display = "none";
  }
}
