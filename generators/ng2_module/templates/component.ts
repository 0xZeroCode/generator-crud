import { Component, OnInit, ViewChild } from '@angular/core';

import { <%= serviceName %> } from './<%= serviceFileName %>.service';

@Component({
  selector: '<%= componentTagName %>',
  templateUrl: '<%= componentFileName %>.component.html',
})
export class <%= componentName %> implements OnInit {
  @ViewChild('<%= model %>EditModal') editModal;

  <%=modelInPlural%> : any[] = [];

  readonly firstPage = 1;
  currentPage = 1;
  totalCount: number;
  maxVisible = 10;
  pageSize = 10;

  searchParams: any = {};
  currentSearchParams: any = {};

  <%= model %>ToAdd : any = {};

  modalInfo: any = {};

  setSearchResult = result => {
    this.totalCount = result.count;
    this.<%modelInPlural%> = result.result;
  }

  constructor(private service: <%= serviceName %>) {  }

  ngOnInit() {
    this.service.pagedSearch({}, this.currentPage)
      .then(this.setSearchResult);
  }

  search() {
    this.searchParams = this.currentSearchParams;

    this.service.pagedSearch(this.currentSearchParams, this.firstPage)
      .then(this.setSearchResult);
  }

  pageChanged() {
    this.service.pagedSearch(this.searchParams, this.currentPage)
      .then(this.setSearchResult);
  }

  onAddCancel() {
    this.<%= model %>ToAdd = {};
  }

  onAddSave() {
    this.service.create<%= modelUpperName %>(this.<%= model %>ToAdd)
      .then(result => {
        if(!result.success) return;

        this.<%= model %>ToAdd.id = result.data.id;
        this.<%= model %>ToAdd.createDate = result.data.createDate;

        this.<%=modelInPlural%>.push(this.<%= model %>ToAdd);
      });
  }

  modalToggle(info) {
    this.modalInfo = info;

    this.editModal.show();
  }

  onEditSave() {
    this.service.update<%= modelUpperName %>(this.modalInfo.<%= model %>)
      .then(result => {
        if(!result.success) return;

        this.modalInfo.onUpdate();
      });
  }
}
