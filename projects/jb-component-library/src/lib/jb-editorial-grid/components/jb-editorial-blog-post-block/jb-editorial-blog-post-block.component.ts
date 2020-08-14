import { Component, Input } from '@angular/core';

@Component({
  selector: 'jb-editorial-blog-post-block',
  templateUrl: './jb-editorial-blog-post-block.component.html',
  styleUrls: ['./jb-editorial-blog-post-block.component.scss'],
  host: {
    class: 'flex flex-column relative w-100 w-50-m w-third-l no-underline',
  },
})
export class JbEditorialBlogPostBlockComponent {
  @Input() href = '';
  @Input() link = '';
  @Input() target: string;
}
