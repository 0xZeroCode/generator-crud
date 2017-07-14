import { Component, OnInit, ViewChild } from '@angular/core';

import { <%= serviceName %> } from './<%= serviceFileName %>.service';

@Component({
  selector: '<%= componentTagName %>',
  templateUrl: '<%= componentFileName %>.component.html',
})
export class <%= componentName %> implements OnInit {
  @ViewChild('<%= model %>EditModal') editModal;

  <%=modelInPlural%>: any[] = [];

  readonly firstPage = 1;
  currentPage = 1;
  totalCount: number;
  maxVisible = 10;
  pageSize = 10;

  searchParams: any = {};
  currentSearchParams: any = {};

  datepickerOptions = {
    weekStart: 1,
    format: 'yyyy-mm-dd',
    autoclose: true
  };

  <%= model %>ToAdd: any = {};

  modalInfo: any = {};

  setSearchResult = result => {
    this.totalCount = result.count;
    this.<%=modelInPlural%> = result.result;
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

        this.<%= model %>ToAdd = {};
      });
  }

  modalToggle(info) {
    this.modalInfo = info;

    this.editModal.show();
  }

  onRemove(<%= model %>) {
    this.service.delete<%= modelUpperName %>(<%= model %>.id)
      .then(result => {
        if(!result.success) return;

        const index = this.<%=modelInPlural%>.findIndex(item => item.id === <%= model %>.id);

        this.<%=modelInPlural%>.splice(index, 1);
      });
  }

  onEditSave() {
    this.service.update<%= modelUpperName %>(this.modalInfo.<%= model %>)
      .then(result => {
        if(!result.success) return;

        this.modalInfo.onUpdate();
      });
  }
}
