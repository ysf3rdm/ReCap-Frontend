import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css'],
})
export class ColorListComponent implements OnInit {
  colors: Color[];
  dataLoaded = false;
  filterText = '';
  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllColors();
  }

  getAllColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }
  deleteColor(color: Color) {
    this.colorService.deleteColor(color).subscribe((response) => {
      this.toastrService.success('Başarıyla silindi', 'Başarılı');
    });
  }
}
