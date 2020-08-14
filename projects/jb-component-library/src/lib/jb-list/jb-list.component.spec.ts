import { JbListComponent } from './jb-list.component';
import { SubSection } from './types/list.type';

const LIST_DATA = {
  sectionHeader: {
    title: 'Destinations',
    section: [
      {
        name: 'list',
        list: [
          {
            name: 'column',
            column: [
              {
                name: 'subSection',
                subSection: [
                  {
                    name: 'items',
                    subHeader: [
                      {
                        title: 'California',
                      },
                    ],
                    items: [
                      {
                        href:
                          'https://dev.b6orgeng.net/destinations/burbank-california-flights',
                        newWindow: '_blank',
                        title: 'Burbank, CA (BUR)',
                      },
                      {
                        href:
                          'https://dev.b6orgeng.net/destinations/los-angeles-california-flights',
                        newWindow: '_self',
                        title: 'Los Angeles, CA (LAX)',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

describe('JbListComponent', () => {
  let component: JbListComponent;

  beforeEach(() => {
    component = new JbListComponent();
    component.listData = LIST_DATA.sectionHeader.section[0].list[0].column;
  });

  describe('columnHasSubheader', () => {
    it('should return true if column has a subheader', () => {
      const column =
        LIST_DATA.sectionHeader.section[0].list[0].column[0].subSection[0];
      expect(component.columnHasSubheader(column)).toBe(true);
    });

    it('should return false if column does not have a subheader', () => {
      const column = [
        {
          subSection: [
            {
              name: 'items',
              items: [],
            },
          ],
        },
      ];

      expect(
        component.columnHasSubheader(column[0].subSection[0] as SubSection)
      ).toBe(false);
    });
  });
});
