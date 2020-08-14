import { JbTableComponent } from './jb-table.component';

describe('JbStarRatingComponent', () => {
  let mockTableComponent;
  let elementRefMock;
  let windowMock;

  beforeEach(() => {
    windowMock = {};
    elementRefMock = { nativeElement: {} };

    mockTableComponent = new JbTableComponent(windowMock, elementRefMock);
  });

  describe('tableData setter', () => {
    it('should set other inputs based on the tableData inputted', () => {
      mockTableComponent.tableData = {
        tableName: 'table',
        type: 'comparison',
        legal: ['legal'],
        headers: [{ headerName: 'header' }],
        rows: [{ rowName: 'row' }],
      };
      expect(mockTableComponent.title).toBe('table');
      expect(mockTableComponent.type).toBe('comparison');
      expect(mockTableComponent.legal).toEqual(['legal']);
      expect(mockTableComponent.headers).toEqual([{ headerName: 'header' }]);
      expect(mockTableComponent.rows).toEqual([{ rowName: 'row' }]);
    });

    it('should not change other inputs if tableData is undefined', () => {
      mockTableComponent.tableData = undefined;
      mockTableComponent.title = 'title';
      mockTableComponent.legal = ['legal', 'legal'];
      mockTableComponent.headers = ['header', 'header'];
      mockTableComponent.rows = ['row', 'row'];

      expect(mockTableComponent.title).toBe('title');
      expect(mockTableComponent.type).toBe('simple');
      expect(mockTableComponent.legal).toEqual(['legal', 'legal']);
      expect(mockTableComponent.headers).toEqual(['header', 'header']);
      expect(mockTableComponent.rows).toEqual(['row', 'row']);
    });

    it('should set inputs to default when tableData values are not present', () => {
      mockTableComponent.tableData = {};

      expect(mockTableComponent.title).toBe('');
      expect(mockTableComponent.type).toBe('simple');
      expect(mockTableComponent.legal).toEqual([]);
      expect(mockTableComponent.headers).toEqual([]);
      expect(mockTableComponent.rows).toEqual([]);
    });
  });

  describe('renderIcon', () => {
    it('should return "checkmark" if value is undefined', () => {
      expect(mockTableComponent.renderIcon()).toBe('checkmark');
    });

    it('should return "checkmark" if value is an empty string', () => {
      expect(mockTableComponent.renderIcon('')).toBe('checkmark');
    });

    it('should return value if a non empty string is passed in', () => {
      expect(mockTableComponent.renderIcon('arrow')).toBe('arrow');
    });
  });

  describe('getHeaderById', () => {
    it('should return the cell data sorted by columns', () => {
      mockTableComponent.headers = [
        { id: 1, headerName: 'col 1' },
        { id: 2, headerName: 'col 2' },
      ];
      expect(mockTableComponent.getHeaderById(2)).toEqual({
        id: 2,
        headerName: 'col 2',
      });
    });
  });

  describe('sortColumn', () => {
    it('should return sorted data by ascending order by default', () => {
      const expected = [
        {
          rowData: [
            {
              id: 1,
              sortValue: 1,
            },
          ],
        },
        {
          rowData: [
            {
              id: 2,
              sortValue: 2,
            },
          ],
        },
      ];
      mockTableComponent.rowArray = expected.reverse();
      mockTableComponent.sortColumn(0);
      expect(mockTableComponent.rowArray).toEqual(expected);
    });
  });
  describe('sortGroupByHeaderIndex', () => {
    it('should return sorted data by ascending order', () => {
      const expected = [
        {
          rowData: [
            {
              id: 1,
              sortValue: 1,
            },
          ],
        },
        {
          rowData: [
            {
              id: 2,
              sortValue: 2,
            },
          ],
        },
      ];
      mockTableComponent.rowArray = expected.reverse();
      mockTableComponent.activeSortingColumn.index = 0;
      mockTableComponent.activeSortingColumn.state = 'descending';
      mockTableComponent.sortGroupByHeaderIndex(0);
      expect(mockTableComponent.rowArray).toEqual(expected);
    });
    it('should return sorted data by descending order', () => {
      const expected = [
        {
          rowData: [
            {
              id: 2,
              sortValue: 2,
            },
          ],
        },
        {
          rowData: [
            {
              id: 1,
              sortValue: 1,
            },
          ],
        },
      ];
      mockTableComponent.rowArray = expected.reverse();
      mockTableComponent.activeSortingColumn.index = 0;
      mockTableComponent.activeSortingColumn.state = 'ascending';
      mockTableComponent.sortGroupByHeaderIndex(0);
      expect(mockTableComponent.rowArray).toEqual(expected);
    });
  });

  describe('getColumnArray', () => {
    it('should return the cell data in an column array', () => {
      mockTableComponent.tableData = {
        type: 'comparison',
        fixHeader: false,
        headers: [
          {
            headerName: 'Air transport charges',
            id: 1,
            borderColor: '#e8e8e9',
          },
          {
            headerName: 'Adult',
            id: 2,
          },
          {
            headerName: 'Child',
            id: 3,
          },
          {
            headerName: 'Lap Infant',
            id: 4,
          },
          {
            headerName: 'Total',
            id: 5,
          },
        ],
        rows: [
          {
            id: 1,
            rowData: [
              {
                id: 1,
                columnId: 1,
                value: 'Base fare',
                type: 'string',
              },
              {
                id: 2,
                columnId: 2,
                value: '$305.20',
                type: 'string',
              },
              {
                id: 3,
                columnId: 3,
                value: '$105.20',
                type: 'string',
              },
              {
                id: 4,
                columnId: 4,
                value: '$50.20',
                type: 'string',
              },
              {
                id: 5,
                columnId: 5,
                value: '$560.20',
                type: 'string',
              },
            ],
          },
          {
            id: 2,
            isSubHeader: true,
            rowData: [
              {
                id: 1,
                columnId: 1,
                value: 'Taxes, fees and charges',
                type: 'string',
              },
            ],
          },
          {
            id: 3,
            rowData: [
              {
                id: 1,
                columnId: 1,
                value: 'US September 11 Security Fee',
                type: 'string',
              },
              {
                id: 2,
                columnId: 2,
                value: '$30.20',
                type: 'string',
              },
              {
                id: 3,
                columnId: 3,
                value: '$10.53',
                type: 'string',
              },
              {
                id: 4,
                columnId: 4,
                value: '$5.20',
                type: 'string',
              },
              {
                id: 5,
                columnId: 5,
                value: '$45.93',
                type: 'string',
              },
            ],
          },
          {
            id: 4,
            rowData: [
              {
                id: 1,
                columnId: 1,
                value: 'US Flight Segment Tax',
                type: 'string',
              },
              {
                id: 2,
                columnId: 2,
                value: '$30.20',
                type: 'string',
              },
              {
                id: 3,
                columnId: 3,
                value: '$10.53',
                type: 'string',
              },
              {
                id: 4,
                columnId: 4,
                value: '$5.20',
                type: 'string',
              },
              {
                id: 5,
                columnId: 5,
                value: '$45.93',
                type: 'string',
              },
            ],
          },
          {
            id: 5,
            rowData: [
              {
                id: 1,
                columnId: 1,
                value: 'US Transportation Tax [Domestic]',
                type: 'string',
              },
              {
                id: 2,
                columnId: 2,
                value: '$30.20',
                type: 'string',
              },
              {
                id: 3,
                columnId: 3,
                value: '$10.53',
                type: 'string',
              },
              {
                id: 4,
                columnId: 4,
                value: '$5.20',
                type: 'string',
              },
              {
                id: 5,
                columnId: 5,
                value: '$45.93',
                type: 'string',
              },
            ],
          },
          {
            id: 6,
            rowData: [
              {
                id: 1,
                columnId: 1,
                value: 'US Passenger Facility Charge',
                type: 'string',
              },
              {
                id: 2,
                columnId: 2,
                value: '$30.20',
                type: 'string',
              },
              {
                id: 3,
                columnId: 3,
                value: '$10.53',
                type: 'string',
              },
              {
                id: 4,
                columnId: 4,
                value: '$5.20',
                type: 'string',
              },
              {
                id: 5,
                columnId: 5,
                value: '$45.93',
                type: 'string',
              },
            ],
          },
        ],
        footers: [
          {
            id: 1,
            rowData: [
              {
                id: 1,
                columnId: 1,
                value: 'Total Price',
                type: 'string',
              },
              {
                id: 2,
                columnId: 2,
                value: '$426.00',
                type: 'string',
              },
              {
                id: 3,
                columnId: 3,
                value: '$147.32',
                type: 'string',
              },
              {
                id: 4,
                columnId: 4,
                value: '$71.00',
                type: 'string',
              },
              {
                id: 5,
                columnId: 5,
                value: '$644.32',
                type: 'string',
              },
            ],
          },
        ],
        mobileGrouping: 'column',
      };

      const expectedColumnArray = [
        [
          {
            id: 1,
            columnId: 1,
            value: 'Base fare',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 1,
            columnId: 1,
            value: 'Taxes, fees and charges',
            type: 'string',
            isSubHeader: true,
            isLastRow: false,
          },
          {
            id: 1,
            columnId: 1,
            value: 'US September 11 Security Fee',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 1,
            columnId: 1,
            value: 'US Flight Segment Tax',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 1,
            columnId: 1,
            value: 'US Transportation Tax [Domestic]',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 1,
            columnId: 1,
            value: 'US Passenger Facility Charge',
            type: 'string',
            isLastRow: true,
          },
          {
            id: 1,
            columnId: 1,
            value: 'Total Price',
            type: 'string',
            isFooter: true,
          },
        ],
        [
          {
            id: 2,
            columnId: 2,
            value: '$305.20',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 1,
            columnId: 1,
            value: 'Taxes, fees and charges',
            type: 'string',
            isSubHeader: true,
            isLastRow: false,
          },
          {
            id: 2,
            columnId: 2,
            value: '$30.20',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 2,
            columnId: 2,
            value: '$30.20',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 2,
            columnId: 2,
            value: '$30.20',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 2,
            columnId: 2,
            value: '$30.20',
            type: 'string',
            isLastRow: true,
          },
          {
            id: 2,
            columnId: 2,
            value: '$426.00',
            type: 'string',
            isFooter: true,
          },
        ],
        [
          {
            id: 3,
            columnId: 3,
            value: '$105.20',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 1,
            columnId: 1,
            value: 'Taxes, fees and charges',
            type: 'string',
            isSubHeader: true,
            isLastRow: false,
          },
          {
            id: 3,
            columnId: 3,
            value: '$10.53',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 3,
            columnId: 3,
            value: '$10.53',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 3,
            columnId: 3,
            value: '$10.53',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 3,
            columnId: 3,
            value: '$10.53',
            type: 'string',
            isLastRow: true,
          },
          {
            id: 3,
            columnId: 3,
            value: '$147.32',
            type: 'string',
            isFooter: true,
          },
        ],
        [
          {
            id: 4,
            columnId: 4,
            value: '$50.20',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 1,
            columnId: 1,
            value: 'Taxes, fees and charges',
            type: 'string',
            isSubHeader: true,
            isLastRow: false,
          },
          {
            id: 4,
            columnId: 4,
            value: '$5.20',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 4,
            columnId: 4,
            value: '$5.20',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 4,
            columnId: 4,
            value: '$5.20',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 4,
            columnId: 4,
            value: '$5.20',
            type: 'string',
            isLastRow: true,
          },
          {
            id: 4,
            columnId: 4,
            value: '$71.00',
            type: 'string',
            isFooter: true,
          },
        ],
        [
          {
            id: 5,
            columnId: 5,
            value: '$560.20',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 1,
            columnId: 1,
            value: 'Taxes, fees and charges',
            type: 'string',
            isSubHeader: true,
            isLastRow: false,
          },
          {
            id: 5,
            columnId: 5,
            value: '$45.93',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 5,
            columnId: 5,
            value: '$45.93',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 5,
            columnId: 5,
            value: '$45.93',
            type: 'string',
            isLastRow: false,
          },
          {
            id: 5,
            columnId: 5,
            value: '$45.93',
            type: 'string',
            isLastRow: true,
          },
          {
            id: 5,
            columnId: 5,
            value: '$644.32',
            type: 'string',
            isFooter: true,
          },
        ],
      ];

      expect(mockTableComponent.getColumnArray()).toEqual(expectedColumnArray);
    });
  });
});
